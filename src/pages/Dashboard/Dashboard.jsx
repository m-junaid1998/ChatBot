import React from "react";
import Widgets from "./components/Widgets";
import Tablebulkupload from "./Tablebulkupload";

function Dashboard() {
  return (
    <main className="dashboard-container">
      <div className="dashboard-headings">
        <h4>Good morning, Harry</h4>
        <p>Stay on top of your tasks, monitor progress, and track status</p>
      </div>
      <Widgets />
      <Tablebulkupload />
    </main>
  );
}

export default Dashboard;
