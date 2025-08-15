import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";
const baseUrl = process.env.REACT_APP_BASE_URL;
export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
    // headers: {
    //   Authorization: `Bearer ${token()}`,
    //   //   "Content-Type": "application/json",
    //   //   Accept: "*/*",
    // },
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      if (token()) {
        headers.set("Authorization", `Bearer ${token()}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Category"],

  endpoints: (builder) => ({
    // 1. ✅ Get all categories
    getAllCategories: builder.query({
      query: (search) => `api/categories/?search=${search}`,
      providesTags: ["Category"],
    }),

    // 2. ✅ Get one category by ID
    getCategoryById: builder.query({
      query: (id) => `api/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    // 3. ✅ Create category (title + image)
    createCategory: builder.mutation({
      query: (formData) => ({
        url: `api/categories`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),

    // 4. ✅ Delete category
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `api/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),

    // 5. ✅ Update category (title + image)
    updateCategory: builder.mutation({
      query: ({ id, formData }) => ({
        url: `api/categories/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
