import SystemSidesheet from "./SystemSidesheet";
import { SystemItem, SystemData } from "./SystemData";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useEffect, useRef, useState } from "react";

export const SystemTable: React.FC<SystemData> = (props) => {
  const system = props.systems.items;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SystemItem | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (item: SystemItem) => {
    setSelectedItem(item);
    setShow(true);
  };

  const gridRef = useRef<AgGridReact>(null);

  const generateColDefs = (): ColDef<SystemItem>[] => {
    return [
      { field: "SystemNo", headerName: "System", filter: true },
      { field: "SystemDescription", headerName: "Description", filter: true },
      { field: "CommissioningLead", headerName: "Comm Lead", filter: true },
      { field: "SystemOwner", headerName: "System Owner", filter: true },
      { field: "OperationResponsible", headerName: "OP Resp", filter: true },
      {
        field: "TechnicalIntegrityResponsible",
        headerName: "TI Resp",
        filter: true,
      },

      // Add more fields dynamically if needed
    ];
  };

  const [colDefs, setColDefs] = useState<ColDef<SystemItem>[]>(
    generateColDefs()
  );

  useEffect(() => {
    // Update colDefs dynamically if needed
    setColDefs(generateColDefs());
  }, [props.systems]); // Dependency array to update colDefs when props change

  return (
    <div>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: "90vh" }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          rowData={system}
          columnDefs={colDefs}
          onRowClicked={(event) => {
            const item = event.data as SystemItem | undefined;
            if (item) {
              handleShow(item);
            }
          }} // Handle row click
        />
      </div>
      <SystemSidesheet
        show={show}
        handleClose={handleClose}
        selectedItem={selectedItem}
      />
    </div>
  );
};
