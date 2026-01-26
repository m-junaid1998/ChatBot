// import React, { useRef, useState } from "react";
// import FileUpload from "../assets/icons/bulkuploadfile.svg";
// import Select from "react-select";
// import { customSelectStyles } from "../utils/SelectStyle";

// function BulkUpload() {
//   const fileInputRef = useRef(null);

//   const [files, setFiles] = useState([]);
//   const [progress, setProgress] = useState(0);
//   const [categoryInput, setCategoryInput] = useState("");
//   const [categories, setCategories] = useState([]);

//   const handleClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleDragOver = (e) => e.preventDefault();

//   const handleDrop = (e) => {
//     e.preventDefault();
//     handleFiles(e.dataTransfer.files);
//   };

//   const handleFileChange = (e) => {
//     handleFiles(e.target.files);
//   };

//   const handleFiles = (fileList) => {
//     const uploadedFiles = Array.from(fileList);
//     setFiles(uploadedFiles);
//     simulateUpload();
//   };

//   const simulateUpload = () => {
//     setProgress(0);
//     let value = 0;

//     const interval = setInterval(() => {
//       value += 10;
//       setProgress(value);

//       if (value >= 100) {
//         clearInterval(interval);
//       }
//     }, 300);
//   };

//   const addCategory = () => {
//     if (categoryInput.trim()) {
//       setCategories([...categories, categoryInput]);
//       setCategoryInput("");
//     }
//   };

//   const documentTypeOptions = [
//     { value: "pdf", label: "PDF" },
//     { value: "xlsx", label: "XLSX" },
//     { value: "png", label: "PNG" },
//     { value: "jpg", label: "JPG" },
//   ];
//   return (
//     <div className="bulk-container">
//       <span className="bulk-heading">File Upload</span>
//       <div
//         className="bulkupload-dotted"
//         onClick={handleClick}
//         onDrop={handleDrop}
//         onDragOver={handleDragOver}
//       >
//         <img src={FileUpload} alt="upload" />

//         <div className="dotted-border">
//           <span>Drag and drop your files</span>
//           <p>PDF, Word, CSV, JPG, PPT formats, up to 5MB</p>

//           <button
//             className="select-file-btn"
//             onClick={(e) => {
//               e.stopPropagation();
//               handleClick();
//             }}
//           >
//             Select File
//           </button>
//         </div>
//       </div>

//       {/* File Names */}
//       {files.length > 0 && (
//         <div className="file-list">
//           {files.map((file, index) => (
//             <span key={index}>{file.name}</span>
//           ))}
//         </div>
//       )}

//       {/* Progress Bar */}
//       {progress > 0 && (
//         <div className="progress-bar">
//           <div className="progress-fill" style={{ width: `${progress}%` }} />
//         </div>
//       )}

//       {/* Category Input */}

//       <div className="Add-Category">
//         <p>Add Category</p>
//         <div className="category-row">
//           <input
//             type="text"
//             placeholder="Category Name"
//             value={categoryInput}
//             onChange={(e) => setCategoryInput(e.target.value)}
//           />
//           <button onClick={addCategory}>Add Category</button>
//         </div>
//       </div>

//       <div className="Type-Category">
//         <p>Type Category</p>
//         <div className="inputs-container">
//           <Select
//             options={documentTypeOptions}
//             isSearchable={true}
//             styles={customSelectStyles}
//             placeholder="Select Category Type"
//             menuPlacement="auto"
//             menuPosition="fixed"
//           />
//         </div>
//       </div>

//       {/* Hidden Input */}
//       <input
//         type="file"
//         hidden
//         multiple
//         ref={fileInputRef}
//         onChange={handleFileChange}
//       />
//     </div>
//   );
// }

// export default BulkUpload;

import React, { useRef, useState } from "react";
import FileUploadIcon from "../assets/icons/bulkuploadfile.svg";
import Pause from "../assets/icons/pause.svg";
import Delete from "../assets/icons/table-delete-icon.svg";

import Select from "react-select";
import { customSelectStyles } from "../utils/SelectStyle";
import { toast } from "react-toastify";
import {
  useGetQuery,
  useGenericMutation,
  useUploadMutation,
} from "../api/apiSlice";
import { endpoints } from "../api/config";

