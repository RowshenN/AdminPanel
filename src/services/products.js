import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const productApi = createApi({
  reducerPath: "productApi",
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
  tagTypes: ["Product"],

  endpoints: (builder) => ({
    // 1. Get all products
    getAllProducts: builder.query({
      query: (search) => `/api/products/?search=${search}`,
      providesTags: ["Product"],
    }),

    // 2. Create product (image, title, category_id)
    createProduct: builder.mutation({
      query: (formData) => ({
        url: `api/products/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // 3. Update product (text only or with file optionally)
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    // 4. Get one product
    getProductById: builder.query({
      query: (id) => `api/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // 5. Get all products of a specific category
    getProductsByCategory: builder.query({
      query: (categoryId) => `api/products/category/${categoryId}`,
      providesTags: ["Product"],
    }),

    // 6. Delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `api/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useDeleteProductMutation,
} = productApi;
