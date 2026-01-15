import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { dataToQueryParameter } from "./APIHelper";
import { baseUrl, endpoints } from "./config";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: baseUrl,
  }),
  endpoints: (builder) => ({
    // get: builder.query({
    //   query: (endpoint) => endpoint,
    // }),
    get: builder.query({
      query: (arg) => {
        if (!arg) return "";
        return arg.endpoint
          ? `${arg.endpoint}${
              arg.params ? dataToQueryParameter(arg.params) : ""
            }`
          : dataToQueryParameter(arg);
      },
    }),
    post: builder.mutation({
      query: (arg) => ({
        url: arg.params
          ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
          : arg?.endpoint,
        method: "POST",
        body: arg?.data,
        headers: arg?.headers
          ? arg?.headers
          : {
              "Content-Type": "application/json",
            },
      }),
      transformResponse: (response) => response?.data,
    }),
    put: builder.mutation({
      query: (arg) => ({
        url: arg.params
          ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
          : arg?.endpoint,
        method: "PUT",
        body: arg.data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    delete: builder.mutation({
      query: (arg) => ({
        url: arg.params
          ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
          : arg.endpoint,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: arg?.data,
      }),
    }),
    patch: builder.mutation({
      query: (arg) => ({
        url: arg.params
          ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
          : arg.endpoint,
        method: "PATCH",
        body: arg?.data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    upload: builder.mutation({
      query: (arg) => {
        const bodyFormData = new FormData();
        bodyFormData.append("file", arg.data);
        bodyFormData.append("category", arg?.category);
        return {
          url: arg.params
            ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
            : arg?.endpoint,
          method: "POST",
          body: bodyFormData,
        };
      },
    }),
    documentPreview: builder.query({
      query: (arg) => ({
        url: arg.params
          ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
          : arg.endpoint,
        responseHandler: (response) => response.blob(),
      }),
    }),
    streamChat: builder.mutation({
      query: (data) => ({
        url: endpoints?.chat?.chatbot,
        method: "Post",
        body: data,
        async onCacheEnterAdded(arg, { updateCachedData, cacheEntryRemoved }) {
          const controller = new AbortController();
          const response = await fetch(
            `${baseUrl}${endpoints?.chat?.chatbot}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
              signal: abortControllerRef.current.signal,
            }
          );

          if (!response.ok) {
            let errorMessage = `Server error: ${response.status}`;
            try {
              const errorData = await response.json();
              errorMessage =
                errorData.detail || errorData.message || errorMessage;
            } catch (e) {
              const errorText = await response.text();
              errorMessage = errorText || errorMessage;
            }
            throw new Error(errorMessage);
          }

          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let accumulated = "";
          let buffer = "";

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value, { stream: true });
            buffer += chunk;
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                try {
                  const jsonStr = line.slice(6).trim();
                  if (!jsonStr) continue;

                  const json = JSON.parse(jsonStr);

                  if (json.content) {
                    accumulated += json.content;
                    updateCachedData((draft) => {
                      draft = accumulated;
                    });
                  }

                  if (json.stop) return;
                } catch (parseErr) {
                  console.error("Parse error:", parseErr);
                }
              }
            }
          }
        },
      }),
    }),
  }),
});

export const {
  useGetQuery,
  usePostMutation,
  usePutMutation,
  useDeleteMutation,
  usePatchMutation,
  useUploadMutation,
  useLazyDocumentPreviewQuery,
  useStreamChatMutation,
} = apiSlice;
