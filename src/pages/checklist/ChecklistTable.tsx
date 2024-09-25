import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import React, { useState, useEffect, useRef } from "react";
import { ChecklistItem, ChecklistData } from "./ChecklistData";
import { ColDef } from "ag-grid-community";
import CommpkgSideSheet from "./ChecklistSidesheet";
import { Card, Stack } from "react-bootstrap";
import dayjs from "dayjs";

export const CommpkgTable: React.FC<ChecklistData> = (props) => {
  const checklists = props.checklists.items;
  const [count, setCount] = useState(checklists.length);
  const [unsignedCount, setUnsignedCount] = useState(
    checklists.filter((item) => !item.SignedDate).length
  );
  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ChecklistItem | null>(null);
  const handleClose = () => setShow(false);
  const handleShow = (item: ChecklistItem) => {
    setSelectedItem(item);
    setShow(true);
  };
  const gridRef = useRef<AgGridReact>(null);

  const generateColDefs = (): ColDef<ChecklistItem>[] => {
    return [
      { field: "FormType", headerName: "FormType", filter: true },
      { field: "FormGroup", headerName: "FormGroup", filter: true },
      { field: "Status", headerName: "Status", filter: true },
      { field: "FormDiscipline", headerName: "FormDiscipline", filter: true },
      { field: "FormResponsible", headerName: "FormResponsible", filter: true },
      { field: "TagNo", headerName: "TagNo", filter: true },
      {
        field: "HandoverPlan",
        headerName: "HandoverPlan",
        filter: "agDateColumnFilter",
        valueFormatter: (params) => dayjs(params.value).format("DD-MM-YYYY"),
      },
      {
        field: "SignedDate",
        headerName: "Signed",
        filter: "agDateColumnFilter",
        valueFormatter: (params) => dayjs(params.value).format("DD-MM-YYYY"),
      },
      { field: "Facility", headerName: "Facility", filter: true },
      // Add more fields dynamically if needed
    ];
  };

  const [colDefs, setColDefs] = useState<ColDef<ChecklistItem>[]>(
    generateColDefs()
  );

  useEffect(() => {
    // Update colDefs dynamically if needed
    setColDefs(generateColDefs());
    setCount(checklists.length);
    setUnsignedCount(checklists.filter((item) => !item.SignedDate).length);
  }, [props.checklists]); // Dependency array to update colDefs when props change

  const onFilterChanged = () => {
    if (gridRef.current) {
      const displayedRows: ChecklistItem[] = [];
      gridRef.current.api.forEachNodeAfterFilterAndSort((node) => {
        displayedRows.push(node.data);
      });

      setCount(displayedRows.length);
      const unsignedRows = displayedRows.filter((item) => !item.SignedDate);
      setUnsignedCount(unsignedRows.length);
    }
  };

  return (
    <div>
      <Stack direction="horizontal">
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
              Total
            </Card.Title>
            <Card.Text>{count.toLocaleString()}</Card.Text>
          </Card.Body>
        </Card>

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
              OS
            </Card.Title>
            <Card.Text>{unsignedCount.toLocaleString()}</Card.Text>
          </Card.Body>
        </Card>
      </Stack>

      <div
        className="ag-theme-quartz-dark" // applying the Data Grid theme
        style={{ height: "80vh" }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          rowData={checklists}
          columnDefs={colDefs}
          onRowClicked={(event) => {
            const item = event.data as ChecklistItem | undefined;
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
