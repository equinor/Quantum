import React from "react";
import { Offcanvas } from "react-bootstrap";

interface System {
  SystemId: string;
  SystemNo: string;
  SystemDescription: string;
  CommissioningLead: string;
  SystemOwner: string;
  TechnicalIntegrityResponsible: string;
  OperationResponsible: string;
}

interface CommpkgSideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: System | null;
}

const SystemSideSheet: React.FC<CommpkgSideSheetProps> = ({
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
        {selectedItem ? (
          <div>
            <p>
              <strong>SystemNo:</strong> {selectedItem.SystemNo}
            </p>
            <p>
              <strong>SystemDescription:</strong>{" "}
              {selectedItem.SystemDescription}
            </p>
            <p>
              <strong>System Owner:</strong> {selectedItem.SystemOwner}
            </p>
            <p>
              <strong>TI responsible:</strong>{" "}
              {selectedItem.TechnicalIntegrityResponsible}
            </p>
          </div>
        ) : (
          <p>No system selected.</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SystemSideSheet;
