import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminToken: localStorage.getItem('adminToken') || null,
  adminEmail: localStorage.getItem('adminEmail') || null,
  adminName: localStorage.getItem('adminName') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { name, email, token } = action.payload;
      state.adminName = name;
      state.adminEmail = email;
      state.adminToken = token;
      localStorage.setItem('adminName', name);
      localStorage.setItem('adminEmail', email);
      localStorage.setItem('adminToken', token);
    },
    logout: (state) => {
      state.adminName = null;
      state.adminEmail = null;
      state.adminToken = null;
      localStorage.removeItem('adminName');
      localStorage.removeItem('adminEmail');
      localStorage.removeItem('adminToken');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
