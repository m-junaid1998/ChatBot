// import React, { useState } from "react";
// import Light from "../assets/icons/light.svg";
// import Dark from "../assets/icons/dark.svg";
// function Assider() {
//   const [isDark, setIsDark] = useState(true);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//   };
//   return (
//     <aside className="dashboard-aside">
//       <button
//         className={`theme-toggle-button ${isDark ? "dark" : "light"}`}
//         onClick={toggleTheme}
//         aria-label="Toggle theme"
//       >
//         <div className={`icon-wrapper moon ${!isDark ? "active" : ""}`}>
//           <img src={Dark} alt="Dark" />
//         </div>

//         <div className={`icon-wrapper sun ${isDark ? "active" : ""}`}>
//           <img src={Light} alt="Light" />
//         </div>
//       </button>
//     </aside>
//   );
// }

// export default Assider;

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toggleTheme } from "../api/toggleThemeSlice";
import Light from "../assets/icons/light.svg";
import Dark from "../assets/icons/dark.svg";
import GridIcon from "../assets/icons/grid.svg";
import FolderIcon from "../assets/icons/folder.svg";
import TrashIcon from "../assets/icons/trash.svg";
import ShareIcon from "../assets/icons/share.svg";

function Assider() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState("grid");

  const tabs = [
    { key: "grid", icon: GridIcon, label: "Grid View" },
    { key: "folder", icon: FolderIcon, label: "Folders" },
  ];

  const actions = [
    { key: "trash", icon: TrashIcon, label: "Delete" },
    { key: "share", icon: ShareIcon, label: "Share" },
  ];
  return (
    <div className="d-flex flex-column justify-content-between ">
      <div className="d-flex flex-column gap-3">
        <aside className="dashboard-aside">
          <button
            className={`theme-toggle-button ${isDark ? "dark" : "light"}`}
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            <div className={`icon-wrapper ${!isDark ? "active" : ""}`}>
              <img src={Light} alt="Light mode" />
            </div>

            <div className={`icon-wrapper ${isDark ? "active" : ""}`}>
              <img src={Dark} alt="Dark mode" />
            </div>
          </button>
        </aside>

        <aside className="dashboard-aside">
          <nav className="chat-button d-flex flex-column gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                className={`nav-tabs-button ${
                  activeTab === tab.key ? "active" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                <img src={tab.icon} alt={tab.label} />
              </button>
            ))}
          </nav>
        </aside>
      </div>

      <aside className="dashboard-aside-logout">
        <nav className="chat-button d-flex flex-column gap-2">
          {actions.map((tab) => (
            <button
              key={tab.key}
              className={`nav-tabs-button ${
                activeTab === tab.key ? "active" : ""
              }`}
              onClick={() => setActiveTab(tab.key)}
              title={tab.label}
            >
              <img src={tab.icon} alt={tab.label} />
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
}

export default Assider;
