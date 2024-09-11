import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import React, { useState, useEffect } from "react";
import { CommpkgItem, CommpkgData } from "./CommpkgData";
import { ColDef } from "ag-grid-community";
import CommpkgSideSheet from "./CommpkgSideheet";

export const CommpkgTable: React.FC<CommpkgData> = (props) => {
  const commpkgs = props.commissioningPackages.items;

  const generateColDefs = (): ColDef<CommpkgItem>[] => {
    return [
      { field: "CommissioningPackageNo", headerName: "Comm Pkg" },
      { field: "Priority1", headerName: "Comm Priority 1" },
      { field: "Priority2", headerName: "Comm Priority 2" },
      { field: "Priority3", headerName: "Comm Priority 3" },
      { field: "CommissioningPhase", headerName: "Comm Phase" },
      { field: "Facility", headerName: "Facility" },
      // Add more fields dynamically if needed
    ];
  };

  const [colDefs, setColDefs] = useState<ColDef<CommpkgItem>[]>(
    generateColDefs()
  );

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CommpkgItem | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (item: CommpkgItem) => {
    setSelectedItem(item);
    setShow(true);
  };

  useEffect(() => {
    // Update colDefs dynamically if needed
    setColDefs(generateColDefs());
  }, [props.commissioningPackages]); // Dependency array to update colDefs when props change

  return (
    <div>
      <div
        className="ag-theme-quartz-dark" // applying the Data Grid theme
        style={{ height: "90vh" }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          rowData={commpkgs}
          columnDefs={colDefs}
          onRowClicked={(event) => {
            const item = event.data as CommpkgItem | undefined;
            if (item) {
              handleShow(item);
            }
          }} // Handle row click
        />
      </div>
      <CommpkgSideSheet
        show={show}
        handleClose={handleClose}
        selectedItem={selectedItem}
      />
    </div>
  );
};
