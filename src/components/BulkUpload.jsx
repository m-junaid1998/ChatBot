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

      <div className="Type-Category">
        <p>Type Category</p>
      <div className="inputs-container">
        <Select
          options={documentTypeOptions}
          isSearchable={true}
          styles={customSelectStyles}
          placeholder="Select "
        />
      </div>
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
