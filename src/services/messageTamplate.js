import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const messageTemplateApi = createApi({
  reducerPath: "messageTemplateApi",
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
  tagTypes: ["MessageTemplate"],

  endpoints: (builder) => ({
    // 1. Create new message template
    createMessageTemplate: builder.mutation({
      query: (body) => ({
        url: `api/message-templates/`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["MessageTemplate"],
    }),

    // 2. Get all message templates
    getAllMessageTemplates: builder.query({
      query: (search) => `api/message-templates/?search=${search}`,
      providesTags: ["MessageTemplate"],
    }),

    // 3. Get one message template
    getMessageTemplate: builder.query({
      query: (id) => `api/message-templates/${id}`,
      providesTags: (result, error, id) => [{ type: "MessageTemplate", id }],
    }),

    // 4. Update one message template
    updateMessageTemplate: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/message-templates/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "MessageTemplate", id },
        "MessageTemplate",
      ],
    }),

    // 5. Delete one message template
    deleteMessageTemplate: builder.mutation({
      query: (id) => ({
        url: `api/message-templates/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MessageTemplate"],
    }),
  }),
});

export const {
  useCreateMessageTemplateMutation,
  useGetAllMessageTemplatesQuery,
  useGetMessageTemplateQuery,
  useUpdateMessageTemplateMutation,
  useDeleteMessageTemplateMutation,
} = messageTemplateApi;
