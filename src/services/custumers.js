import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const customerApi = createApi({
  reducerPath: "customerApi",
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
  tagTypes: ["Customer", "Transaction", "Message"],

  endpoints: (builder) => ({
    // 1. Get all customers
    getAllCustomers: builder.query({
      query: ({ limit, page, search }) =>
        `api/customers/?limit=${limit ? limit : 10}&page=${
          page ? page : 1
        }&search=${search}`,
      providesTags: ["Customer"],
    }),

    // 2. Create new customer
    createCustomer: builder.mutation({
      query: (body) => ({
        url: `api/auth/signup`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Customer"],
    }),

    // 3. Get one customer
    getCustomer: builder.query({
      query: (id) => `api/customers/${id}`,
      providesTags: (result, error, id) => [{ type: "Customer", id }],
    }),

    // 4. Get one customer's order transactions
    getCustomerTransactions: builder.query({
      query: (id) => `api/customers/${id}/transactions`,
      providesTags: (result, error, id) => [{ type: "Transaction", id }],
    }),

    // 5. Get all messages sent to one customer
    getCustomerMessages: builder.query({
      query: (id) => `api/customers/${id}/messages`,
      providesTags: (result, error, id) => [{ type: "Message", id }],
    }),

    // 6. Edit one customer
    updateCustomer: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/customers/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Customer", id },
        "Customer",
      ],
    }),

    // 7. Delete one customer
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `api/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
});

export const {
  useGetAllCustomersQuery,
  useCreateCustomerMutation,
  useGetCustomerQuery,
  useGetCustomerTransactionsQuery,
  useGetCustomerMessagesQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
