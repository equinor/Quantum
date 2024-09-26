import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import React, { useState, useEffect, useRef } from "react";
import { CommpkgItem, CommpkgData } from "./CommpkgData";
import { ColDef } from "ag-grid-community";
import CommpkgSideSheet from "./CommpkgSideheet";
import { Card } from "react-bootstrap";

export const CommpkgTable: React.FC<CommpkgData> = (props) => {
  const commpkgs = props.commpkgs.items;
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
      { field: "CommpkgNo", headerName: "Comm Pkg", filter: true },
      { field: "CommpkgId", headerName: "CommpkgId", filter: true },
      { field: "Description", headerName: "Description", filter: true },
      {
        field: "ProjectMilestone",
        headerName: "ProjectMilestone",
        filter: true,
      },
      { field: "SafetyMilestone", headerName: "SafetyMilestone", filter: true },
      { field: "SubSystemNo", headerName: "SubSystemNo", filter: true },
      { field: "Phase", headerName: "Phase", filter: true },
      { field: "Responsible", headerName: "Responsible", filter: true },
      { field: "Identifier", headerName: "Identifier", filter: true },
      { field: "Comment", headerName: "Comment", filter: true },
      { field: "PlannedStart", headerName: "PlannedStart", filter: true },
      { field: "PlannedEnd", headerName: "PlannedEnd", filter: true },
      { field: "ActualStart", headerName: "ActualStart", filter: true },
      { field: "ActualEnd", headerName: "ActualEnd", filter: true },
      { field: "ActualStart", headerName: "ActualStart", filter: true },
      { field: "Progress", headerName: "Progress", filter: true },
      { field: "Estimate", headerName: "Estimate", filter: true },
      { field: "HandoverStatus", headerName: "HandoverStatus", filter: true },
      { field: "CommStatus", headerName: "CommStatus", filter: true },
      { field: "MCStatus", headerName: "MCStatus", filter: true },
    ];
  };

  const [colDefs, setColDefs] = useState<ColDef<CommpkgItem>[]>(
    generateColDefs()
  );

  useEffect(() => {
    // Update colDefs dynamically if needed
    setColDefs(generateColDefs());
  }, [props.commpkgs]); // Dependency array to update colDefs when props change

  const onFilterChanged = () => {
    if (gridRef.current) {
      setCommpkgCount(gridRef.current.api.getDisplayedRowCount());
    }
  };

  return (
    <div>
      <Card
        data-bs-theme="dark"
        className="custom-card"
        style={{
          height: "50px",
          width: "120px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card.Body>
          <Card.Title
            style={{
              fontSize: "14px",
            }}
          >
            Total:
          </Card.Title>
          <Card.Text>{commpkgCount}</Card.Text>
        </Card.Body>
      </Card>

      <div
        className="ag-theme-quartz-dark" // applying the Data Grid theme
        style={{ height: "80vh" }} // the Data Grid will fill the size of the parent container
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
