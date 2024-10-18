import SystemSidesheet from "./TagSidesheet";
import { TagItem, TagData } from "./TagData";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useEffect, useRef, useState } from "react";
import { Card } from "react-bootstrap";
import { Typography } from "@equinor/eds-core-react";

export const TagTable: React.FC<TagData> = (props) => {
  const tags = props.tags.items;
  const [total, setTagCount] = useState(tags.length);

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TagItem | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (item: TagItem) => {
    setSelectedItem(item);
    setShow(true);
  };

  const gridRef = useRef<AgGridReact>(null);

  const generateColDefs = (): ColDef<TagItem>[] => {
    return [
      { field: "TagNo", headerName: "TagNo", filter: true },
      { field: "Description", headerName: "Description", filter: true },
      { field: "Register", headerName: "Register", filter: true },
      { field: "Discipline", headerName: "Discipline", filter: true },
      { field: "Location", headerName: "Location", filter: true },
      {
        field: "Status",
        headerName: "Status",
        filter: true,
      },

      // Add more fields dynamically if needed
    ];
  };

  const [colDefs, setColDefs] = useState<ColDef<TagItem>[]>(generateColDefs());

  useEffect(() => {
    // Update colDefs dynamically if needed
    setColDefs(generateColDefs());
  }, [props.tags]); // Dependency array to update colDefs when props change

  const onFilterChanged = () => {
    if (gridRef.current) {
      setTagCount(gridRef.current.api.getDisplayedRowCount());
    }
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <Typography variant="h5">Total: {total}</Typography>
        </Card.Header>
      </Card>
      <div
        className="ag-theme-quartz" // applying the Data Grid theme
        style={{ height: "85vh" }} // the Data Grid will fill the size of the parent container
      >
        <AgGridReact
          ref={gridRef}
          rowData={tags}
          columnDefs={colDefs}
          onRowClicked={(event) => {
            const item = event.data as TagItem | undefined;
            if (item) {
              handleShow(item);
            }
          }} // Handle row click
          onFilterChanged={onFilterChanged} // Update count on filter change
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
