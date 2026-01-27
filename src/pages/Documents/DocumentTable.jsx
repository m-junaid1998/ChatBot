// import React, { useState } from "react";
// import TableView from "../../components/TableView";
// import DeleteModal from "../../components/DeleteModal/DeleteModal";
// import { endpoints } from "../../api/config";
// import { useGetQuery, useLazyBlobRequestQuery } from "../../api/apiSlice";
// import { downloadFileFromBlob } from "../../utils/HelperFunction";
// import { handleFileDownload } from "../../utils/Excel";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import { toast } from "react-toastify";

// const tableHead = [
//   { id: "document_name", label: "Document Name" },
//   { id: "document_type", label: "Document Type" },
//   { id: "uploaded_by", label: "Uploaded By" },
//   { id: "status", label: "Status" },
//   { id: "category", label: "Category" },
//   { id: "date_of_upload", label: "Date of upload" },
//   { id: "time_of_upload", label: "Time of Upload" },
// ];

// const DocumentTable = () => {
//   const [deleteTarget, setDeleteTarget] = useState(null);

//   const {
//     data: documenttable,
//     refetch,
//     isLoading,
//   } = useGetQuery(endpoints.document.documenttable);

//   const tableData = documenttable?.documents || [];
//   const [blobRequest] = useLazyBlobRequestQuery();

//   const handleView = async (item) => {
//     try {
//       const res = await blobRequest({
//         endpoint: endpoints.document.documentpreview,
//         params: { object_id: item?._id },
//       }).unwrap();
//       const url = URL.createObjectURL(res);
//       window.open(url, "_blank");
//     } catch (e) {
//       console.log(e);
//       toast.error("Failed to View document");
//     }
//   };

//   const handleDownload = async (item) => {
//     try {
//       const res = await blobRequest({
//         endpoint: endpoints.document.documentdownload,
//         params: { object_id: item?._id },
//       }).unwrap();
//       downloadFileFromBlob(res, item?.document_name);
//       toast.success("File downloaded successfully");
//     } catch (e) {
//       console.error("Download error:", e);
//       toast.error("Failed to download document");
//     }
//   };

//   const handleExport = () => {
//     if (!tableData.length) {
//       return toast.error("No data to export");
//     }
//     handleFileDownload(
//       tableData.map(({ _id, ...rest }) => rest),
//       "Document-List",
//     );
//     toast.success(`${tableData.length} documents exported successfully`);
//   };

//   const handleDelete = (item) => {
//     setDeleteTarget(item);
//   };

//   return (
//     <div className="bulk-container">
//       <div className="company-managment-action-row">
//         <Breadcrumbs
//           title={"Recent Document Uploads"}
//           currentPage={"Document Uploads"}
//         />
//       </div>

//       <TableView
//         tableHead={tableHead}
//         tableData={tableData.slice(0, 6)}
//         isLoading={isLoading}
//         deleteButton
//         DownloadButton
//         searchRow={true}
//         filterRow={true}
//         handleDownload={handleDownload}
//         handleView={handleView}
//         handleDelete={handleDelete}
//         exportData={handleExport}
//         pagination={{ currentPage, totalPages }}
//         onPageChange={setCurrentPage}
//       />

//       {deleteTarget && (
//         <DeleteModal
//           show={!!deleteTarget}
//           onHide={() => setDeleteTarget(null)}
//           id={deleteTarget?._id}
//           endpoint={endpoints.document.documentdelete}
//           label="Document"
//           onDeleteSuccess={() => {
//             setDeleteTarget(null);
//             refetch();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default DocumentTable;

import React, { useState } from "react";
import TableView from "../../components/TableView";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import { endpoints } from "../../api/config";
import { useGetQuery, useLazyBlobRequestQuery } from "../../api/apiSlice";
import {
  downloadFileFromBlob,
  getErrorMessage,
} from "../../utils/HelperFunction";
import { handleFileDownload } from "../../utils/Excel";
import Breadcrumbs from "../../components/Breadcrumbs";
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

const DocumentTable = () => {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
    console.log("Selected:", selectedOption.value);
  };
  const limit = 5;
  const {
    data: documenttable,
    refetch,
    isLoading,
  } = useGetQuery({
    endpoint: endpoints.document.documenttable,
    params: {
      skip: (currentPage - 1) * limit,
      limit: limit,
    },
  });

  const tableData = documenttable?.documents || [];
  const totalRecords = documenttable?.total || 0;
  const totalPages = Math.ceil(totalRecords / limit);

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
      toast.success("File downloaded successfully");
    } catch (error) {
      const customMsg = "Fail to Download Document";
      toast.error(getErrorMessage(error, customMsg));
    }
  };

  const handleExport = () => {
    try {
      if (!tableData || tableData.length === 0) {
        return toast.warn("No data available to export");
      }
      const exportData = tableData.map(({ _id, id, ...rest }) => rest);
      handleFileDownload(exportData, "Document-List");
      toast.success(`${tableData.length} documents exported successfully`);
    } catch (error) {
      const errorMsg = getErrorMessage(error, "Failed to generate export file");
      toast.error(errorMsg);
      console.error("Export Error:", error);
    }
  };
  const handleDelete = (item) => {
    setDeleteTarget(item);
  };
  const categoryOptions = [
    {
      label: "Development",
      options: [
        { value: "web", label: "Web Development" },
        { value: "mobile", label: "Mobile App" },
      ],
    },
    {
      label: "Design",
      options: [
        { value: "uiux", label: "UI/UX Design" },
        { value: "graphic", label: "Graphic Design" },
      ],
    },
  ];

  return (
    <div className="bulk-container">
      <div className="company-managment-action-row">
        <Breadcrumbs
          title={"Recent Document Uploads"}
          currentPage={"Document Uploads"}
        />
      </div>

      <TableView
        tableHead={tableHead}
        tableData={tableData}
        isLoading={isLoading}
        deleteButton
        DownloadButton
        searchRow={true}
        filterRow={true}
        handleDownload={handleDownload}
        handleView={handleView}
        handleDelete={handleDelete}
        exportData={handleExport}
        pagination={{
          currentPage: currentPage,
          totalPages: totalPages,
        }}
        onPageChange={(page) => setCurrentPage(page)}
        // for select
        options={categoryOptions}
        selectedCategory={selectedCategory}
        onChange={handleChange}
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
