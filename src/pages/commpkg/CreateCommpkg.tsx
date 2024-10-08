import React, { useState, useEffect } from "react";
import { Offcanvas, Form, Dropdown, Stack } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { CommpkgData, CommpkgItem } from "./CommpkgData";
import { SubSystemData } from "../subsystem/SubSystemData";
import { ProjectMilestone, SafetyMilestone } from "../../library/Milestone";
import { Phase } from "../../library/Phase";
import { Identifier } from "../../library/Identifier";
import "./commpkgTheme.css";
import {
  Button,
  DatePicker,
  Autocomplete,
  AutocompleteChanges,
  StarProgress,
  TextField,
} from "@equinor/eds-core-react";

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
  const handleOptionsChange =
    (item: string) => (changes: AutocompleteChanges<string>) => {
      // Convert changes to the format expected by setFormData
      const value = changes.selectedItems[0]; // Adjust this line based on how changes are structured
      setFormData({
        ...formData,
        [item]: value, // Use computed property name
      });
    };
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<CommpkgItem>({
    CommpkgId: "comm-" + uuidv4(),
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
    setLoading(true);
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
        $progress: Int!,
        $estimate: Decimal!,
        $plannedStart: DateTime!,
        $plannedEnd: DateTime!,
        $actualStart: DateTime!,
        $actualEnd: DateTime!,
        $responsible: String!,
        $identifier: String!,
        $phase: String!

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
            Responsible: $responsible
            Identifier: $identifier
            Phase: $phase
          }
        ) {
          result
        }
      }
    `;
    const input = {
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
    RequestGraphQL<CommpkgData>(mutation, input, (data: CommpkgData) => {
      console.log("Commpkg created:", data);
      setLoading(false);
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
      CommpkgId: "comm-" + uuidv4(),
      CommpkgNo: "",
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
      Description: "",
      Identifier: "",
      Phase: "",
      CommStatus: "",
      MCStatus: "",
      SafetyMilestone: "",
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
      <Offcanvas.Body style={{ backgroundColor: "#323539", color: "#000000" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCommpkg">
            <Form.Label>Commpkg No</Form.Label>
            <Form.Control
              type="text"
              value={formData.CommpkgNo}
              onChange={(e) =>
                setFormData({ ...formData, CommpkgNo: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
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
          <TextField id="description" style={{ color: "black" }} />
          <br />
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {formData.SafetyMilestone || "Safety Milestone"}{" "}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.values(SafetyMilestone).map((formSafetyMilestone) => (
                <Dropdown.Item
                  key={formSafetyMilestone}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      SafetyMilestone: formSafetyMilestone,
                    })
                  }
                >
                  {formSafetyMilestone}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Autocomplete
            label=""
            options={Object.values(ProjectMilestone)}
            onOptionsChange={handleOptionsChange("ProjectMilestone")}
            style={{ color: "black", backgroundColor: "black" }}
            placeholder="ProjectMilestone"
            className="auto"
          />
          <br />
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {formData.Phase || "Phase"}{" "}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.values(Phase).map((formPhase) => (
                <Dropdown.Item
                  key={formPhase}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      Phase: formPhase,
                    })
                  }
                >
                  {formPhase}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {formData.Identifier || "Identifier"}{" "}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.values(Identifier).map((formIdentifier) => (
                <Dropdown.Item
                  key={formIdentifier}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      Identifier: formIdentifier,
                    })
                  }
                >
                  {formIdentifier}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <br />
          <Form.Group controlId="formComment">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              type="text"
              value={formData.Comment}
              onChange={(e) =>
                setFormData({ ...formData, Comment: e.target.value })
              }
            />
          </Form.Group>
          <br />
          <Stack direction="horizontal" gap={0}>
            {formData.SubSystemNo && (
              <Form.Group controlId="formSelectedSubSystem">
                <Form.Control
                  type="text"
                  value={formData.SubSystemNo}
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
                        SubSystemId: subsystem.SubSystemId,
                        SubSystemNo: subsystem.SubSystemNo,
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
          <Form.Group controlId="formProgress">
            <Form.Label>Progress</Form.Label>
            <Form.Control
              type="text"
              value={formData.Progress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  Progress: parseInt(e.target.value, 10) || 0,
                })
              }
            />
          </Form.Group>
          <br />
          <Form.Group controlId="formEstimate">
            <Form.Label>Estimate</Form.Label>
            <Form.Control
              type="text"
              value={formData.Estimate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  Estimate: parseFloat(e.target.value) || 0,
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formPlannedStart">
            <Form.Label>Planned Start</Form.Label>
            <Form.Control
              type="date"
              value={formData.PlannedStart.toLocaleDateString("no-NO", {
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
                  PlannedStart: new Date(e.target.value), // Convert string back to Date
                })
              }
            />
          </Form.Group>
          <Form.Group controlId="formPlannedEnd">
            <Form.Label>Planned End</Form.Label>
            <Form.Control
              type="date"
              value={formData.PlannedEnd.toLocaleDateString("no-NO", {
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
                  PlannedEnd: new Date(e.target.value), // Convert string back to Date
                })
              }
            />
          </Form.Group>
          <Stack direction="horizontal" gap={5}>
            <Form.Group controlId="formActualStart">
              <Form.Label>Actual Start</Form.Label>
              <DatePicker
                value={formData.ActualStart}
                onChange={(date: Date | null) =>
                  setFormData({
                    ...formData,
                    ActualStart: date,
                  })
                }
              ></DatePicker>
            </Form.Group>
            <Form.Group>
              <Form.Label>Actual End</Form.Label>
              <DatePicker
                value={formData.ActualEnd}
                onChange={(date: Date | null) =>
                  setFormData({
                    ...formData,
                    ActualEnd: date,
                  })
                }
              ></DatePicker>
            </Form.Group>
          </Stack>
          <br />
          <br />
          <br />
          <Button type="submit">Create Commpkg</Button>
        </Form>
        {loading && (
          <div>
            <br />
            <br />
            <br />
            <br />
            <center>
              <StarProgress size={48} />
            </center>
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CreateCommpkg;
