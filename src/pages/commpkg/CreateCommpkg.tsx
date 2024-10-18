import React, { useState, useEffect, ChangeEvent } from "react";
import { Form, Stack } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { CommpkgData, CommpkgItem, createCommpkg } from "./CommpkgData";
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
  SideSheet,
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
    <SideSheet
      title={"Create Commpkg"}
      open={show}
      onClose={handleClose}
      style={{
        height: "100%",
        width: "800px",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Commpkg No"
          id="commpkgNo"
          value={formData.CommpkgNo}
          onChange={setFormText("CommpkgNo")}
        />
        <br />
        <Autocomplete
          label="Sub System"
          options={
            subSystem
              ? subSystem.subSystems.items.map((item) => item.SubSystemNo)
              : []
          }
          onOptionsChange={setSelectedEnum("SubSystemNo")}
          placeholder="Select Sub System"
        />
        <br />
        <Autocomplete
          label="Identifier"
          options={Object.values(Identifier)}
          onOptionsChange={setSelectedEnum("Identifier")}
          placeholder="Select Identifier"
        />
        <br />
        <TextField
          label="Description"
          id="description"
          multiline
          rowsMax={10}
          value={formData.Description}
          onChange={setFormText("Description")}
        />
        <br />
        <Autocomplete
          label="Safety Milestone"
          options={Object.values(SafetyMilestone)}
          onOptionsChange={setSelectedEnum("SafetyMilestone")}
          placeholder="Select Safety Milestone"
        />
        <br />
        <Autocomplete
          label="Project Milestone"
          options={Object.values(ProjectMilestone)}
          onOptionsChange={setSelectedEnum("ProjectMilestone")}
          placeholder="Select Project Milestone"
        />
        <br />
        <Autocomplete
          label="Phase"
          options={Object.values(Phase)}
          onOptionsChange={setSelectedEnum("Phase")}
          placeholder="Select Phase"
        />
        <br />
        <TextField
          id="Progress"
          label="Progress"
          value={formData.Progress}
          onChange={setFormFloat("Progress")}
        />
        <br />
        <TextField
          label="Estimate"
          id="Estimate"
          value={formData.Estimate}
          onChange={setFormFloat("Estimate")}
        />
        <br />
        <Stack direction="horizontal" gap={3}>
          {" "}
          <DatePicker
            label="Planned Start"
            value={formData.PlannedStart}
            onChange={(date: Date | null) =>
              setFormData({
                ...formData,
                PlannedStart: date,
              })
            }
          ></DatePicker>
          <DatePicker
            label="Planned End"
            value={formData.PlannedEnd}
            onChange={(date: Date | null) =>
              setFormData({
                ...formData,
                PlannedEnd: date,
              })
            }
          ></DatePicker>
        </Stack>
        <br />
        <TextField
          label="Comment"
          id="Comment"
          multiline
          rowsMax={10}
          value={formData.Comment}
          onChange={setFormText("Comment")}
        />
        <br />
        <Button type="submit">
          {loading ? <StarProgress size={16} /> : "Create Commpkg "}
        </Button>
      </Form>
    </SideSheet>
  );
};

export default CreateCommpkg;
