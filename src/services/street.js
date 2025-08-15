import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const streetApi = createApi({
  reducerPath: "streetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      if (token()) {
        headers.set("Authorization", `Bearer ${token()}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Street"],

  endpoints: (builder) => ({
    // 1. Create new street
    createStreet: builder.mutation({
      query: (body) => ({
        url: "api/streets/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Street"],
    }),

    // 2. Get all streets
    getAllStreets: builder.query({
      query: (search) => `api/streets/?search=${search}`,
      providesTags: ["Street"],
    }),

    // 3. Get one street by ID
    getStreet: builder.query({
      query: (id) => `api/streets/${id}`,
      providesTags: (result, error, id) => [{ type: "Street", id }],
    }),

    // 4. Update street by ID
    updateStreet: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/streets/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Street", id },
        "Street",
      ],
    }),

    // 5. Delete street by ID
    deleteStreet: builder.mutation({
      query: (id) => ({
        url: `api/streets/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Street"],
    }),
  }),
});

export const {
  useCreateStreetMutation,
  useGetAllStreetsQuery,
  useGetStreetQuery,
  useUpdateStreetMutation,
  useDeleteStreetMutation,
} = streetApi;
