import React, { useState, useEffect } from "react";
import { Offcanvas, Form, Button, Dropdown, Stack } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { CommpkgData, CommpkgItem } from "./CommpkgData";
import { SubSystemData } from "../subsystem/SubSystemData";
import { ProjectMilestone, SafetyMilestone } from "../../library/Milestone";

interface CreateSubSystemProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: CommpkgItem | null;
}

const CreateCommpkg: React.FC<CreateSubSystemProps> = ({
  show,
  handleClose,
}) => {
  const { RequestGraphQL } = useRequestGraphQL();

  const [formData, setFormData] = useState({
    commpkgId: "comm-" + uuidv4(),
    commpkgNo: "",
    description: "",
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
    identifier: "",
    phase: "",
    commStatus: "",
    mCStatus: "",
    safetyMilestone: "",
  });
  const [subSystem, setSubSystem] = useState<SubSystemData | null>(null);

  useEffect(() => {
    if (show) {
      fetchSubSystems();
      console.log("Show:true");
    } else {
      console.log("Show:false");
    }
  }, [show]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newCommpkgId = "comm-" + uuidv4();
    setFormData((prevData) => ({
      ...prevData,
      commpkgId: newCommpkgId,
    }));
    console.log("Commpkg created:", formData);
    const mutation = `
      mutation createCommpkg(
        $commpkgId: String!,
        $commpkgNo: String!,
        $subSystemId: String!,
        $subSystemNo: String!,
        $description: String!,
        $projectMilestone: String!,
        $safetyMilestone: String!,
        $comment: String!,
        $progress: Int!
        $estimate: Decimal!
        $plannedStart: DateTime!
        $plannedEnd: DateTime!
        $actualStart: DateTime!
        $actualEnd: DateTime!
      ) {
        createCommpkg(
          item: {
            CommpkgId: $commpkgId
            CommpkgNo: $commpkgNo
            SubSystemId: $subSystemId
            SubSystemNo: $subSystemNo
            Description: $description
            ProjectMilestone: $projectMilestone
            SafetyMilestone: $safetyMilestone
            Comment:  $comment
            Progress: $progress
            Estimate: $estimate
            PlannedStart: $plannedStart
            PlannedEnd: $plannedEnd
            ActualStart: $actualStart
            ActualEnd: $actualEnd
          }
        ) {
          result
        }
      }
    `;
    const input = {
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
    RequestGraphQL<CommpkgData>(mutation, input, (data: CommpkgData) => {
      console.log("Commpkg created:", data);
      handleClose();
      resetFormFields();
    });
  };

  const fetchSubSystems = () => {
    const query = `    
    query GetSubSystem() {
    subSystems() {
       items {
        SubSystemNo
        SubSystemId
        SystemNo
       }
    }
  }`;

    RequestGraphQL<SubSystemData>(query, {}, (data: SubSystemData) => {
      setSubSystem(data);
    });
  };

  const resetFormFields = () => {
    setFormData({
      commpkgId: "comm-" + uuidv4(),
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
        className="custom-close-button"
        style={{ backgroundColor: "#323539", color: "#ffffff" }}
      >
        <Offcanvas.Title>Create New Commpkg</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#323539", color: "#ffffff" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSubSystemNo">
            <Form.Label>Commpkg No</Form.Label>
            <Form.Control
              type="text"
              value={formData.commpkgNo}
              onChange={(e) =>
                setFormData({ ...formData, commpkgNo: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formSystemDescription">
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
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {formData.safetyMilestone || "Safety Milestone"}{" "}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.values(SafetyMilestone).map((safetyMilestone) => (
                <Dropdown.Item
                  key={safetyMilestone}
                  onClick={() => setFormData({ ...formData, safetyMilestone })}
                >
                  {safetyMilestone}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {formData.projectMilestone || "Project Milestone"}{" "}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.values(ProjectMilestone).map((projectMilestone) => (
                <Dropdown.Item
                  key={projectMilestone}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      projectMilestone: projectMilestone,
                    })
                  }
                >
                  {projectMilestone}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Stack direction="horizontal" gap={0}>
            {formData.subSystemNo && (
              <Form.Group controlId="formSelectedSystem">
                <Form.Control
                  type="text"
                  value={formData.subSystemNo}
                  readOnly
                />
              </Form.Group>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Select Sub System
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {subSystem?.subSystems.items.map((subsystem) => (
                  <Dropdown.Item
                    key={subsystem.SubSystemId}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        subSystemId: subsystem.SubSystemId,
                        subSystemNo: subsystem.SubSystemNo,
                      });
                    }}
                  >
                    {subsystem.SystemNo + subsystem.SubSystemNo}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
          <br />
          <Form.Group controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              value={formData.comment}
              onChange={(e) =>
                setFormData({ ...formData, comment: e.target.value })
              }
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formProgress">
            <Form.Label>Progress</Form.Label>
            <Form.Control
              type="text"
              value={formData.progress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  progress: parseInt(e.target.value, 10) || 0,
                })
              }
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formEstimate">
            <Form.Label>Estimate</Form.Label>
            <Form.Control
              type="text"
              value={formData.estimate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  estimate: parseFloat(e.target.value) || 0,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formProgress">
            <Form.Label>Planned Start</Form.Label>
            <Form.Control
              type="date"
              value={formData.plannedStart
                .toLocaleDateString("no-NO", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
                .split(".")
                .reverse()
                .join("-")} // Convert Date to Norwegian format and then to string
              onChange={(e) =>
                setFormData({
                  ...formData,
                  plannedStart: new Date(e.target.value), // Convert string back to Date
                })
              }
            />
          </Form.Group>

          <br />
          <br />
          <br />
          <br />
          <br />
          <Button variant="secondary" type="submit">
            Create Commpkg
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CreateCommpkg;
