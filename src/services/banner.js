import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      if (token()) {
        headers.set("Authorization", `Bearer ${token()}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Banner"],

  endpoints: (builder) => ({
    // Get all banners
    getAllBanners: builder.query({
      query: (params) => {
        const query = new URLSearchParams({
          type: params.type || "",
          order: params.order || 1,
          deleted: params.deleted || false,
          name: params.name || "",
        }).toString();
        return `api/banner/all`;
      },
      providesTags: ["Banner"],
    }),

    // Get one banner
    getBanner: builder.query({
      query: (id) => `api/banner/${id}`,
      providesTags: (result, error, id) => [{ type: "Banner", id }],
    }),

    // Create a banner
    createBanner: builder.mutation({
      query: (formData) => ({
        url: `api/banner/create`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),

    // Update a banner
    updateBanner: builder.mutation({
      query: (formData) => ({
        url: `api/banner/update`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Banner"],
    }),

    // Destroy a banner
    destroyBanner: builder.mutation({
      query: (id) => ({
        url: `api/banner/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Banner"],
    }),
  }),
});

export const {
  useGetAllBannersQuery,
  useGetBannerQuery,
  useCreateBannerMutation,
  useUpdateBannerMutation,
  useDestroyBannerMutation,
} = bannerApi;
