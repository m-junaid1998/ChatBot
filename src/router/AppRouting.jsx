// import { useState } from "react";
// import Assider from "../components/Assider";
// import Header from "../components/Header";
// import Dashboard from "../pages/Dashboard/Dashboard";

// function AppRouting() {
//   const [collapsed, setCollapsed] = useState(true);

//   return (
//     <div className="main-content">
//       <Header />

//       <div className="row g-0">
//         <div
//           className={`${
//             collapsed ? "col-md-1 col-2" : "col-md-2 col-3"
//           } paddingright`}
//         >
//           <Assider collapsed={collapsed} setCollapsed={setCollapsed} />
//         </div>

//         <div
//           className={`${
//             collapsed ? "col-md-11 col-10" : "col-md-10 col-9"
//           } paddingleft`}
//         >
//           <Dashboard />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppRouting;

import { useState } from "react";
import Assider from "../components/Assider";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard/Dashboard";
import DocumentTable from "../pages/Documents/DocumentTable";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "../components/PageNotFound";
import ChatArea from "../pages/Chat/ChatArea";

function AppRouting() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="app-wrapper">
      <Header />
      <div className="content-area container-fluid g-0">
        <div className="row g-0 h-100 flex-nowrap">
          <div className={collapsed ? "sidebar-collapsed" : "sidebar-expanded"}>
            <Assider collapsed={collapsed} setCollapsed={setCollapsed} />
          </div>
          <div className="dashboard-col">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/documettable" element={<DocumentTable />} />
              <Route path="/chat" element={<ChatArea />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppRouting;
