import React, { useState } from "react";
import TableView from "../../components/TableView";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { endpoints } from "../../api/config";
import { useGetQuery, useLazyBlobRequestQuery } from "../../api/apiSlice";
import {
  downloadFileFromBlob,
  getErrorMessage,
} from "../../utils/HelperFunction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const tableHead = [
  { id: "document_name", label: "Document Name" },
  { id: "document_type", label: "Document Type" },
  { id: "uploaded_by", label: "Uploaded By" },
  { id: "status", label: "Status" },
  { id: "category", label: "Category" },
  { id: "date_of_upload", label: "Date of upload" },
  { id: "time_of_upload", label: "Time of Upload" },
];

const DocumentView = () => {
  const navigate = useNavigate();
  const [deleteTarget, setDeleteTarget] = useState(null);
  const {
    data: documenttable,
    refetch,
    isLoading,
  } = useGetQuery(endpoints.document.documenttable);

  const tableData = documenttable?.documents || [];

  const [blobRequest] = useLazyBlobRequestQuery();

  const handleView = async (item) => {
    try {
      const res = await blobRequest({
        endpoint: endpoints.document.documentpreview,
        params: { object_id: item?._id },
      }).unwrap();
      const url = URL.createObjectURL(res);
      window.open(url, "_blank");
    } catch (error) {
      const customMsg = "Fail to Preview Document";
      toast.error(getErrorMessage(error, customMsg));
    }
  };

  const handleDownload = async (item) => {
    try {
      const res = await blobRequest({
        endpoint: endpoints.document.documentdownload,
        params: { object_id: item?._id },
      }).unwrap();
      downloadFileFromBlob(res, item?.document_name);
    } catch (error) {
       const customMsg = "Fail to Download Document";
      toast.error(getErrorMessage(error, customMsg));
    }
  };

  const handleDelete = (item) => {
    setDeleteTarget(item);
  };

  return (
    <div className="bulk-container">
      <div className="documentview-row">
        <p>Recent Document Uploads</p>
        <button onClick={() => navigate("/documettable")}>View All</button>
      </div>
      <TableView
        tableHead={tableHead}
        tableData={tableData.slice(0, 6)}
        // isLoading
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

export default DocumentView;
