// import React from "react";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";

// function Header() {
//   return (
//     <header className="Header">
//       <div className="header-divider">
//         <div className="header-container header-left">
//           <div className="header-body">
//             <div className="header-logo"></div>
//             <span>hello</span>
//           </div>
//         </div>
//       </div>

//       <div className="header-container header-center">
//         <div className="header-body ">
//           {/* <Tabs
//             defaultActiveKey="overview"
//             className="custom-tabs"
//             mountOnEnter
//           >
//             <Tab eventKey="overview" title="Overview" />
//             <Tab eventKey="activity" title="Activity" />
//             <Tab eventKey="manage" title="Manage" />
//             <Tab eventKey="program" title="Program" />
//             <Tab eventKey="account" title="Account" />
//             <Tab eventKey="reports" title="Reports" />
//           </Tabs> */}
//         </div>
//       </div>
//       <div className="header-container">
//         <div className="header-body">
//           <span>hello</span>
//         </div>
//       </div>
//       <div className="header-container">
//         <div className="header-body">
//           <span>hello</span>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Header;

import React, { useState } from "react";

function Header() {
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
    <header className="Header">
      <div className="header-container header-left">
        <div className="header-body">
          <div className="header-logo"></div>
          <span className="header-title">Knowledge Base</span>
        </div>
      </div>

      <div className="header-container header-center">
        <div className="header-body">
          <nav className="custom-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`tab-button ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="header-wrap">
        <div className=" header-icon">
          <div className="header-body">
            <button className="icon-button">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
          </div>
        </div>

        <div className=" header-icon">
          <div className="header-body">
            <button className="icon-button notification-button">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span className="notification-badge">1</span>
            </button>
          </div>
        </div>

        <div className=" header-icon">
          <div className="header-body">
            <button className="icon-button">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="header-container header-user">
        <div className="header-body">
          <div className="user-avatar">AA</div>
          <div className="user-info">
            <div className="user-name">Amjad Ali</div>
            <div className="user-email">amjadali32@gmail.com</div>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </header>
  );
}

export default Header;
