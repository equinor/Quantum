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
              <strong>Comm Pkg:</strong> {selectedItem.CommissioningPackageNo}
            </p>
            <p>
              <strong>Facility:</strong> {selectedItem.Facility}
            </p>
            <p>
              <strong>Comm Priority 1:</strong> {selectedItem.Priority1}
            </p>
            <p>
              <strong>Comm Priority 2:</strong> {selectedItem.Priority2}
            </p>
            <p>
              <strong>Comm Priority 3:</strong> {selectedItem.Priority3}
            </p>
            <p>
              <strong>Comm Phase:</strong> {selectedItem.CommissioningPhase}
            </p>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CommpkgSideSheet;
