// import { fetchBaseQuery } from "@reduxjs/toolkit/query";
// import { createApi } from "@reduxjs/toolkit/query/react";
// import { dataToQueryParameter } from "./APIHelper";
// import { baseUrl } from "./config";

// export const apiSlice = createApi({
//   baseQuery: fetchBaseQuery({
//     baseUrl: baseUrl,
//   }),
//   endpoints: (builder) => ({
//     get: builder.query({
//       query: (arg) => {
//         if (!arg) return "";
//         return arg.endpoint
//           ? `${arg.endpoint}${
//               arg.params ? dataToQueryParameter(arg.params) : ""
//             }`
//           : dataToQueryParameter(arg);
//       },
//     }),
//       ChatPreview: builder.mutation({
//       query: (arg) => ({
//         url: arg.endpoint,
//         method: "POST",
//         body: arg.body,
//         responseHandler: (response) => response.blob(),
//       }),
//     }),
//     post: builder.mutation({
//       query: (arg) => ({
//         url: arg.params
//           ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
//           : arg?.endpoint,
//         method: "POST",
//         body: arg?.data,
//         headers: arg?.headers
//           ? arg?.headers
//           : {
//               "Content-Type": "application/json",
//             },
//       }),
//       transformResponse: (response) => response?.data,
//     }),
//     put: builder.mutation({
//       query: (arg) => ({
//         url: arg.params
//           ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
//           : arg?.endpoint,
//         method: "PUT",
//         body: arg.data,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//     delete: builder.mutation({
//       query: (arg) => ({
//         url: arg.params
//           ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
//           : arg.endpoint,
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: arg?.data,
//       }),
//     }),
//     patch: builder.mutation({
//       query: (arg) => ({
//         url: arg.params
//           ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
//           : arg.endpoint,
//         method: "PATCH",
//         body: arg?.data,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }),
//     }),
//     upload: builder.mutation({
//       query: (arg) => {
//         const bodyFormData = new FormData();
//         bodyFormData.append("file", arg.data);
//         bodyFormData.append("category", arg?.category);
//         return {
//           url: arg.params
//             ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
//             : arg?.endpoint,
//           method: "POST",
//           body: bodyFormData,
//         };
//       },
//     }),
//     documentPreview: builder.query({
//       query: (arg) => ({
//         url: arg.params
//           ? `${arg.endpoint}${dataToQueryParameter(arg?.params)}`
//           : arg.endpoint,
//         responseHandler: (response) => response.blob(),
//       }),
//     }),

//   }),
// });

// export const {
//   useGetQuery,
//   usePostMutation,
//   usePutMutation,
//   useDeleteMutation,
//   usePatchMutation,
//   useUploadMutation,
//   useLazyDocumentPreviewQuery,
//   useChatPreviewMutation
// } = apiSlice;

import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";
import { dataToQueryParameter } from "./APIHelper";
import { baseUrl } from "./config";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    get: builder.query({
      query: (arg) => {
        const endpoint = arg?.endpoint || arg;
        const params = arg?.params ? dataToQueryParameter(arg.params) : "";
        return `${endpoint}${params}`;
      },
    }),

    generic: builder.mutation({
      query: ({ endpoint, method = "POST", data, params, headers }) => ({
        url: params ? `${endpoint}${dataToQueryParameter(params)}` : endpoint,
        method,
        body: data,
        headers: headers || { "Content-Type": "application/json" },
      }),
      transformResponse: (res) => res?.data || res,
    }),

    upload: builder.mutation({
      query: ({ endpoint, data, params }) => {
        const formData = new FormData();
        if (data) {
          Object.entries(data).forEach(([key, value]) =>
            formData.append(key, value),
          );
        }
        return {
          url: params ? `${endpoint}${dataToQueryParameter(params)}` : endpoint,
          method: "POST",
          body: formData,
        };
      },
      transformResponse: (res) => res?.data || res,
    }),

    blobRequest: builder.query({
      query: ({ endpoint, params }) => ({
        url: params ? `${endpoint}${dataToQueryParameter(params)}` : endpoint,
        responseHandler: (res) => res.blob(),
      }),
    }),

    ReferenceRequest: builder.mutation({
      query: ({ endpoint, body, params }) => ({
        url: params ? `${endpoint}${dataToQueryParameter(params)}` : endpoint,
        method: "POST",
        body: body,
        responseHandler: (res) => res.blob(),
      }),
    }),
  }),
});

export const {
  useGetQuery,
  useGenericMutation,
  useUploadMutation,
  useLazyBlobRequestQuery,
  useReferenceRequestMutation
} = apiSlice;
