import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  prepareHeaders: (headers, { getState }) => {
    // We can add auth headers here later
    const token = localStorage.getItem('adminToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Admin', 'Property', 'Service', 'Message', 'VisitRequest', 'Testimonial', 'Faq'],
  endpoints: (builder) => ({}),
});
