import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import React, { useState, useEffect, useRef } from "react";
import { CommpkgItem, CommpkgData } from "./CommpkgData";
import { ColDef } from "ag-grid-community";
import CommpkgSideSheet from "./CommpkgSideheet";
import { Card } from "react-bootstrap";

export const CommpkgTable: React.FC<CommpkgData> = (props) => {
  const commpkgs = props.commissioningPackages.items;
  const [commpkgCount, setCommpkgCount] = useState(commpkgs.length);
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CommpkgItem | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = (item: CommpkgItem) => {
    setSelectedItem(item);
    setShow(true);
  };
  const gridRef = useRef<AgGridReact>(null);

  const generateColDefs = (): ColDef<CommpkgItem>[] => {
    return [
      { field: "CommissioningPackageNo", headerName: "Comm Pkg", filter: true },
      { field: "Description", headerName: "Description", filter: true },
      { field: "Status", headerName: "Status", filter: true },
      { field: "Priority1", headerName: "Comm Priority 1", filter: true },
      { field: "Priority2", headerName: "Comm Priority 2", filter: true },
      { field: "Priority3", headerName: "Comm Priority 3", filter: true },
      { field: "CommissioningPhase", headerName: "Comm Phase", filter: true },
      { field: "Facility", headerName: "Facility", filter: true },
      // Add more fields dynamically if needed
    ];
  };

  const [colDefs, setColDefs] = useState<ColDef<CommpkgItem>[]>(
    generateColDefs()
  );

  useEffect(() => {
    // Update colDefs dynamically if needed
    setColDefs(generateColDefs());
  }, [props.commissioningPackages]); // Dependency array to update colDefs when props change

  const onFilterChanged = () => {
    if (gridRef.current) {
      setCommpkgCount(gridRef.current.api.getDisplayedRowCount());
    }
  };

  return (
    <div>
      <Card data-bs-theme="dark" className="custom-card">
        <Card.Body>
          <Card.Title>Count</Card.Title>
          <Card.Text>{commpkgCount}</Card.Text>
        </Card.Body>
      </Card>
      <div
        className="ag-theme-quartz-dark" // applying the Data Grid theme
        style={{ height: "82vh" }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          rowData={commpkgs}
          columnDefs={colDefs}
          onRowClicked={(event) => {
            const item = event.data as CommpkgItem | undefined;
            if (item) {
              handleShow(item);
            }
          }} // Handle row click
          onFilterChanged={onFilterChanged} // Update count on filter change
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
