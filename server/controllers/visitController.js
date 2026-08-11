import VisitRequest from '../models/VisitRequest.js';
import Admin from '../models/Admin.js';
import sendEmail from '../utils/sendEmail.js';
import { visitRequestReceivedTemplate, visitRequestConfirmedTemplate, adminNewVisitTemplate } from '../utils/emailTemplates.js';

// @desc    Submit a new visit request (Public)
// @route   POST /api/visits
// @access  Public
export const submitVisitRequest = async (req, res) => {
  try {
    const { name, email, phone, propertyId, preferredDate, preferredTime, message, visitType } = req.body;

    if (!name || !email || !phone || !propertyId || !preferredDate || !preferredTime) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const newVisitRequest = await VisitRequest.create({
      name,
      email,
      phone,
      propertyId,
      preferredDate,
      preferredTime,
      message,
      visitType
    });

    await sendEmail({
      email: req.body.email || email,
      subject: `Visit Request Received`,
      html: visitRequestReceivedTemplate(name, new Date(preferredDate).toLocaleDateString(), preferredTime)
    });

    // Notify admins who have emailVisits enabled
    const adminsToNotify = await Admin.find({ 'notificationPreferences.emailVisits': true });
    
    // We need the property title for the email. Let's populate it.
    const populatedVisit = await VisitRequest.findById(newVisitRequest._id).populate('propertyId', 'title');
    
    for (const admin of adminsToNotify) {
      const emailTarget = admin.notificationPreferences?.notificationEmail || admin.email;
      console.log(`Sending admin alert for new visit request to: ${emailTarget}`);
      await sendEmail({
        email: emailTarget,
        subject: `New Visit Request: ${populatedVisit.propertyId?.title || 'Property'}`,
        html: adminNewVisitTemplate(name, populatedVisit.propertyId?.title || 'Property', new Date(preferredDate).toLocaleDateString(), preferredTime)
      });
    }

    res.status(201).json({ success: true, data: newVisitRequest });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all visit requests (Admin)
// @route   GET /api/visits
// @access  Private/Admin
export const getVisitRequests = async (req, res) => {
  try {
    const visits = await VisitRequest.find({}).populate('propertyId', 'title location image priceDisplay').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: visits.length, data: visits });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single visit request
// @route   GET /api/visits/:id
// @access  Private/Admin
export const getVisitRequest = async (req, res) => {
  try {
    const visit = await VisitRequest.findById(req.params.id).populate('propertyId', 'title location image priceDisplay');
    if (!visit) {
      return res.status(404).json({ message: 'Visit request not found' });
    }
    res.status(200).json({ success: true, data: visit });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Update visit request status
// @route   PUT /api/visits/:id/status
// @access  Private/Admin
export const updateVisitStatus = async (req, res) => {
  try {
    const { status, meetingLink } = req.body;

    if (!['Pending', 'Confirmed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updateData = { status };
    if (meetingLink !== undefined) {
      updateData.meetingLink = meetingLink;
    }

    const visit = await VisitRequest.findByIdAndUpdate(
      req.params.id,
      updateData,
      { returnDocument: 'after', runValidators: true }
    ).populate('propertyId', 'title location image priceDisplay');

    if (!visit) {
      return res.status(404).json({ message: 'Visit request not found' });
    }

    if (status === 'Confirmed') {
      // Create a basic .ics calendar invite string
      const startDate = new Date(visit.preferredDate);
      // Try to parse preferredTime (e.g. "14:00" or "02:00 PM") to set hours
      let hours = 9, minutes = 0;
      if (visit.preferredTime) {
        const timeMatch = visit.preferredTime.match(/(\d+):(\d+)/);
        if (timeMatch) {
          hours = parseInt(timeMatch[1]);
          minutes = parseInt(timeMatch[2]);
          if (visit.preferredTime.toLowerCase().includes('pm') && hours < 12) hours += 12;
          if (visit.preferredTime.toLowerCase().includes('am') && hours === 12) hours = 0;
        }
      }
      startDate.setHours(hours, minutes, 0);
      
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 1); // 1 hour duration
      
      const formatIcsDate = (date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
      };

      const propertyTitle = visit.propertyId?.title || 'the property';
      const location = visit.visitType === 'virtual' ? 'Virtual Meeting' : (visit.propertyId?.location || 'Property Location');
      const description = visit.meetingLink ? `Virtual Meeting Link: ${visit.meetingLink}` : `Tour of ${propertyTitle}`;

      const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Mithila Legacy//Real Estate//EN
CALSCALE:GREGORIAN
METHOD:REQUEST
BEGIN:VEVENT
UID:${visit._id}@mithilalegacy.com
DTSTAMP:${formatIcsDate(new Date())}
DTSTART:${formatIcsDate(startDate)}
DTEND:${formatIcsDate(endDate)}
SUMMARY:Property Visit: ${propertyTitle}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

      await sendEmail({
        email: visit.email,
        subject: `Your Property Visit is Confirmed!`,
        html: visitRequestConfirmedTemplate(
          visit.name,
          propertyTitle,
          new Date(visit.preferredDate).toLocaleDateString(),
          visit.preferredTime,
          visit.meetingLink
        ),
        attachments: [
          {
            filename: 'visit-invite.ics',
            content: icsContent,
            contentType: 'text/calendar'
          }
        ]
      });
    }

    res.status(200).json({ success: true, data: visit });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete visit request
// @route   DELETE /api/visits/:id
// @access  Private/Admin
export const deleteVisitRequest = async (req, res) => {
  try {
    const visit = await VisitRequest.findByIdAndDelete(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: 'Visit request not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
