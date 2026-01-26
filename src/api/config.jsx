export const baseUrl = "http://202.47.59.77:8080";
export const endpoints = {
  document: {
    documentupload: "/documents/upload",
    documentingest: "/documents/ingest",
    documentcategories: "/documents/categories",
    documentdelete: "/documents/delete",
    documentpreview: "/documents/preview",
    documentdownload: "/documents/download",
    documenttable: "/documents/table",
  },

  upload: {
    onecategory: "/upload/one_category",
    bulkcategory: "/upload/bulk_category",
  },

  chat: {
    retrieval: "/chat/retrieval",
    response: "/chat/response",
    reference: "/chat/reference",
    audio: "/chat/audio",
  },
};
