import { apiSlice } from './apiSlice';

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginAdmin: builder.mutation({
      query: (credentials) => ({
        url: '/admin/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    signupAdmin: builder.mutation({
      query: (adminData) => ({
        url: '/admin/signup',
        method: 'POST',
        body: adminData,
      }),
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => ({
        url: '/admin/profile',
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const { useLoginAdminMutation, useSignupAdminMutation, useUpdateAdminProfileMutation } = adminApiSlice;
