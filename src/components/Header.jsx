import React, { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Search from "../assets/icons/search.svg";
import Notification from "../assets/icons/notification.svg";
import User from "../assets/icons/user.svg";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "activity", label: "Activity" },
    { key: "manage", label: "Manage" },
    { key: "program", label: "Program" },
    { key: "account", label: "Account" },
    { key: "reports", label: "Reports" },
  ];

  return (
    <header className="header row">
      <div className="col-md-2 col-4">
        <div className="header-logo">
          <span className="logo-circle"></span>
          <span className="logo-text">Knowledge Base</span>
        </div>
      </div>

      <div className={`${isSearchOpen ? "col-md-5 col-7" : "col-md-5"}`}>
        <Tabs defaultActiveKey="overview" className="header-tabs">
          {tabs.map((tab) => (
            <Tab key={tab.key} eventKey={tab.key} title={tab.label} />
          ))}
        </Tabs>
      </div>
      <div className={isSearchOpen ? "col-md-3 col-6" : "col-md-1"}>
        <div className="header-actions">
          <div className={`search-box ${isSearchOpen ? "open" : ""}`}>
            <img
              src={Search}
              alt="Search"
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
          </div>
          <div className="header-notification">
            <img src={Notification} alt="Notification" />
            <span>8</span>
          </div>
          <img src={User} alt="User" />
        </div>
      </div>

      <div
        className={`header-user ${isSearchOpen ? "col-md-2 col-6" : "col-md-2"}`}
      >
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
