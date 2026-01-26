import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleTheme } from "../api/toggleThemeSlice";
import Dashoard from "../assets/icons/dashboard.svg";
import Light from "../assets/icons/light.svg";
import Dark from "../assets/icons/dark.svg";
import GridIcon from "../assets/icons/grid.svg";
import FolderIcon from "../assets/icons/folder.svg";

import ArrowLeft from "../assets/icons/leftarrow.svg";
import ArrowRight from "../assets/icons/rightarrow.svg";
import { useNavigate } from "react-router-dom";

function Assider({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState("grid");

  const tabs = [
    { key: "dashboard", icon: Dashoard, label: "Dashboard", path: "/" },
    { key: "document", icon: GridIcon, label: "Document View", path: "/documettable" },
    { key: "chat", icon: FolderIcon, label: "Chats", path: "/chat" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.key);
    navigate(tab.path);
  };

  return (
    <aside className="assider">
      <div className="assider-togglebtn">
        <button
          className={`theme-toggle-button ${isDark ? "dark" : "light"}`}
          onClick={() => dispatch(toggleTheme())}
        >
          <div className={`icon-wrapper ${!isDark ? "active" : ""}`}>
            <img src={Light} alt="Light mode" />
          </div>
          <div className={`icon-wrapper ${isDark ? "active" : ""}`}>
            <img src={Dark} alt="Dark mode" />
          </div>
        </button>
      </div>

      <div className={`assider-tabs ${collapsed ? "collapsed" : ""}`}>
        <nav className="assider-button-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`nav-tabs-button ${
                activeTab === tab.key ? "active" : ""
              }`}
              onClick={() => handleTabClick(tab)}
            >
              <img src={tab.icon} alt={tab.label} className="tab-icon-img" />
              {!collapsed && <span className="tab-label">{tab.label}</span>}
            </button>
          ))}
        </nav>
        <div
          className="assider-collapse-btn"
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <img
            src={collapsed ? ArrowRight : ArrowLeft}
            alt="toggle"
            className="toggle-arrow"
          />
        </div>
      </div>
    </aside>
  );
}

export default Assider;
