import { apiSlice } from './apiSlice';

export const visitApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVisits: builder.query({
      query: () => '/visits',
      providesTags: ['VisitRequest'],
    }),
    getVisitById: builder.query({
      query: (id) => `/visits/${id}`,
      providesTags: (result, error, id) => [{ type: 'VisitRequest', id }],
    }),
    submitVisit: builder.mutation({
      query: (visitData) => ({
        url: '/visits',
        method: 'POST',
        body: visitData,
      }),
      invalidatesTags: ['VisitRequest'],
    }),
    updateVisitStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/visits/${id}/status`,
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'VisitRequest', id }, 'VisitRequest'],
    }),
    deleteVisit: builder.mutation({
      query: (id) => ({
        url: `/visits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['VisitRequest'],
    }),
  }),
});

export const {
  useGetVisitsQuery,
  useGetVisitByIdQuery,
  useSubmitVisitMutation,
  useUpdateVisitStatusMutation,
  useDeleteVisitMutation,
} = visitApiSlice;
