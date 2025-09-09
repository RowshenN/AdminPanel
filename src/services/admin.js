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
        url: `api/admin/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),

    // 2. Get all admins
    getAllAdmins: builder.query({
      query: ({ search, limit, page }) =>
        `api/admin/all?page=${page}&limit=${limit}&search=${search}`,
      providesTags: ["Admin"],
    }),

    // 3. Get one admin
    getAdmin: builder.query({
      query: (id) => `api/admin/${id}`,
      providesTags: (result, error, id) => [{ type: "Admin", id }],
    }),

    // 4. Update one admin
    updateAdmin: builder.mutation({
      query: (body) => ({
        url: `api/admin/update`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),

    // 5. Delete one admin (soft delete)
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `api/admin/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Admin"],
    }),

    // 6. Activate admin
    activateAdmin: builder.mutation({
      query: (id) => ({
        url: `api/admin/active/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Admin"],
    }),

    // 7. Deactivate admin
    deactivateAdmin: builder.mutation({
      query: (id) => ({
        url: `api/admin/disActive/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Admin"],
    }),

    // 8. Destroy admin (permanent delete)
    destroyAdmin: builder.mutation({
      query: (id) => ({
        url: `api/admin/destroy/${id}`,
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
  useActivateAdminMutation,
  useDeactivateAdminMutation,
  useDestroyAdminMutation,
} = adminApi;
