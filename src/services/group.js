import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const groupApi = createApi({
  reducerPath: "groupApi",
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
  tagTypes: ["Group"],

  endpoints: (builder) => ({
    // 1. Create new group
    createGroup: builder.mutation({
      query: (body) => ({
        url: "api/group/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Group"],
    }),

    // 2. Get all groups
    getAllGroups: builder.query({
      query: (search) => `api/group/?search=${search}`,
      providesTags: ["Group"],
    }),

    // 3. Get one group
    getGroup: builder.query({
      query: (id) => `api/group/${id}`,
      providesTags: (result, error, id) => [{ type: "Group", id }],
    }),

    // 4. Update one group
    updateGroup: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/group/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Group", id },
        "Group",
      ],
    }),

    // 5. Delete one group
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `api/group/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Group"],
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGetAllGroupsQuery,
  useGetGroupQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupApi;
