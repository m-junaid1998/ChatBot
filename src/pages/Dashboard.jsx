import React from "react";
import FolderIcon from "../assets/icons/dashboardfolder.svg";
import ClaimsChart from "./ClaimsChart";
import PriorApprovalsChart from "./PriorApprovalsChart";
import Select from "react-select";
import { customSelectStyles } from "../utils/SelectStyle";
import { Tab } from "react-bootstrap";
import Tablebulkupload from "./Tablebulkupload";
function Dashboard() {
  const documentTypeOptions = [
    { value: "pdf", label: "PDF" },
    { value: "xlsx", label: "XLSX" },
    { value: "png", label: "PNG" },
    { value: "jpg", label: "JPG" },
  ];
  return (
    <div>
      <h2>Good morning, Amjad</h2>
      <p>Stay on top of your tasks, monitor progress, and track status</p>
      <main className="dashboard-container">
        <div className="card">
          <div className="card-headers">
            <div className="card-box">
              <div className="card-body">
                <div className="card-box-content">
                  <span>Total Doc</span>
                  <img src={FolderIcon} alt="Total Doc" />
                </div>
                <h1>350</h1>
                <span className="card-stats">↑ 7% This month</span>
              </div>
            </div>

            <div className="card-box">
              <div className="card-body">
                <div className="card-box-content">
                  <span>Deleted Doc</span>
                  <img src={FolderIcon} alt="Deleted Doc" />
                </div>
                <h1>15</h1>
                <span className="card-stats">↑ 7% This month</span>
              </div>
            </div>

            <div className="card-box">
              <div className="card-body">
                <div className="card-box-content">
                  <span>Add This Week</span>
                  <img src={FolderIcon} alt="Add This Week" />
                </div>
                <h1>50</h1>
                <span className="card-stats">↑ 7% This month</span>
              </div>
            </div>

            <div className="card-box">
              <div className="card-body">
                <div className="card-box-content">
                  <span>Last Updated</span>
                  <img src={FolderIcon} alt="Last Updated" />
                </div>
                <h1>09/1/26</h1>
                <span className="card-stats">↑ 7% This month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card card-header">
          <div className="card-stats ">
            <div>
              <span>Data Activity</span>
              <p>Doc upload status graph</p>
            </div>
            <div className="login-email-container">
              <Select
                options={documentTypeOptions}
                isSearchable={true}
                styles={customSelectStyles}
                placeholder="Select Calendar"
              />
            </div>
          </div>
          <ClaimsChart />
        </div>
        <div className="card card-header">
          <div className="card-stats ">
            <div>
              <span>Documents by Category</span>
              <p>Doc by category</p>
            </div>
            <div className="login-email-container">
              <Select
                options={documentTypeOptions}
                isSearchable={true}
                styles={customSelectStyles}
                placeholder="Select Calendar"
              />
            </div>
          </div>
          <PriorApprovalsChart />
        </div>
      </main>
      <Tablebulkupload />
    </div>
  );
}

export default Dashboard;
