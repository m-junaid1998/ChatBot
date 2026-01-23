import React, { useState } from "react";
import TableView from "../../components/TableView";
import { endpoints } from "../../api/config";
import { useGetQuery, useLazyDocumentPreviewQuery } from "../../api/apiSlice";
import DeleteModal from "../../components/DeleteModal/DeleteModal";

const tableHead = [
  { id: "document_name", label: "Document Name" },
  { id: "document_type", label: "Document Type" },
  { id: "uploaded_by", label: "Uploaded By" },
  { id: "status", label: "Status" },
  { id: "category", label: "Category" },
  { id: "date_of_upload", label: "Date of upload" },
  { id: "time_of_upload", label: "Time of Upload" },
];

const dummyDocuments = [
  {
    _id: "1",
    document_name: "Invoice_Jan.pdf",
    document_type: "PDF",
    uploaded_by: "Harry",
    status: "Completed",
    category: "Finance",
    date_of_upload: "2026-01-20",
    time_of_upload: "2026-01-20",
  },
  {
    _id: "2",
    document_name: "Staff_List.xlsx",
    document_type: "Excel",
    uploaded_by: "Amjad",
    status: "Pending",
    category: "HR",
    date_of_upload: "2026-01-21",
    time_of_upload: "2026-01-20",
  },
  {
    _id: "3",
    document_name: "Logo_v1.png",
    document_type: "JPG",
    uploaded_by: "Harry",
    status: "In Progress",
    category: "Marketing",
    date_of_upload: "2026-01-21",
    time_of_upload: "2026-01-20",
  },
  {
    _id: "4",
    document_name: "Contract.docx",
    document_type: "Word",
    uploaded_by: "Admin",
    status: "Completed",
    category: "Legal",
    date_of_upload: "2026-01-22",
    time_of_upload: "2026-01-20",
  },
  {
    _id: "5",
    document_name: "Briefing.ppt",
    document_type: "PPT",
    uploaded_by: "Harry",
    status: "Completed",
    category: "Design",
    date_of_upload: "2026-01-22",
    time_of_upload: "2026-01-20",
  },
  {
    _id: "6",
    document_name: "Taxes.pdf",
    document_type: "PDF",
    uploaded_by: "Amjad",
    status: "Pending",
    category: "Finance",
    date_of_upload: "2026-01-23",
    time_of_upload: "2026-01-20",
  },
  {
    _id: "7",
    document_name: "Survey.csv",
    document_type: "Excel",
    uploaded_by: "Admin",
    status: "Completed",
    category: "Research",
    date_of_upload: "2026-01-23",
    time_of_upload: "2026-01-20",
  },
  {
    _id: "8",
    document_name: "Plan.doc",
    document_type: "Word",
    uploaded_by: "Harry",
    status: "In Progress",
    category: "Operations",
    date_of_upload: "2026-01-24",
    time_of_upload: "2026-01-20",
  },
];

const DocumentTable = () => {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const {
    data: documenttable,
    refetch,
    isLoading,
  } = useGetQuery(endpoints.document.documenttable);

  const tableData =
    documenttable?.documents?.length > 0
      ? documenttable.documents
      : dummyDocuments;

  const [getPreview] = useLazyDocumentPreviewQuery();

  const handleView = async (item) => {
    console.log("Viewing:", item.document_name);
  };

  const handleDownload = async (item) => {
    console.log("Downloading:", item.document_name);
  };

  const handleDelete = (item) => {
    setDeleteTarget(item);
  };

  return (
    <div>
     
      <TableView
        tableHead={tableHead}
        tableData={tableData.slice(0, 6)}
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
