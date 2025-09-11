import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { token } from "../utils/token";

export const subscribesApi = createApi({
  reducerPath: "subscribesApi",
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
  tagTypes: ["Subscribes"],
  endpoints: (builder) => ({
    // Get all subscribes
    getAllSubscribes: builder.query({
      query: (search) =>
        search
          ? `api/subscribe/all?name=${encodeURIComponent(search)}`
          : `api/subscribe/all`,
      providesTags: ["Subscribes"],
    }),

    // Get one subscribe
    getSubscribe: builder.query({
      query: (id) => `api/subscribe/${id}`,
      providesTags: (result, error, id) => [{ type: "Subscribes", id }],
    }),

    // Create a new subscribe
    createSubscribe: builder.mutation({
      query: (body) => ({
        url: `api/subscribe/create`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscribes"],
    }),

    // Update a subscribe
    updateSubscribe: builder.mutation({
      query: ({ id, body }) => ({
        url: `api/subscribe/update`,
        method: "PATCH",
        body: { ...body, id },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Subscribes", id },
        "Subscribes",
      ],
    }),

    // Destroy a subscribe
    destroySubscribe: builder.mutation({
      query: (id) => ({
        url: `api/subscribe/destroy/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscribes"],
    }),

    // Send mail to one person
    sendToPerson: builder.mutation({
      query: (body) => ({
        url: `api/subscribe/sendToPerson`,
        method: "POST",
        body,
      }),
      invalidatesTags: [],
    }),

    // Send mail to all people
    sendToPeople: builder.mutation({
      query: (body) => ({
        url: `api/subscribe/sendToPeople`,
        method: "POST",
        body,
      }),
      invalidatesTags: [],
    }),
  }),
});

export const {
  useGetAllSubscribesQuery,
  useGetSubscribeQuery,
  useCreateSubscribeMutation,
  useUpdateSubscribeMutation,
  useDestroySubscribeMutation,
  useSendToPersonMutation,
  useSendToPeopleMutation,
} = subscribesApi;
