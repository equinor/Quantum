import React, { useState, useEffect, ChangeEvent } from "react";
import { Offcanvas, Form, Stack } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { CommpkgData, CommpkgItem } from "./CommpkgData";
import { SubSystemData } from "../subsystem/SubSystemData";
import { ProjectMilestone, SafetyMilestone } from "../../library/Milestone";
import { Phase } from "../../library/Phase";
import { Identifier } from "../../library/Identifier";
import { createCommpkg } from "../../graphql/Queries";
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
  const setSelectedEnum =
    (item: string) => (changes: AutocompleteChanges<string>) => {
      // Convert changes to the format expected by setFormData
      const value = changes.selectedItems[0]; // Adjust this line based on how changes are structured
      setFormData({
        ...formData,
        [item]: value, // Use computed property name
      });
    };

  const setFormText = (item: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [item]: e.target.value, // Use computed property name
    });
  };
  const setFormFloat =
    (item: string | number) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [item]: parseFloat(e.target.value) || 0, // Use computed property name
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
    ActualEnd: null,
    ActualStart: null,
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
    const mutation = createCommpkg;
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
      ActualEnd: null,
      ActualStart: null,
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
      style={{ width: "1000px" }}
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
          <p>Commpkg No</p>
          <TextField
            id="commpkgNo"
            value={formData.CommpkgNo}
            onChange={setFormText("CommpkgNo")}
          />
          <br />
          <p>Description</p>
          <TextField
            id="description"
            multiline
            rowsMax={10}
            value={formData.Description}
            onChange={setFormText("Description")}
          />
          <br />
          <Autocomplete
            label=""
            options={Object.values(SafetyMilestone)}
            onOptionsChange={setSelectedEnum("SafetyMilestone")}
            style={{ color: "black", backgroundColor: "black" }}
            placeholder="SafetyMilestone"
            className="auto"
          />
          <br />
          <Autocomplete
            label=""
            options={Object.values(ProjectMilestone)}
            onOptionsChange={setSelectedEnum("ProjectMilestone")}
            style={{ color: "black", backgroundColor: "black" }}
            placeholder="ProjectMilestone"
            className="auto"
          />
          <br />
          <Autocomplete
            label=""
            options={Object.values(Phase)}
            onOptionsChange={setSelectedEnum("Phase")}
            style={{ color: "black", backgroundColor: "black" }}
            placeholder="Phase"
            className="auto"
          />
          <br />
          <Autocomplete
            label=""
            options={Object.values(Identifier)}
            onOptionsChange={setSelectedEnum("Identifier")}
            style={{ color: "black", backgroundColor: "black" }}
            placeholder="Identifier"
            className="auto"
          />
          <br />
          <p>Comment</p>
          <TextField
            id="Comment"
            multiline
            rowsMax={10}
            value={formData.Comment}
            onChange={setFormText("Comment")}
          />
          <br />
          <Autocomplete
            label=""
            options={
              subSystem
                ? subSystem.subSystems.items.map((item) => item.SubSystemNo)
                : []
            }
            onOptionsChange={setSelectedEnum("SubSystemNo")}
            style={{ color: "black", backgroundColor: "black" }}
            placeholder="SubSystemNo"
            className="auto"
          />
          <br />
          <p>Progress</p>
          <TextField
            id="Progress"
            value={formData.Progress}
            onChange={setFormFloat("Progress")}
          />
          <br />
          <p>Estimate</p>
          <TextField
            id="Estimate"
            value={formData.Estimate}
            onChange={setFormFloat("Estimate")}
          />
          <Stack direction="horizontal" gap={5}>
            <Form.Group controlId="formActualStart">
              <Form.Label>Planned Start</Form.Label>
              <DatePicker
                value={formData.PlannedStart}
                onChange={(date: Date | null) =>
                  setFormData({
                    ...formData,
                    PlannedStart: date,
                  })
                }
              ></DatePicker>
            </Form.Group>
            <Form.Group>
              <Form.Label>Planned End</Form.Label>
              <DatePicker
                value={formData.PlannedEnd}
                onChange={(date: Date | null) =>
                  setFormData({
                    ...formData,
                    PlannedEnd: date,
                  })
                }
              ></DatePicker>
            </Form.Group>
          </Stack>
          <br />
          <br />
          <br />
          <Button type="submit">
            {loading ? <StarProgress size={16} /> : "Create Commpkg "}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CreateCommpkg;
