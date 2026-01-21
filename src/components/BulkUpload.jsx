// import React, { useRef, useState } from "react";
// import Stack from "react-bootstrap/esm/Stack";
// import { ProgressBar } from "react-bootstrap";
// import Plus from "../assets/images/plus.svg";
// import { toast } from "react-toastify";
// import {
//   useGetQuery,
//   usePostMutation,
//   useUploadMutation,
// } from "../api/apiSlice";
// import { endpoints } from "../api/config";
// import Select from "react-select";
// import { validateFile } from "../utils/Validations";
// import "../assets/css/custom.css";
// import { customSelectStyles } from "../utils/SelectStyle";

// const MAX_FILE_SIZE_MB = 25;

// const BulkUpload = () => {
//   const inputRef = useRef(null);
//   const [file, setFile] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [newCategory, setNewCategory] = useState("");
//   const [uploadComplete, setUploadComplete] = useState(false);

//   const { data: getCategory, refetch: refetchCategories } = useGetQuery(
//     endpoints.document.getcategories,
//   );
//   const [uploadMedia, { isLoading }] = useUploadMutation();
//   const [addcategory] = usePostMutation();

//   const CategoryData =
//     getCategory?.categories?.map((c) => ({ value: c, label: c })) || [];

//   const acceptFileType =
//     "image/png,image/jpeg,image/jpg,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation";

//   const acceptedExtensions = [
//     ".pdf",
//     ".jpg",
//     ".jpeg",
//     ".png",
//     ".doc",
//     ".docx",
//     ".txt",
//     ".xls",
//     ".xlsx",
//     ".ppt",
//     ".pptx",
//   ];

//   const handleAddCategory = async () => {
//     if (!newCategory.trim()) {
//       return toast.warn("Please enter category name");
//     }

//     try {
//       await addcategory({
//         endpoint: endpoints.upload.addonecategory,
//         params: { category: newCategory },
//         data: { categories: [newCategory] },
//       }).unwrap();

//       toast.success("Category added successfully");
//       setCategory(newCategory);
//       setNewCategory("");
//       refetchCategories();
//     } catch (error) {
//       console.error("Add category error:", error);
//       toast.error(error?.data?.detail || "Failed to add category");
//     }
//   };

//   const handleFileSelection = (selectedFile) => {
//     if (!selectedFile) return;

//     if (!category) {
//       return toast.warn("Please select category first");
//     }

//     if (selectedFile.size / (1024 * 1024) > MAX_FILE_SIZE_MB) {
//       return toast.error(`Max file size ${MAX_FILE_SIZE_MB}MB`);
//     }

//     if (!validateFile(selectedFile, acceptFileType, acceptedExtensions)) {
//       return toast.error("Unsupported file type");
//     }

//     setFile(selectedFile);
//     uploadFile(selectedFile);
//   };

//   const uploadFile = async (fileToUpload) => {
//     try {
//       await uploadMedia({
//         endpoint: endpoints.document.documentupload,
//         data: fileToUpload,
//         category,
//       }).unwrap();

//       toast.success("Document uploaded successfully");
//       setUploadComplete(true);

//       await uploadMedia({
//         endpoint: endpoints.document.documentingest,
//         params: {
//           file_name: fileToUpload.name,
//           category_name: category,
//         },
//       }).unwrap();

//       toast.success("Knowledge Base Ingestion completed successfully!");

//       setTimeout(() => {
//         setFile(null);
//         setCategory(null);
//         setUploadComplete(false);
//       }, 2000);
//     } catch (error) {
//       console.error("Upload error:", error);
//       toast.error(error?.data?.message || "Upload/Ingestion failed");
//       setFile(null);
//       setUploadComplete(false);
//     }
//   };

//   return (
//     <div className="row">
//       <div className="col-md-6 mb-3 d-flex flex-column gap-3">
//         <div className="Add-Category d-flex gap-2">
//           <input
//             type="text"
//             placeholder="Add new category"
//             value={newCategory}
//             onChange={(e) => setNewCategory(e.target.value)}
//             onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
//             disabled={isLoading}
//           />
//           <button
//             type="button"
//             onClick={handleAddCategory}
//             disabled={isLoading || !newCategory.trim()}
//           >
//             <img src={Plus} alt="Plus" />
//           </button>
//         </div>
//       </div>

