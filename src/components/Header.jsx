

import React, { useState } from "react";
import Search from "../assets/icons/search.svg";
import Notification from "../assets/icons/notification.svg";
import User from "../assets/icons/user.svg";
import X from "../assets/icons/cross.svg";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "activity", label: "Activity" },
    { key: "manage", label: "Manage" },
    { key: "program", label: "Program" },
    { key: "account", label: "Account" },
    { key: "reports", label: "Reports" },
  ];

  return (
    <header className="header">
      {/* LOGO */}
      <div className="header-logo">
        <span className="logo-circle"></span>
        <h5 >Knowledge Base</h5>
      </div>

      {/* TABS */}
      <div className="header-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="header-actions">
        <div className={`search-box ${isSearchOpen ? "open" : ""}`}>
          <img
            src={Search}
            alt="Search"
            className="search-icon"
            onClick={() => setIsSearchOpen(true)}
          />
          {isSearchOpen && (
            <input
              type="text"
              placeholder="Search..."
              autoFocus
              onBlur={() => setIsSearchOpen(false)}
            />
          )}
          <img src={X} alt="X" className="cross-icon" />
        </div>

        <div className="header-notification">
          <img src={Notification} alt="Notification" className="notification-icon" />
          <span>8</span>
        </div>

        <img src={User} alt="User" className="user-icon" />
      </div>

      {/* USER */}
      <div className="header-user">
        <div className="user-avatar">AA</div>
        <div className="user-name">
          <p>Amjad Ali</p>
          <span>amjadali82@gmail.com</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
