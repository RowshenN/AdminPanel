import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const variantApi = createApi({
  reducerPath: "variantApi",
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
  tagTypes: ["Variant"],

  endpoints: (builder) => ({
    // 1. Create variant
    createVariant: builder.mutation({
      query: (body) => ({
        url: `api/variant/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Variant", "Product"],
    }),

    // 2. Get all variants of a product
    getVariantsByProduct: builder.query({
      query: (productId) => `api/products/${productId}/variants`,
      providesTags: ["Variant"],
    }),

    // 3. Update variant
    updateVariant: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/variant/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Variant"],
    }),

    // 4. Delete variant
    deleteVariant: builder.mutation({
      query: (id) => ({
        url: `api/variant/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Variant"],
    }),
  }),
});

export const {
  useCreateVariantMutation,
  useGetVariantsByProductQuery,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = variantApi;
