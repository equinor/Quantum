import React from "react";
import { Offcanvas } from "react-bootstrap";
import { ChecklistItem } from "./ChecklistData";

interface CommpkgSideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: ChecklistItem | null;
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
              <strong>Form Type:</strong> {selectedItem.FormType}
            </p>
            <p>
              <strong>Form Group:</strong> {selectedItem.FormGroup}
            </p>
            <p>
              <strong>Form Discipline:</strong> {selectedItem.FormDiscipline}
            </p>
            <p>
              <strong>Form Responsible:</strong> {selectedItem.FormResponsible}
            </p>
            <p>
              <strong>Facility:</strong> {selectedItem.Facility}
            </p>
            <p>
              <strong>Tag:</strong> {selectedItem.TagNo}
            </p>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CommpkgSideSheet;
