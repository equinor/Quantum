import React from "react";
import { Offcanvas } from "react-bootstrap";

interface CommissioningPackage {
  CommissioningPackageNo: string;
  Facility: string;
  Priority3: string;
  CommissioningPhase: string;
}

interface CommpkgSideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: CommissioningPackage | null;
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
              <strong>Commpkg:</strong> {selectedItem.CommissioningPackageNo}
            </p>
            <p>
              <strong>Facility:</strong> {selectedItem.Facility}
            </p>
            <p>
              <strong>Safety Milestone:</strong> {selectedItem.Priority3}
            </p>
            <p>
              <strong>Phase:</strong> {selectedItem.CommissioningPhase}
            </p>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CommpkgSideSheet;
