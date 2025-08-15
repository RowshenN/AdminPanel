import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const messageAutoReplyApi = createApi({
  reducerPath: "messageAutoReplyApi",
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
  tagTypes: ["AutoReply"],

  endpoints: (builder) => ({
    // 1. Create auto reply
    createAutoReply: builder.mutation({
      query: (body) => ({
        url: "api/message-auto-replies",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AutoReply"],
    }),

    // 2. Get all auto replies
    getAllAutoReplies: builder.query({
      query: (search) => `api/message-auto-replies/?search=${search}`,
      providesTags: ["AutoReply"],
    }),

    // 3. Get one auto reply
    getAutoReply: builder.query({
      query: (id) => `api/message-auto-replies/${id}`,
      providesTags: (result, error, id) => [{ type: "AutoReply", id }],
    }),

    // 4. Update auto reply
    updateAutoReply: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/message-auto-replies/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "AutoReply", id },
        "AutoReply",
      ],
    }),

    // 5. Delete auto reply
    deleteAutoReply: builder.mutation({
      query: (id) => ({
        url: `api/message-auto-replies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AutoReply"],
    }),
  }),
});

export const {
  useCreateAutoReplyMutation,
  useGetAllAutoRepliesQuery,
  useGetAutoReplyQuery,
  useUpdateAutoReplyMutation,
  useDeleteAutoReplyMutation,
} = messageAutoReplyApi;
