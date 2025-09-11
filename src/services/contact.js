// services/contact.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      if (token()) {
        headers.set("Authorization", `Bearer ${token()}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    // 1. Get all contacts (with optional search)
    getAllContacts: builder.query({
      query: (params = {}) => {
        const query = new URLSearchParams();
        if (params.name) query.append("name", params.name);
        if (params.page) query.append("page", params.page);
        if (params.limit) query.append("limit", params.limit);
        return `api/contact/all?${query.toString()}`;
      },
      providesTags: ["Contact"],
    }),

    // 2. Get contact by ID
    getContactById: builder.query({
      query: (id) => `api/contact/${id}`,
      providesTags: (result, error, id) => [{ type: "Contact", id }],
    }),

    // 3. Create a contact
    createContact: builder.mutation({
      query: (body) => ({
        url: `api/contact/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Contact"],
    }),

    // 4. Update a contact
    updateContact: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/contact/update`,
        method: "PATCH",
        body: { id, ...body },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Contact", id },
        "Contact",
      ],
    }),

    // 5. Delete a contact
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `api/contact/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

// Export hooks
export const {
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useCreateContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = contactApi;
