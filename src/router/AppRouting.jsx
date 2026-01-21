// import Assider from "../components/Assider";
// import Header from "../components/Header";
// import Dashboard from "../pages/Dashboard";

// function AppRouting() {
//   return (
//     <div className="main-content">
//       <Header />
//       <div className="row ">
//         <div className="col-md-2 paddingright ">
//           <Assider />
//         </div>
//         <div className="col-md-10 paddingleft ">
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
import Dashboard from "../pages/Dashboard";

function AppRouting() {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className="main-content">
      <Header />

      <div className="row g-0">
        <div
          className={`${
            collapsed ? "col-md-1 col-2" : "col-md-2 col-3"
          } paddingright`}
        >
          <Assider collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>

        <div
          className={`${
            collapsed ? "col-md-11 col-10" : "col-md-10 col-9"
          } paddingleft`}
        >
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default AppRouting;
