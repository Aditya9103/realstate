import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminToken: (localStorage.getItem('adminToken') && localStorage.getItem('adminToken') !== 'undefined') ? localStorage.getItem('adminToken') : null,
  adminEmail: (localStorage.getItem('adminEmail') && localStorage.getItem('adminEmail') !== 'undefined') ? localStorage.getItem('adminEmail') : null,
  adminName: (localStorage.getItem('adminName') && localStorage.getItem('adminName') !== 'undefined') ? localStorage.getItem('adminName') : null,
  adminPhoto: (localStorage.getItem('adminPhoto') && localStorage.getItem('adminPhoto') !== 'undefined') ? localStorage.getItem('adminPhoto') : null,
  notificationPreferences: (localStorage.getItem('notificationPreferences') && localStorage.getItem('notificationPreferences') !== 'undefined') 
    ? JSON.parse(localStorage.getItem('notificationPreferences')) 
    : { emailVisits: true, emailMessages: true, notificationEmail: '' },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { name, email, token, profilePhoto, notificationPreferences } = action.payload;
      state.adminName = name;
      state.adminEmail = email;
      state.adminToken = token;
      
      if (profilePhoto !== undefined) {
        state.adminPhoto = profilePhoto;
        localStorage.setItem('adminPhoto', profilePhoto);
      }
      
      if (notificationPreferences !== undefined) {
        state.notificationPreferences = notificationPreferences;
        localStorage.setItem('notificationPreferences', JSON.stringify(notificationPreferences));
      }

      localStorage.setItem('adminName', name);
      localStorage.setItem('adminEmail', email);
      localStorage.setItem('adminToken', token);
    },
    logout: (state) => {
      state.adminName = null;
      state.adminEmail = null;
      state.adminToken = null;
      state.adminPhoto = null;
      state.notificationPreferences = { emailVisits: true, emailMessages: true, notificationEmail: '' };
      
      localStorage.removeItem('adminName');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminPhoto');
      localStorage.removeItem('notificationPreferences');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
