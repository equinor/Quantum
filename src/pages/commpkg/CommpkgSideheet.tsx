import React, { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { CommpkgData, CommpkgItem } from "./CommpkgData";
import "../../App.css";

interface SubSystemSideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: CommpkgItem | null;
}

const SubSystemSideSheet: React.FC<SubSystemSideSheetProps> = ({
  show,
  handleClose,
  selectedItem,
}) => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [formData, setFormData] = useState({
    commpkgId: "",
    commpkgNo: "",
    subSystemId: "",
    subSystemNo: "",
    projectMilestone: "",
    comment: "",
    handoverStatus: "",
    plannedStart: new Date(),
    plannedEnd: new Date(),
    actualEnd: new Date(),
    actualStart: new Date(),
    responsible: "",
    progress: 0,
    estimate: 0,
    description: "",
    identifier: "",
    phase: "",
    commStatus: "",
    mCStatus: "",
    safetyMilestone: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        commpkgId: selectedItem?.CommpkgId,
        commpkgNo: selectedItem?.CommpkgNo,
        subSystemId: selectedItem?.SubSystemId,
        subSystemNo: selectedItem?.SubSystemNo,
        projectMilestone: selectedItem?.ProjectMilestone,
        comment: selectedItem?.Comment,
        handoverStatus: selectedItem?.HandoverStatus,
        plannedStart: selectedItem?.PlannedStart,
        plannedEnd: selectedItem?.PlannedEnd,
        actualEnd: selectedItem?.ActualStart,
        actualStart: selectedItem?.ActualStart,
        responsible: selectedItem?.Responsible,
        progress: selectedItem?.Progress,
        estimate: selectedItem?.Estimate,
        description: selectedItem?.Description,
        identifier: selectedItem?.Identifier,
        phase: selectedItem?.Phase,
        commStatus: selectedItem?.CommStatus,
        mCStatus: selectedItem?.MCStatus,
        safetyMilestone: selectedItem?.SafetyMilestone,
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
      commpkgId: formData.commpkgId,
      commpkgNo: formData.commpkgNo,
      subSystemId: formData.subSystemId,
      subSystemNo: formData.subSystemNo,
      description: formData.description,
      projectMilestone: formData.projectMilestone,
      comment: formData.comment,
      handoverStatus: formData.handoverStatus,
      plannedStart: formData.plannedStart,
      plannedEnd: formData.plannedEnd,
      actualEnd: formData.actualEnd,
      actualStart: formData.actualStart,
      responsible: formData.responsible,
      progress: formData.progress,
      estimate: formData.estimate,
      identifier: formData.identifier,
      phase: formData.phase,
      commStatus: formData.commStatus,
      mCStatus: formData.mCStatus,
      safetyMilestone: formData.safetyMilestone,
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
    console.log(formData.commpkgId);
    const mutation = `
    mutation deleteCommpkg($commpkgId: String!) {
      deleteCommpkg(CommpkgId: $commpkgId) {
        result
      }
    }
    `;
    const variables = {
      commpkgId: formData.commpkgId,
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
                  value={formData.commpkgNo}
                  onChange={(e) =>
                    setFormData({ ...formData, commpkgNo: e.target.value })
                  }
                  required
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formSubSystemDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
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

export default SubSystemSideSheet;
