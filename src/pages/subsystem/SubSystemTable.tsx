import SubSystemSidesheet from "./SubSystemSidesheet";
import { SubSystemItem, SubSystemData } from "./SubSystemData";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useEffect, useRef, useState } from "react";

export const SubSystemTable: React.FC<SubSystemData> = (props) => {
  const subSystems = props.subSystems.items;
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
    ];
  };

  const [colDefs, setColDefs] = useState<ColDef<SubSystemItem>[]>(
    generateColDefs()
  );

  useEffect(() => {
    // Update colDefs dynamically if needed
    setColDefs(generateColDefs());
  }, [props.subSystems]); // Dependency array to update colDefs when props change

  return (
    <div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: "90vh" }} // the Data Grid will fill the size of the parent container
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
