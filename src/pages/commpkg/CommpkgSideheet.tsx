import React from "react";
import { Offcanvas } from "react-bootstrap";
import { CommpkgItem } from "./CommpkgData";

interface CommpkgSideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: CommpkgItem | null;
}

const CommpkgSideSheet: React.FC<CommpkgSideSheetProps> = ({
  show,
  handleClose,
  selectedItem,
}) => {
  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "800px" }}
    >
      <Offcanvas.Header
        closeButton
        className="custom-close-button"
        style={{ backgroundColor: "#323539", color: "#ffffff" }}
      >
        <Offcanvas.Title>Commissioning Package Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#323539", color: "#ffffff" }}>
        {selectedItem && (
          <div>
            <p>
              <strong>Comm Pkg:</strong> {selectedItem.CommpkgNo}
            </p>
            <p>
              <strong>Description:</strong> {selectedItem.Description}
            </p>
            <p>
              <strong>ProjectMilestone:</strong> {selectedItem.ProjectMilestone}
            </p>
            <p>
              <strong>SafetyMilestone:</strong> {selectedItem.SafetyMilestone}
            </p>
            <p>
              <strong>SubSystemNo:</strong> {selectedItem.SubSystemNo}
            </p>
            <p>
              <strong>Comment:</strong> {selectedItem.Comment}
            </p>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CommpkgSideSheet;
