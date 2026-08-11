fetch('http://localhost:3000/api/visits', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Test Virtual User',
    email: 'test@example.com',
    phone: '1234567890',
    propertyId: '60c72b2f9b1d8b001c8e4b3a', // Fake ID, wait, mongoose will fail validation if fake
    preferredDate: '2026-08-15',
    preferredTime: '10:00 AM',
    visitType: 'virtual'
  })
}).then(res => res.json()).then(console.log).catch(console.error);
