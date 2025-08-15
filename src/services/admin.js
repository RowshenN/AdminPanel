import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const adminApi = createApi({
  reducerPath: "adminApi",
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
  tagTypes: ["Admin"],

  endpoints: (builder) => ({
    // 1. Create new admin
    createAdmin: builder.mutation({
      query: (body) => ({
        url: `api/auth/admin/signup`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),

    // 2. Get all admins
    getAllAdmins: builder.query({
      query: ({ search, limit, page }) =>
        `api/user/?page=${page}&limit=${limit}&search=${search}`,
      providesTags: ["Admin"],
    }),

    // 3. Get one admin (user)
    getAdmin: builder.query({
      query: (id) => `api/user/${id}`,
      providesTags: (result, error, id) => [{ type: "Admin", id }],
    }),

    // 4. Update one admin (user)
    updateAdmin: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/user/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Admin", id },
        "Admin",
      ],
    }),

    // 5. Delete one admin (user)
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `api/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useGetAdminQuery,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
