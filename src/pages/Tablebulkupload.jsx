import React from "react";
import BulkUpload from "../components/BulkUpload";
import DocumentTable from "../pages/DocumentTable/DocumentTable";

function Tablebulkupload() {
  return (
    <section className="row mt-5">
      <div className="col-md-4">
        <BulkUpload />
      </div>
      <div className="col-md-8">
        <DocumentTable />
      </div>
    </section>
  );
}

export default Tablebulkupload;
