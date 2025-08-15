import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const reportApi = createApi({
  reducerPath: "reportApi",
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
  tagTypes: ["Report"],

  endpoints: (builder) => ({
    // 1. Get transaction history summary
    getTransactionHistorySummary: builder.query({
      query: ({ startDate, endDate }) =>
        `api/reports/transaction-history/summary?startDate=${startDate}&endDate=${endDate}`,
      providesTags: ["Report"],
    }),

    // 2. Get customer analytics
    getCustomerAnalytics: builder.query({
      query: () => "api/reports/customer-analytics",
      providesTags: ["Report"],
    }),

    // 3. Get sales summary (accepts startDate & endDate)
    getSalesSummary: builder.query({
      query: ({ startDate, endDate }) =>
        `api/reports/sales-summary?startDate=${startDate}&endDate=${endDate}`,
      providesTags: ["Report"],
    }),

    // 4. Get transaction order history (with pagination, date range, customer id)
    getTransactionOrderHistory: builder.query({
      query: ({ page = 1, limit = 10, id, startDate, endDate }) =>
        `api/reports/transaction-history?page=${page}&limit=${limit}&id=${id}&startDate=${startDate}&endDate=${endDate}`,
      providesTags: ["Report"],
    }),
  }),
});

export const {
  useGetTransactionHistorySummaryQuery,
  useGetCustomerAnalyticsQuery,
  useGetSalesSummaryQuery,
  useGetTransactionOrderHistoryQuery,
} = reportApi;