function BulkUpload() {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryInput, setCategoryInput] = useState("");
  const [currentStep, setCurrentStep] = useState(0);

  const { data: getCategory, refetch: refetchCategories } = useGetQuery(
    endpoints.document.documentcategories,
  );
  const [uploadFile, { isLoading: isUploading }] = useUploadMutation();
  const [mutate] = useGenericMutation();

  const categoryOptions =
    getCategory?.categories?.map((c) => ({ value: c, label: c })) || [];

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleAddCategory = async () => {
    if (!categoryInput.trim()) return toast.warn("Please enter category name");
    try {
      await mutate({
        endpoint: endpoints.upload.onecategory,
        method: "POST",
        params: { category: categoryInput },
        data: { categories: [categoryInput] },
      }).unwrap();
      toast.success("Category added!");
      setCategoryInput("");
      refetchCategories();
    } catch (error) {
      toast.error("Failed to add category");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!selectedCategory) return toast.warn("Please select a category first");
    setSelectedFile(file);
    processFileUpload(file);
  };

  const processFileUpload = async (fileToUpload) => {
    try {
      setCurrentStep(1);
      await uploadFile({
        endpoint: endpoints.document.documentupload,
        data: { file: fileToUpload, category: selectedCategory.value },
      }).unwrap();

      setCurrentStep(2);
      await mutate({
        endpoint: endpoints.document.documentingest,
        method: "POST",
        params: {
          file_name: fileToUpload.name,
          category_name: selectedCategory.value,
        },
      }).unwrap();

      toast.success("Knowledge Base Ingestion complete!");
    } catch (error) {
      toast.error("Process failed");
      setSelectedFile(null);
      setCurrentStep(0);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setCurrentStep(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bulk-container">
      <span className="bulk-heading">File Upload</span>

      {/* Drag & Drop Area */}
      <div
        className={`bulkupload-dotted ${isUploading ? "disabled" : ""}`}
        onClick={() => !isUploading && fileInputRef.current?.click()}
      >
        <img src={FileUploadIcon} alt="upload" />
        <div className="dotted-border">
          <span>
            {selectedFile ? selectedFile.name : "Drag and drop your files"}
          </span>
          <p>PDF, Word, CSV, JPG, PPT formats, up to 5MB</p>
          <button className="select-file-btn" type="button">
            Select File
          </button>
        </div>
      </div>

      {selectedFile && (
        <div className="file-status-card mt-3">
          <div className="file-info-section">
            <div className="file-icon-bg">
              <img src={FileUploadIcon} alt="file" />
            </div>
            <div className="file-details">
              <span className="file-name">{selectedFile.name}</span>
              <div className="file-meta">
                <span>{formatFileSize(selectedFile.size)}</span>
                <span className="separator">|</span>
                <span className="upload-percentage">
                  {currentStep === 2 ? "100%" : "55%"}
                </span>
                <span className="separator">•</span>
                <span className="status-text">
                  {currentStep === 2 ? "Uploaded Successfully" : "Uploading..."}
                </span>
              </div>
            </div>
          </div>
          <div className="file-actions">
            {currentStep === 1 && (
              <button
                className="action-btn pause-btn"
                onClick={(e) => e.stopPropagation()}
              >
                <img src={Pause} alt="pause" />
              </button>
            )}
            <button
              className="action-btn delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
            >
              <img src={Delete} alt="delete" />
            </button>
          </div>
        </div>
      )}

      {/* Categories Sections */}
      <div className="Add-Category mt-2">
        <p>Add Category</p>
        <div className="category-row">
          <input
            type="text"
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            placeholder="Category Name"
          />
          <button type="button" onClick={handleAddCategory}>
            Add Category
          </button>
        </div>
      </div>

      <div className="Type-Category mt-2">
        <p>Type Category</p>
        <div className="inputs-container">
          <Select
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            styles={customSelectStyles}
            placeholder="Select"
            menuPlacement="auto"
            menuPosition="fixed"
          />
        </div>
      </div>

      <input
        type="file"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default BulkUpload;
