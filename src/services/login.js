// services/login.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ["Admin"],
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "api/admin/create",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Admin"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/admin/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = loginApi;
