// import React from "react";
// import TrashIcon from "../assets/icons/trash.svg";
// function Dashboard() {
//   const stats = {
//     totalDoc: 350,
//     deletedDoc: 15,
//     addThisWeek: 50,
//     lastUpdated: "09/1/26",
//     percentageChange: 7,
//   };
//   return (
//     <div>
//       <h1>Good morning, Amjad</h1>
//       <p>Stay on top of your tasks, monitor progress, and track status.</p>

//       <div className="sok-widgets-container">
//         <div className="sok-widgets">
//           <div className="sok-widgets-body">
//             <p>Total Documents</p>
//             <img src={TrashIcon} alt="Total Documents Icon" />
//           </div>
//           <p>{0}</p>
//         </div>
//         <div className="sok-widgets">
//           <div className="sok-widgets-body">
//             <p>Deleted Documents</p>
//             <img src={TrashIcon} alt="Deleted Icon" />
//           </div>
//           <p>{0}</p>
//         </div>
//         <div className="sok-widgets">
//           <div className="sok-widgets-body">
//             <p>Preview Documents</p>
//             <img src={TrashIcon} alt="Preview Icon" />
//           </div>
//           <p>{0}</p>
//         </div>
//         <div className="sok-widgets">
//           <div className="sok-widgets-body">
//             <p>Last Update</p>
//             <img src={TrashIcon} alt="Update Icon" />
//           </div>
//           <p>{"N/A"}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");

  // Stats data
  const stats = {
    totalDoc: 350,
    deletedDoc: 15,
    addThisWeek: 50,
    lastUpdated: "09/1/26",
    percentageChange: 7,
  };

  // Bar chart data
  const activityData = [
    {
      month: "Jan",
      Images: 20000,
      Media: 15000,
      Documents: 10000,
      Other: 5000,
    },
    {
      month: "Feb",
      Images: 25000,
      Media: 20000,
      Documents: 15000,
      Other: 8000,
    },
    {
      month: "Mar",
      Images: 30000,
      Media: 25000,
      Documents: 18000,
      Other: 10000,
    },
    {
      month: "Apr",
      Images: 22000,
      Media: 18000,
      Documents: 12000,
      Other: 7000,
    },
    {
      month: "May",
      Images: 28000,
      Media: 22000,
      Documents: 16000,
      Other: 9000,
    },
    {
      month: "Jun",
      Images: 35000,
      Media: 28000,
      Documents: 20000,
      Other: 12000,
    },
    {
      month: "Jul",
      Images: 25000,
      Media: 20000,
      Documents: 14000,
      Other: 8000,
    },
    {
      month: "Aug",
      Images: 18000,
      Media: 15000,
      Documents: 10000,
      Other: 6000,
    },
  ];

  // Pie chart data
  const categoryData = [
    { name: "PDF", value: 48, color: "#0e7490" },
    { name: "Docs", value: 23, color: "#fb923c" },
    { name: "PPT", value: 12, color: "#14b8a6" },
    { name: "jpg", value: 17, color: "#06b6d4" },
  ];

  // Recent uploads data
  const recentUploads = [
    {
      id: 1,
      name: "Compliance",
      type: "PDF",
      typeColor: "#ef4444",
      uploadBy: "Ahmed Raza",
      status: "Completed",
      statusColor: "#10b981",
      date: "17 Apr, 2026 03:45 PM",
    },
    {
      id: 2,
      name: "Product Guidelines",
      type: "CSV",
      typeColor: "#10b981",
      uploadBy: "Hassan Ali",
      status: "Completed",
      statusColor: "#10b981",
      date: "15 Apr, 2026 11:30 AM",
    },
    {
      id: 3,
      name: "Operations",
      type: "PPT",
      typeColor: "#f97316",
      uploadBy: "Umar Farooq",
      status: "Completed",
      statusColor: "#10b981",
      date: "15 Apr, 2026 12:00 PM",
    },
    {
      id: 4,
      name: "Risk & Compliance",
      type: "JPG",
      typeColor: "#10b981",
      uploadBy: "Saad Khan",
      status: "In Progress",
      statusColor: "#f59e0b",
      date: "14 Apr, 2026 09:15 PM",
    },
    {
      id: 5,
      name: "Loans",
      type: "DOCX",
      typeColor: "#3b82f6",
      uploadBy: "Bilal Ahmed",
      status: "Completed",
      statusColor: "#10b981",
      date: "10 Apr, 2026 06:00 AM",
    },
  ];

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="dashboard-wrapper">
      {/* Header Section */}
      <div className="">
        <div>
          <h1 className="dashboard-title">Good morning, Amjad</h1>
          <p className="dashboard-subtitle">
            Stay on top of your tasks, monitor progress, and track status.
          </p>
        </div>
      </div>

      {/* Stats and Charts Section - Single Row */}
      <div className="main-content-row">
        {/* Stats Widgets */}
        <div className="sok-widgets-container">
          <div className="sok-widgets sok-widgets-primary">
            <div className="sok-widgets-body">
              <p className="widget-title">Total Doc</p>
              <div className="widget-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                    fill="#FFA726"
                    opacity="0.3"
                  />
                  <polyline points="13 2 13 9 20 9" fill="#FFA726" />
                </svg>
              </div>
            </div>
            <h2 className="widget-value">{stats.totalDoc}</h2>
            <div className="widget-footer">
              <span className="percentage-badge positive">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2L6 10M6 2L3 5M6 2L9 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {stats.percentageChange}%
              </span>
              <span className="footer-text">This month</span>
            </div>
          </div>

          <div className="sok-widgets">
            <div className="sok-widgets-body">
              <p className="widget-title">Deleted Doc</p>
              <div className="widget-icon widget-icon-light">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                    fill="#FFA726"
                    opacity="0.3"
                  />
                  <polyline points="13 2 13 9 20 9" fill="#FFA726" />
                </svg>
              </div>
            </div>
            <h2 className="widget-value">{stats.deletedDoc}</h2>
            <div className="widget-footer">
              <span className="percentage-badge positive">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2L6 10M6 2L3 5M6 2L9 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {stats.percentageChange}%
              </span>
              <span className="footer-text">This month</span>
            </div>
          </div>

          <div className="sok-widgets">
            <div className="sok-widgets-body">
              <p className="widget-title">Add This Week</p>
              <div className="widget-icon widget-icon-light">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                    fill="#FFA726"
                    opacity="0.3"
                  />
                  <polyline points="13 2 13 9 20 9" fill="#FFA726" />
                </svg>
              </div>
            </div>
            <h2 className="widget-value">{stats.addThisWeek}</h2>
            <div className="widget-footer">
              <span className="percentage-badge positive">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2L6 10M6 2L3 5M6 2L9 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {stats.percentageChange}%
              </span>
              <span className="footer-text">This month</span>
            </div>
          </div>

          <div className="sok-widgets">
            <div className="sok-widgets-body">
              <p className="widget-title">Last Updated</p>
              <div className="widget-icon widget-icon-light">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
                    fill="#FFA726"
                    opacity="0.3"
                  />
                  <polyline points="13 2 13 9 20 9" fill="#FFA726" />
                </svg>
              </div>
            </div>
            <h2 className="widget-value">{stats.lastUpdated}</h2>
            <div className="widget-footer">
              <span className="percentage-badge positive">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 2L6 10M6 2L3 5M6 2L9 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {stats.percentageChange}%
              </span>
              <span className="footer-text">This month</span>
            </div>
          </div>
        </div>

        {/* Bar Chart - Data Activity */}
        <div className="chart-card chart-card-bar">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Data Activity</h3>
              <p className="chart-subtitle">Doc upload status graph</p>
            </div>
            <select className="chart-dropdown">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Yearly</option>
            </select>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: "#0891b2" }}
              ></span>
              <span>Images</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: "#14b8a6" }}
              ></span>
              <span>Media</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: "#fb923c" }}
              ></span>
              <span>Documents</span>
            </div>
            <div className="legend-item">
              <span
                className="legend-dot"
                style={{ backgroundColor: "#0e7490" }}
              ></span>
              <span>Other</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar
                dataKey="Other"
                stackId="a"
                fill="#0e7490"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Documents"
                stackId="a"
                fill="#fb923c"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Media"
                stackId="a"
                fill="#14b8a6"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="Images"
                stackId="a"
                fill="#0891b2"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Documents by Category */}
        <div className="chart-card chart-card-pie">
          <div className="chart-header">
            <div>
              <h3 className="chart-title">Documents by Category</h3>
              <p className="chart-subtitle">doc by category</p>
            </div>
            <div className="chart-actions">
              <select className="chart-dropdown">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Yearly</option>
              </select>
              <button className="chart-download-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <ResponsiveContainer width="60%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {categoryData.map((item, index) => (
                <div key={index} className="pie-legend-item">
                  <span
                    className="legend-dot"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        {/* File Upload */}
        <div className="upload-card">
          <h3 className="section-title">File Upload</h3>
          <div className="upload-area">
            <div className="upload-illustration">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#e0f2f1" />
                <path
                  d="M40 25v20M40 25l-5 5M40 25l5 5"
                  stroke="#14b8a6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="25"
                  y="35"
                  width="30"
                  height="20"
                  rx="2"
                  fill="#14b8a6"
                  opacity="0.3"
                />
              </svg>
            </div>
            <p className="upload-text">Drag and drop your files</p>
            <p className="upload-subtext">
              PDF, Ms word, Csv, Jpg, and PPT formats, up to 5MB
            </p>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.csv,.jpg,.jpeg,.png,.ppt,.pptx"
            />
            <button
              className="upload-button"
              onClick={() => document.getElementById("fileInput").click()}
            >
              Select File
            </button>
          </div>
          <div className="category-form">
            <label className="form-label">Add Category</label>
            <input
              type="text"
              className="form-input"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <label className="form-label">Category Type</label>
            <select
              className="form-select"
              value={categoryType}
              onChange={(e) => setCategoryType(e.target.value)}
            >
              <option value="">-- Select Category --</option>
              <option value="pdf">PDF</option>
              <option value="document">Document</option>
              <option value="spreadsheet">Spreadsheet</option>
              <option value="presentation">Presentation</option>
              <option value="image">Image</option>
            </select>
            <button className="add-category-btn">Add Category</button>
          </div>
        </div>

        {/* Recent Document Uploads */}
        <div className="table-card">
          <div className="table-header">
            <h3 className="section-title">Recent Document Uploads</h3>
            <div className="table-actions">
              <div className="search-box">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="search-input"
                />
              </div>
              <button className="filter-btn">
                <span>Filter</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            </div>
          </div>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" />
                  </th>
                  <th>Document Name</th>
                  <th>Document Type</th>
                  <th>Upload By</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentUploads.map((doc) => (
                  <tr key={doc.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td className="doc-name">{doc.name}</td>
                    <td>
                      <span
                        className="type-badge"
                        style={{ backgroundColor: doc.typeColor }}
                      >
                        {doc.type}
                      </span>
                    </td>
                    <td>{doc.uploadBy}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ color: doc.statusColor }}
                      >
                        <span
                          className="status-dot"
                          style={{ backgroundColor: doc.statusColor }}
                        ></span>
                        {doc.status}
                      </span>
                    </td>
                    <td className="date-cell">{doc.date}</td>
                    <td>
                      <button className="action-btn">⋯</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .dashboard-wrapper {
      
      
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .dashboard-header {
          margin-bottom: 30px;
        }

        .dashboard-title {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }

        .dashboard-subtitle {
          font-size: 14px;
          color: #6b7280;
        }

        /* Main Content Row - Single Row Layout */
        .main-content-row {
          display: flex;
          gap: 20px;
          margin-bottom: 30px;
          align-items: stretch;
        }

        /* Stats Widgets in Single Row */
        .sok-widgets-container {
          display: flex;
          flex-direction: column;
          gap: 20px;
          flex: 0 0 auto;
          width: 180px;
        }

        .sok-widgets {
          background-color: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 20px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .sok-widgets:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        }

        .sok-widgets-primary {
          background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
          border-color: #0891b2;
          color: white;
        }

        .sok-widgets-body {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .widget-title {
          font-size: 13px;
          font-weight: 500;
          color: #6b7280;
        }

        .sok-widgets-primary .widget-title {
          color: rgba(255, 255, 255, 0.95);
        }

        .widget-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .sok-widgets-primary .widget-icon {
          background-color: rgba(255, 255, 255, 0.15);
        }

        .widget-icon-light {
          background-color: #FFF3E0;
        }

        .widget-value {
          font-size: 32px;
          font-weight: 700;
          color: #111827;
          line-height: 1;
        }

        .sok-widgets-primary .widget-value {
          color: white;
        }

        .widget-footer {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .percentage-badge {
          display: flex;
          align-items: center;
          gap: 3px;
          font-size: 11px;
          font-weight: 600;
          padding: 3px 6px;
          border-radius: 10px;
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b981;
        }

        .sok-widgets-primary .percentage-badge {
          background-color: rgba(255, 255, 255, 0.2);
          color: white;
        }

        .footer-text {
          font-size: 11px;
          color: #9ca3af;
        }

        .sok-widgets-primary .footer-text {
          color: rgba(255, 255, 255, 0.8);
        }

        /* Charts in Single Row */
        .chart-card {
          background-color: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 20px;
          padding: 24px;
          flex: 1;
        }

        .chart-card-bar {
          flex: 1.2;
          min-width: 400px;
        }

        .chart-card-pie {
          flex: 0 0 400px;
        }

        .chart-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .chart-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 4px;
        }

        .chart-subtitle {
          font-size: 13px;
          color: #9ca3af;
        }

        .chart-dropdown {
          padding: 6px 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 13px;
          background-color: white;
          cursor: pointer;
        }

        .chart-actions {
          display: flex;
          gap: 10px;
        }

        .chart-download-btn {
          padding: 6px 10px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background-color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chart-legend {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          color: #6b7280;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .pie-legend {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .pie-legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: #374151;
          font-weight: 500;
        }

        /* Bottom Section */
        .bottom-section {
          display: grid;
          grid-template-columns: 400px 1fr;
          gap: 20px;
        }

        .upload-card {
          background-color: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 20px;
          padding: 24px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #111827;
          margin-bottom: 20px;
        }

        .upload-area {
          border: 2px dashed #d1d5db;
          border-radius: 12px;
          padding: 30px 20px;
          text-align: center;
          margin-bottom: 24px;
        }

        .upload-illustration {
          margin-bottom: 16px;
        }

        .upload-text {
          font-size: 15px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .upload-subtext {
          font-size: 13px;
          color: #9ca3af;
          margin-bottom: 20px;
        }

        .upload-button {
          padding: 10px 24px;
          background-color: white;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          cursor: pointer;
          transition: all 0.2s;
        }

        .upload-button:hover {
          background-color: #f9fafb;
        }

        .category-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-label {
          font-size: 13px;
          font-weight: 500;
          color: #374151;
        }

        .form-input,
        .form-select {
          padding: 10px 14px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          width: 100%;
        }

        .add-category-btn {
          padding: 12px;
          background-color: #0891b2;
          border: none;
          border-radius: 8px;
          color: white;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .add-category-btn:hover {
          background-color: #0e7490;
        }

        .table-card {
          background-color: #ffffff;
          border: 1.5px solid #e5e7eb;
          border-radius: 20px;
          padding: 24px;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .table-actions {
          display: flex;
          gap: 12px;
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          background-color: white;
        }

        .search-input {
          border: none;
          outline: none;
          font-size: 14px;
          width: 200px;
        }

        .filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border: 1.5px solid #e5e7eb;
          border-radius: 8px;
          background-color: white;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
        }

        .table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table thead {
          background-color: #f9fafb;
        }

        .data-table th {
          padding: 12px 16px;
          text-align: left;
          font-size: 13px;
          font-weight: 600;
          color: #6b7280;
          border-bottom: 1.5px solid #e5e7eb;
        }

        .data-table td {
          padding: 16px;
          font-size: 14px;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
        }

        .doc-name {
          font-weight: 500;
        }

        .type-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: white;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 500;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .date-cell {
          color: #6b7280;
          font-size: 13px;
        }

        .action-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #9ca3af;
          padding: 4px 8px;
        }

        .action-btn:hover {
          color: #374151;
        }

        @media (max-width: 1400px) {
          .main-content-row {
            flex-direction: column;
          }

          .sok-widgets-container {
            flex-direction: row;
            width: 100%;
          }

          .sok-widgets {
            flex: 1;
          }

          .chart-card-pie {
            flex: 1;
          }

          .bottom-section {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-wrapper {
            padding: 20px;
          }

          .sok-widgets-container {
            flex-wrap: wrap;
          }

          .sok-widgets {
            min-width: calc(50% - 10px);
          }

          .widget-value {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
