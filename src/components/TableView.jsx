import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { DayPicker } from "react-day-picker";
import { customSelectStyles } from "../utils/SelectStyle";
import Select from "react-select";
import Eye from "../assets/icons/eye.svg";
import searchIcon from "../assets/icons/header-search.png";
import calender from "../assets/icons/calender.png";
import download from "../assets/icons/download-icon.svg";
import nodata from "../assets/icons/no-data-found.svg";
import DownloadIcon from "../assets/icons/download.svg";
import Delete from "../assets/icons/table-delete-icon.svg";
import { getDocIcon } from "../utils/HelperFunction";
import "../assets/css/pagination.css";
import "react-day-picker/style.css";

const TableView = ({
  tableHead,
  tableData,
  isLoading,
  handleView,
  DownloadButton,
  handleDownload,
  options,
  onChange,
  selectedCategory,
  filterRow,
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
  
  const SkeletonRow = () => (
    <tr className="skeleton-row">
      <td>
        <div className="skeleton-box skeleton-checkbox"></div>
      </td>
      {tableHead?.map((_, index) => (
        <td key={index}>
          <div className="skeleton-box skeleton-text"></div>
        </td>
      ))}
      <td className="text-center">
        <div style={{ display: "flex", gap: "5px", justifyContent: "center" }}>
          <div className="skeleton-box skeleton-action"></div>
          <div className="skeleton-box skeleton-action"></div>
          <div className="skeleton-box skeleton-action"></div>
        </div>
      </td>
    </tr>
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (anchorRef.current && !anchorRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {filterRow && (
        <div className="filter-row">
          <div className="search-bar-row">
            <span className="search-bar-span">
              <img src={searchIcon} alt="SearchIcon" />
              <input
                type="text"
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </span>
            <div className="mobile-menu-btns">
              <button
                className="date-filter"
                onClick={() => setOpen(!open)}
                ref={anchorRef}
              >
                <img src={calender} alt="" />
              </button>
              {open && (
                <div className="datepicker-modal">
                  <DayPicker
                    mode="range"
                    selected={{ to: query?.toDate, from: query?.fromDate }}
                    onSelect={handleDateRange}
                  />
                </div>
              )}
            </div>
            <div className="inputs-container">
              <Select
                options={options}
                styles={customSelectStyles}
                placeholder="Select Document Type"
                value={selectedCategory}
                onChange={onChange}
                isSearchable
                isClearable
                isMulti
                menuPlacement="auto"
                menuPosition="fixed"
              />
            </div>
          </div>
          <button type="button" className="export-btn " onClick={exportData}>
            <img src={download} alt="download" /> Export CSV
          </button>
        </div>
      )}

      <div className="managment-table table-responsive">
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
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
            ) : tableData?.length > 0 ? (
              tableData.map((item, index) => (
                <tr key={index}>
                  <td>
                    <label className="custom-checkbox">
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </td>

                  {tableHead?.map((data) => {
                    const value = item[data?.id];
                    if (data?.label === "Status") {
                      return (
                        <td key={data?.id}>
                          <span
                            className={`table-status status-${value?.toLowerCase().replace(/\s/g, "")}`}
                          >
                            {value}
                          </span>
                        </td>
                      );
                    }
                    if (data?.label === "Document Type") {
                      const icon = getDocIcon(value);
                      return (
                        <td key={data?.id}>
                          <div className="doc-type-cell">
                            {icon && (
                              <img
                                src={icon}
                                alt="icons"
                                className="doc-icon"
                              />
                            )}
                            <span>{value}</span>
                          </div>
                        </td>
                      );
                    }
                    return <td key={data?.id}>{value ?? "----"}</td>;
                  })}

                  <td className="table-actions">
                    <button onClick={() => handleView(item)} title="View">
                      <img src={Eye} alt="Eyeicon" className="Eyeicon" />
                    </button>
                    {DownloadButton && (
                      <button
                        onClick={() => handleDownload(item)}
                        title="Download"
                      >
                        <img
                          src={DownloadIcon}
                          alt="Downloadicon"
                          className="Downloadicon"
                        />
                      </button>
                    )}
                    {deleteButton && (
                      <button onClick={() => handleDelete(item)} title="Delete">
                        <img
                          src={Delete}
                          alt="Deleteicon"
                          className="Deleteicon"
                        />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={tableHead?.length + 2} className="nodata-found">
                  <img src={nodata} alt="No Data" />
                  <h5>No Data Found</h5>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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

