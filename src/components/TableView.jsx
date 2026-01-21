import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { DayPicker } from "react-day-picker";
import { customSelectStyles } from "../utils/SelectStyle";
import Select from "react-select";
import Edit from "../assets/icons/edit-pencil.svg";
import Eye from "../assets/icons/eye.svg";
import searchIcon from "../assets/icons/header-search.png";
import calender from "../assets/icons/calender.png";
import deleteIcon from "../assets/icons/delete.png";
import download from "../assets/icons/download.png";
import nodata from "../assets/icons/nodata.png";
import DownloadIcon from "../assets/icons/download.svg";
import Delete from "../assets/icons/table-delete-icon.svg";
import "../assets/css/pagination.css";
import "../assets/css/custom1.css";

import "react-day-picker/style.css";

const TableView = ({
  tableHead,
  tableData,
  handleView,
  handleEdit,
  DownloadButton,
  handleDownload,
  options,
  filterRow,
  isLoading,
  handleDelete,
  deleteButton,
  handleSearch,
  handleDateRange,
  exportData,
  query,
  pagination,
  onPageChange,
}) => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof handleSearch === "function") {
        handleSearch(search);
        onPageChange?.(1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, handleSearch, onPageChange]);

  return (
    <>
      {filterRow && (
        <div className="filter-row">
          <div className="search-bar-row">
            <span className="search-bar-span">
              <img src={searchIcon} alt="" />
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>

            <div className="mobile-menu">
              <div className="menu-dropdown">
                <button className="date-filter">
                  <img src={calender} alt="" />
                </button>
                <button className="date-filter">
                  <img src={deleteIcon} alt="" />
                </button>
                <button
                  type="button"
                  className="export-btn"
                  onClick={exportData}
                >
                  <img src={download} alt="" />
                  Export CSV
                </button>
              </div>
            </div>

            <div
              style={{ position: "relative", display: "inline-block" }}
              ref={anchorRef}
            >
              <button
                type="button"
                className="date-filter desktop-only"
                onClick={() => setOpen(!open)}
              >
                <img src={calender} alt="" />
              </button>
              {open && (
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: 8,
                    zIndex: 1000,
                    background: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    padding: "0px 20px",
                  }}
                >
                  <DayPicker
                    captionLayout="dropdown"
                    mode="range"
                    disabled={{ after: new Date() }}
                    animate
                    timeZone="UTC"
                    selected={{ to: query?.toDate, from: query?.fromDate }}
                    onSelect={(e) => {
                      handleDateRange(e);
                      onPageChange(1);
                    }}
                    footer={
                      <button
                        type="button"
                        onClick={() => {
                          handleDateRange(null);
                          onPageChange(1);
                        }}
                        style={{ background: "transparent", border: "none" }}
                      >
                        clear
                      </button>
                    }
                  />
                </div>
              )}
            </div>
            <div className="login-email-container col-md-4">
              <Select
                options={options}
                isSearchable={true}
                styles={customSelectStyles}
                placeholder="Select Status"
              />
            </div>
          </div>

          <button
            type="button"
            className="export-btn desktop-only"
            onClick={exportData}
          >
            <img src={download} alt="" />
            Export CSV
          </button>
        </div>
      )}

      <div className="managment-table table-responsive">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <table>
            <thead>
              <tr>
                <th>
                  <label className="custom-checkbox">
                    <input type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </th>
                {tableHead?.map((label) => (
                  <th key={label?.id}>{label?.label}</th>
                ))}
                <th className="actions-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tableData?.length > 0 ? (
                tableData.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <label className="custom-checkbox">
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </td>
                    {tableHead?.map((data) =>
                      data?.label === "Status" ? (
                        <td key={data?.id}>
                          <p
                            className="table-status"
                            style={{
                              backgroundColor: `var(--status-${
                                item[data?.id]
                              })`,
                            }}
                          >
                            {item[data?.id]}
                          </p>
                        </td>
                      ) : data?.type === "date" ? (
                        <td key={data?.id}>
                          {item[data.id]
                            ? moment(item[data.id]).format("DD/MMM/YYYY")
                            : "----"}
                        </td>
                      ) : (
                        <td key={data?.id}>{item[data?.id] ?? "----"}</td>
                      ),
                    )}
                    <td className="table-actions">
                      {typeof handleView === "function" && (
                        <button onClick={() => handleView(item)}>
                          <img src={Eye} alt="" />
                        </button>
                      )}
                      {DownloadButton && (
                        <button onClick={() => handleDownload(item)}>
                          <img src={DownloadIcon} alt="" />
                        </button>
                      )}
                      {typeof handleEdit === "function" && (
                        <button onClick={() => handleEdit(item)}>
                          <img src={Edit} alt="" />
                        </button>
                      )}
                      {deleteButton && (
                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                        >
                          <img src={Delete} alt="" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={tableHead?.length + 2} className="text-center">
                    <img src={nodata} alt="No Data" width={40} height={40} />
                    <h5>No Data Found</h5>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="pagination-row">
          <div className="center premium-pagination">
            <button
              disabled={pagination.currentPage === 1}
              onClick={() => onPageChange(pagination.currentPage - 1)}
              className="prev"
            >
              Previous
            </button>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  className={page === pagination.currentPage ? "active" : ""}
                  onClick={() => onPageChange(page)}
                >
                  {page}
                </button>
              ),
            )}
            <button
              disabled={pagination.currentPage === pagination.totalPages}
              onClick={() => onPageChange(pagination.currentPage + 1)}
              className="next"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TableView;
