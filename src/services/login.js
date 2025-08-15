// services/login.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const REACT_APP_BASE_URL = "http://13.60.166.186/";
const baseUrl = process.env.REACT_APP_BASE_URL;
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
