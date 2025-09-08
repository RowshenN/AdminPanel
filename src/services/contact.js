// services/transaction.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";
export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    headers: { Authorization: `Bearer ${token()}` },
    prepareHeaders: (headers) => {
      // const token = localStorage.getItem("token");
      if (token()) {
        headers.set("Authorization", `Bearer ${token()}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    getFilteredTransactions: builder.query({
      query: (params = {}) => {
        // Safely build query string
        const query = new URLSearchParams();
        if (params.name) query.append("name", params.name);

        const qs = query.toString();
        return qs ? `api/contact/all?${qs}` : `api/contact/all`;
      },
      providesTags: ["Contact"],
    }),

    getTransactionById: builder.query({
      query: (id) => `api/contact/${id}`,
      providesTags: (result, error, id) => [{ type: "Contact", id }],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `api/contact/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

// Hook eksporty:
export const {
  useGetFilteredTransactionsQuery,
  useGetTransactionByIdQuery,
  useDeleteTransactionMutation,
} = contactApi;