//       <div className="col-md-6">
//         <div className="login-email-container">
//           <Select
//             options={CategoryData}
//             placeholder="-- Select Category --"
//             isDisabled={isLoading}
//             styles={customSelectStyles}
//             value={CategoryData.find((c) => c.value === category) || null}
//             onChange={(opt) => setCategory(opt?.value || null)}
//           />
//         </div>
//       </div>

//       <div className="col-md-12">
//         <div className="subcontainer">
//           <Stack gap={2}>
//             <h5>Upload Document</h5>

//             <div className="upload-container">
//               <div className="dropzone">
//                 <span>Drag your file to start uploading</span>
//                 <span>OR</span>

//                 <input
//                   type="file"
//                   hidden
//                   ref={inputRef}
//                   accept={acceptFileType}
//                   onChange={(e) => handleFileSelection(e.target.files[0])}
//                 />

//                 <button
//                   className="button-shape"
//                   onClick={() => inputRef.current.click()}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Uploading..." : "Select File"}
//                 </button>
//               </div>
//             </div>

//             {file && (
//               <div className="upload-preview">
//                 <strong>{file.name}</strong>

//                 <div className="mt-2">
//                   <small>Step 1: Document Upload</small>
//                   <ProgressBar
//                     now={uploadComplete ? 100 : 0}
//                     variant={uploadComplete ? "success" : "primary"}
//                     animated={!uploadComplete && isLoading}
//                   />
//                 </div>

//                 <div className="mt-2">
//                   <small>Step 2: Knowledge Base Ingestion</small>
//                   <ProgressBar
//                     now={uploadComplete && !isLoading ? 100 : 0}
//                     variant={uploadComplete && !isLoading ? "success" : "info"}
//                     animated={uploadComplete && isLoading}
//                   />
//                 </div>
//               </div>
//             )}
//           </Stack>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BulkUpload;

import React, { useRef, useState } from "react";
import FileUpload from "../assets/icons/bulkuploadfile.svg";
import Select from "react-select";
import { customSelectStyles } from "../utils/SelectStyle";

function BulkUpload() {
  const fileInputRef = useRef(null);

  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleFiles = (fileList) => {
    const uploadedFiles = Array.from(fileList);
    setFiles(uploadedFiles);
    simulateUpload();
  };

  const simulateUpload = () => {
    setProgress(0);
    let value = 0;

    const interval = setInterval(() => {
      value += 10;
      setProgress(value);

      if (value >= 100) {
        clearInterval(interval);
      }
    }, 300);
  };

  const addCategory = () => {
    if (categoryInput.trim()) {
      setCategories([...categories, categoryInput]);
      setCategoryInput("");
    }
  };

  const documentTypeOptions = [
    { value: "pdf", label: "PDF" },
    { value: "xlsx", label: "XLSX" },
    { value: "png", label: "PNG" },
    { value: "jpg", label: "JPG" },
  ];
  return (
    <div className="bulk-container">
      <span className="bulk-heading">File Upload</span>
      <div
        className="bulkupload-dotted"
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <img src={FileUpload} alt="upload" />

        <div className="dotted-border">
          <span>Drag and drop your files</span>
          <p>PDF, Word, CSV, JPG, PPT formats, up to 5MB</p>

          <button
            className="select-file-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
          >
            Select File
          </button>
        </div>
      </div>

      {/* File Names */}
      {files.length > 0 && (
        <div className="file-list">
          {files.map((file, index) => (
            <span key={index}>{file.name}</span>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {progress > 0 && (
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
      )}

      {/* Category Input */}

      <div className="Add-Category">
        <p>Add Category</p>
        <div className="category-row">
          <input
            type="text"
            placeholder="Category Name"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
          />
          <button onClick={addCategory}>Add Category</button>
        </div>
      </div>

      <div className="bulkuploading-container">
        <Select
          options={documentTypeOptions}
          isSearchable={true}
          styles={customSelectStyles}
          placeholder="Select "
        />
      </div>

      {/* Hidden Input */}
      <input
        type="file"
        hidden
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default BulkUpload;
