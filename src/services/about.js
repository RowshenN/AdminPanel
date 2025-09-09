import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const aboutApi = createApi({
  reducerPath: "aboutApi",
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
  tagTypes: ["About"],

  endpoints: (builder) => ({
    // Create new about
    createAbout: builder.mutation({
      query: (body) => ({
        url: "api/about/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["About"],
    }),

    // Get all abouts
    getAllAbouts: builder.query({
      query: (params) => {
        const query = new URLSearchParams(params).toString();
        return `api/about/all?${query}`;
      },
      providesTags: ["About"],
    }),

    // Get one about
    getAbout: builder.query({
      query: (id) => `api/about/${id}`,
      providesTags: (result, error, id) => [{ type: "About", id }],
    }),

    // Update about
    updateAbout: builder.mutation({
      query: (body) => ({
        url: "api/about/update",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "About", id },
        "About",
      ],
    }),

    // Soft delete
    deleteAbout: builder.mutation({
      query: (id) => ({
        url: `api/about/delete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["About"],
    }),

    // Restore deleted
    unDeleteAbout: builder.mutation({
      query: (id) => ({
        url: `api/about/unDelete/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["About"],
    }),

    // Hard destroy
    destroyAbout: builder.mutation({
      query: (id) => ({
        url: `api/about/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["About"],
    }),
  }),
});

export const {
  useCreateAboutMutation,
  useGetAllAboutsQuery,
  useGetAboutQuery,
  useUpdateAboutMutation,
  useDeleteAboutMutation,
  useUnDeleteAboutMutation,
  useDestroyAboutMutation,
} = aboutApi;
