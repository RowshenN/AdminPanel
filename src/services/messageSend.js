import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const messageSendApi = createApi({
  reducerPath: "messageSendApi",
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
  tagTypes: ["MessageSend"],

  endpoints: (builder) => ({
    // 1. Create a sent message
    createMessageSend: builder.mutation({
      query: (body) => ({
        url: `api/messages/send`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["MessageSend"],
    }),

    // 2. Get all sent messages
    getAllMessageSents: builder.query({
      query: (search) => `api/messages/sent?search=${search}`,
      providesTags: ["MessageSend"],
    }),

    // 3. Get one sent message
    getMessageSend: builder.query({
      query: (id) => `api/messages/sent/${id}`,
      providesTags: (result, error, id) => [{ type: "MessageSend", id }],
    }),

    // 4. Update sent message
    updateMessageSend: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/messages/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "MessageSend", id },
        "MessageSend",
      ],
    }),

    // 5. Delete sent message
    deleteMessageSend: builder.mutation({
      query: (id) => ({
        url: `api/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MessageSend"],
    }),
  }),
});

export const {
  useCreateMessageSendMutation,
  useGetAllMessageSentsQuery,
  useGetMessageSendQuery,
  useUpdateMessageSendMutation,
  useDeleteMessageSendMutation,
} = messageSendApi;
