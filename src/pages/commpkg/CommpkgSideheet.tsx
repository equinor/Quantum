import React, { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { CommpkgData, CommpkgItem } from "./CommpkgData";
import "../../App.css";

interface SideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: CommpkgItem | null;
}

const CommpkgSideSheet: React.FC<SideSheetProps> = ({
  show,
  handleClose,
  selectedItem,
}) => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [formData, setFormData] = useState<CommpkgItem>({
    CommpkgId: "",
    CommpkgNo: "",
    Description: "",
    SubSystemId: "",
    SubSystemNo: "",
    ProjectMilestone: "",
    Comment: "",
    HandoverStatus: "",
    PlannedStart: new Date(),
    PlannedEnd: new Date(),
    ActualEnd: new Date(),
    ActualStart: new Date(),
    Responsible: "",
    Progress: 0,
    Estimate: 0,
    Identifier: "",
    Phase: "",
    CommStatus: "",
    MCStatus: "",
    SafetyMilestone: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        CommpkgId: selectedItem?.CommpkgId,
        CommpkgNo: selectedItem?.CommpkgNo,
        SubSystemId: selectedItem?.SubSystemId,
        SubSystemNo: selectedItem?.SubSystemNo,
        ProjectMilestone: selectedItem?.ProjectMilestone,
        Comment: selectedItem?.Comment,
        HandoverStatus: selectedItem?.HandoverStatus,
        PlannedStart: selectedItem?.PlannedStart,
        PlannedEnd: selectedItem?.PlannedEnd,
        ActualEnd: selectedItem?.ActualStart,
        ActualStart: selectedItem?.ActualStart,
        Responsible: selectedItem?.Responsible,
        Progress: selectedItem?.Progress,
        Estimate: selectedItem?.Estimate,
        Description: selectedItem?.Description,
        Identifier: selectedItem?.Identifier,
        Phase: selectedItem?.Phase,
        CommStatus: selectedItem?.CommStatus,
        MCStatus: selectedItem?.MCStatus,
        SafetyMilestone: selectedItem?.SafetyMilestone,
      });
    }
  }, [selectedItem]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mutation = `
      mutation updateSystem(
        $subSystemId: String!,
        $subSystemNo: String!,
        $systemId: String!,
        $systemNo: String!,
        $description: String!
      ) {
       updateSystem(
          item: {
            SubSystemId: $subSystemId,
            SubSystemNo: $subSystemNo,
            SystemId: $systemId,
            SystemNo: $systemNo,
            Description: $description
          }
        ) {
          result
        }
      }
    `;
    const variables = {
      commpkgId: formData.CommpkgId,
      commpkgNo: formData.CommpkgNo,
      subSystemId: formData.SubSystemId,
      subSystemNo: formData.SubSystemNo,
      description: formData.Description,
      projectMilestone: formData.ProjectMilestone,
      comment: formData.Comment,
      handoverStatus: formData.HandoverStatus,
      plannedStart: formData.PlannedStart,
      plannedEnd: formData.PlannedEnd,
      actualEnd: formData.ActualEnd,
      actualStart: formData.ActualStart,
      responsible: formData.Responsible,
      progress: formData.Progress,
      estimate: formData.Estimate,
      identifier: formData.Identifier,
      phase: formData.Phase,
      commStatus: formData.CommStatus,
      mCStatus: formData.MCStatus,
      safetyMilestone: formData.SafetyMilestone,
    };
    RequestGraphQL<CommpkgData>(mutation, variables, (data: CommpkgData) => {
      console.log("Commpkg updated:", data);
      handleClose();
    });
    console.log("Form submitted with:", {
      formData,
    });
  };

  const deleteSubSystem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("CommpkgId");
    console.log(formData.CommpkgId);
    const mutation = `
    mutation deleteCommpkg($commpkgId: String!) {
      deleteCommpkg(CommpkgId: $commpkgId) {
        result
      }
    }
    `;
    const variables = {
      commpkgId: formData.CommpkgId,
    };
    RequestGraphQL<CommpkgData>(mutation, variables, (data: CommpkgData) => {
      console.log("Commpkg deleted:", data);
      handleClose();
    });
  };

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      placement="end"
      style={{ width: "800px" }}
    >
      <Offcanvas.Header
        closeButton
        className="custom-close-button d-flex justify-content-between"
        style={{ backgroundColor: "#323539", color: "#ffffff" }}
      >
        <Offcanvas.Title>Commpkg</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#323539", color: "#ffffff" }}>
        {selectedItem ? (
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formSubSystemNo">
                <Form.Label>Commpkg</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.CommpkgNo}
                  onChange={(e) =>
                    setFormData({ ...formData, CommpkgNo: e.target.value })
                  }
                  required
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formSubSystemDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.Description}
                  onChange={(e) =>
                    setFormData({ ...formData, Description: e.target.value })
                  }
                />
              </Form.Group>
              <br />

              <Button variant="secondary" type="submit">
                Update Commpkg
              </Button>
              <Button
                className="delete-btn"
                variant="danger"
                onClick={deleteSubSystem}
              >
                Delete Commpkg
              </Button>
            </Form>
          </div>
        ) : (
          <p>No system selected.</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CommpkgSideSheet;
