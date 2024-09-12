import SubSystemSidesheet from "./SubSystemSidesheet";
import { SubSystemItem, SubSystemData } from "./SubSystemData";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";

export const SubSystemTable: React.FC<SubSystemData> = (props) => {
  const subSystems = props.subSystems.items;
  const [systemCount, setSystemCount] = useState(subSystems.length);

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SubSystemItem | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (item: SubSystemItem) => {
    setSelectedItem(item);
    setShow(true);
  };

  const gridRef = useRef<AgGridReact>(null);

  const generateColDefs = (): ColDef<SubSystemItem>[] => {
    return [
      { field: "SubSystemNo", headerName: "Sub System", filter: true },
      { field: "Description", headerName: "Description", filter: true },
      { field: "SystemNo", headerName: "System", filter: true },

      // Add more fields dynamically if needed
    ];
  };

  const [colDefs, setColDefs] = useState<ColDef<SubSystemItem>[]>(
    generateColDefs()
  );

  useEffect(() => {
    // Update colDefs dynamically if needed
    setColDefs(generateColDefs());
  }, [props.subSystems]); // Dependency array to update colDefs when props change

  const onFilterChanged = () => {
    if (gridRef.current) {
      setSystemCount(gridRef.current.api.getDisplayedRowCount());
    }
  };

  return (
    <div>
      <Card data-bs-theme="dark" className="custom-card">
        <Card.Body>
          <Card.Title>Total</Card.Title>
          <Card.Text>{systemCount}</Card.Text>
        </Card.Body>
      </Card>
      <div
        className="ag-theme-quartz-dark" // applying the Data Grid theme
        style={{ height: "84vh" }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          rowData={subSystems}
          columnDefs={colDefs}
          onRowClicked={(event) => {
            const item = event.data as SubSystemItem | undefined;
            if (item) {
              handleShow(item);
            }
          }} // Handle row click
          onFilterChanged={onFilterChanged} // Update count on filter change
        />
      </div>
      <SubSystemSidesheet
        show={show}
        handleClose={handleClose}
        selectedItem={selectedItem}
      />
    </div>
  );
};
