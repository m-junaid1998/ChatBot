import React, { useState } from "react";
import TableView from "../../components/TableView";
import { endpoints } from "../../api/config";
import { useGetQuery, useLazyDocumentPreviewQuery } from "../../api/apiSlice";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import "../../assets/css/custom.css";

const tableHead = [
  { id: "document_name", label: "Document Name" },
  { id: "document_type", label: "Document Type" },
  { id: "uploaded_by", label: "Uploaded By" },
  { id: "status", label: "Status" },
  { id: "category", label: "Category" },
  { id: "date_of_upload", label: "Date of upload" },
  { id: "time_of_upload", label: "Time of Upload" },
];

const DocumentTable = () => {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const { data: documenttable, refetch } = useGetQuery(
    endpoints.document.documenttable,
  );

  const tableData = documenttable?.documents || [];

  const [getPreview] = useLazyDocumentPreviewQuery();

  const handleView = async (item) => {
    try {
      const res = await getPreview({
        endpoint: endpoints.document.documentpreview,
        params: { object_id: item?._id },
      }).unwrap();
      const url = URL.createObjectURL(res);
      window.open(url, "_blank");
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownload = async (item) => {
    try {
      const res = await getPreview({
        endpoint: endpoints.document.documentdownload,
        params: { object_id: item?._id },
      }).unwrap();
      downloadFileFromBlob(res, item?.document_name);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = (item) => {
    setDeleteTarget(item);
  };

  return (
    <div className=" bulk-container">
      <TableView
        tableHead={tableHead}
        tableData={tableData.slice(0, 7) || []}
        deleteButton
        DownloadButton
        handleDownload={handleDownload}
        handleView={handleView}
        handleDelete={handleDelete}
      />
      {deleteTarget && (
        <DeleteModal
          show={!!deleteTarget}
          onHide={() => setDeleteTarget(null)}
          id={deleteTarget?._id}
          endpoint={endpoints.document.documentdelete}
          label="Document"
          onDeleteSuccess={() => {
            setDeleteTarget(null);
            refetch();
          }}
        />
      )}
    </div>
  );
};

export default DocumentTable;
