import { apiSlice } from './apiSlice';

export const testimonialApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTestimonials: builder.query({
      query: () => '/testimonials',
      providesTags: ['Testimonial'],
    }),
    getAdminTestimonials: builder.query({
      query: (status) => ({
        url: '/testimonials/admin',
        params: status ? { status } : {},
      }),
      providesTags: ['Testimonial'],
    }),
    submitTestimonial: builder.mutation({
      query: (data) => ({
        url: '/testimonials',
        method: 'POST',
        body: data, // Could be FormData if it contains an image file
      }),
      invalidatesTags: ['Testimonial'],
    }),
    updateTestimonialStatus: builder.mutation({
      query: ({ id, isApproved }) => ({
        url: `/testimonials/${id}/status`,
        method: 'PUT',
        body: { isApproved },
      }),
      invalidatesTags: ['Testimonial'],
    }),
    deleteTestimonial: builder.mutation({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Testimonial'],
    }),
  }),
});

export const {
  useGetTestimonialsQuery,
  useGetAdminTestimonialsQuery,
  useSubmitTestimonialMutation,
  useUpdateTestimonialStatusMutation,
  useDeleteTestimonialMutation,
} = testimonialApiSlice;
