export const baseUrl = "http://202.47.59.77:8080";
export const endpoints = {
  document: {
    documentupload: "/documents/upload",
    getcategories: "/documents/categories",
    documenttable: "/documents/table",
    documentdelete: "/documents/delete",
    documentpreview: "/documents/preview",
    documentdownload: "/documents/download",
    documentcsv: "/documents/download_csv",
    documentingest: "/documents/ingest",
  },
  upload: {
    addonecategory: "/upload/one_category",
  },
  chat: {
    chatbot: "/chat/response",
    retrieval: "/chat/retrieval",
  },
};
