// services/transaction.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";
export const transactionApi = createApi({
  reducerPath: "transactionApi",
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
  tagTypes: ["Transaction"],
  endpoints: (builder) => ({
    getFilteredTransactions: builder.query({
      // Parametr hökmünde sorag parametrlerini geçireris:
      query: ({ page = 1, limit = 10, startDate, endDate, search, type }) =>
        `api/transaction/all?page=${page}&limit=${limit}&startDate=${startDate}&endDate=${endDate}&title=${search}&type=${type}`,
      providesTags: ["Transaction"],
    }),

    getTransactionById: builder.query({
      query: (id) => `api/transaction/${id}`,
      providesTags: (result, error, id) => [{ type: "Transaction", id }],
    }),

    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `api/transaction/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Transaction"],
    }),
  }),
});

// Hook eksporty:
export const {
  useGetFilteredTransactionsQuery,
  useGetTransactionByIdQuery,
  useDeleteTransactionMutation,
} = transactionApi;
