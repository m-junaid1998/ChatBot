import { Route, Routes } from "react-router-dom";
import Assider from "../components/Assider";
import Header from "../components/Header";
import Dashboard from "../pages/Dashboard";

function AppRouting() {
  return (
    <div className="dashboard-header ">
      <Header />
      <div className="row mt-3">
        <div className=" col-md-1 ">
          <Assider />
        </div>
        <div className="col-md-11">
          <Dashboard />
          {/* <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes> */}
        </div>
      </div>
    </div>
  );
}

export default AppRouting;
