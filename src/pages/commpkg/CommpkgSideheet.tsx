import React, { ChangeEvent, useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import {
  CommpkgData,
  CommpkgItem,
  Responsible,
  updateCommpkg,
} from "./CommpkgData";
import "../../App.css";
import {
  Autocomplete,
  AutocompleteChanges,
  Button,
  DatePicker,
  SideSheet,
  TextField,
} from "@equinor/eds-core-react";
import { ProjectMilestone, SafetyMilestone } from "../../library/Milestone";
import { Identifier } from "../../library/Identifier";
import { Phase } from "../../library/Phase";

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

  const setSelectedEnum =
    (item: string) => (changes: AutocompleteChanges<string>) => {
      const value = changes.selectedItems;
      setFormData({
        ...formData,
        [item]: value,
      });
    };

  const setFormFloat =
    (item: string | number) => (e: ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [item]: parseFloat(e.target.value) || 0,
      });
    };

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
        PlannedStart: selectedItem?.PlannedStart
          ? new Date(selectedItem.PlannedStart)
          : new Date(),
        PlannedEnd: selectedItem?.PlannedEnd
          ? new Date(selectedItem.PlannedEnd)
          : new Date(),
        ActualEnd: selectedItem?.ActualEnd
          ? new Date(selectedItem.ActualEnd)
          : null,
        ActualStart: selectedItem?.ActualStart
          ? new Date(selectedItem.ActualStart)
          : null,
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

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const mutation = updateCommpkg;
    const variables = {
      commpkgId: formData.CommpkgId,
      subSystemNo: formData.SubSystemNo,
      description: formData.Description,
      projectMilestone: formData.ProjectMilestone,
      safetyMilestone: formData.SafetyMilestone,
      responsible: formData.Responsible,
      identifier: formData.Identifier,
      phase: formData.Phase,
      comment: formData.Comment,
      plannedStart: formData.PlannedStart,
      plannedEnd: formData.PlannedEnd,
      progress: formData.Progress,
      estimate: formData.Estimate,
    };
    RequestGraphQL<CommpkgData>(mutation, variables, (data: CommpkgData) => {
      console.log("Commpkg updated:", data);
      handleClose();
    });
    console.log("Form submitted with:", {
      formData,
    });
  };

  const setFormText = (item: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [item]: e.target.value,
    });
  };

  const deleteSubSystem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Deleted: " + formData.CommpkgId);
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
    <SideSheet
      title={selectedItem?.CommpkgNo}
      open={show}
      onClose={handleClose}
      style={{
        height: "100%",
        width: "800px",
      }}
    >
      {selectedItem ? (
        <div>
          <Form>
            <TextField
              label="Description"
              id="description"
              multiline
              rowsMax={10}
              value={formData.Description}
              onChange={setFormText("Description")}
            />
            <br />
            <TextField
              label="Sub System"
              id="sbuSystem"
              value={formData.SubSystemNo}
              readOnly
            />
            <br />
            <Autocomplete
              label="Project Milestone"
              options={Object.values(ProjectMilestone)}
              onOptionsChange={setSelectedEnum("ProjectMilestone")}
              placeholder={selectedItem.ProjectMilestone}
            />
            <br />
            <Autocomplete
              label="Safety Milestone"
              options={Object.values(SafetyMilestone)}
              onOptionsChange={setSelectedEnum("SafetyMilestone")}
              placeholder={selectedItem.SafetyMilestone}
            />
            <br />
            <Autocomplete
              label="Responsible"
              options={Object.values(Responsible)}
              onOptionsChange={setSelectedEnum("Responsible")}
              placeholder={selectedItem.Responsible}
            />
            <br />
            <Autocomplete
              label="Identifier"
              options={Object.values(Identifier)}
              onOptionsChange={setSelectedEnum("Identifier")}
              placeholder={selectedItem.Identifier}
            />
            <br />
            <Autocomplete
              label="Phase"
              options={Object.values(Phase)}
              onOptionsChange={setSelectedEnum("Phase")}
              placeholder={selectedItem.Phase}
            />
            <br />
            <TextField
              label="Estimate"
              id="Estimate"
              value={formData.Estimate}
              onChange={setFormFloat("Estimate")}
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
              label="Comment"
              id="Comment"
              multiline
              rowsMax={10}
              value={formData.Comment}
              onChange={setFormText("Comment")}
            />
            <br />

            <br />
            <Stack direction="horizontal" gap={3}>
              <DatePicker
                label="Planned Start"
                value={formData.PlannedStart}
                onChange={(date: Date | null) =>
                  setFormData({
                    ...formData,
                    PlannedStart: date || new Date(),
                  })
                }
              />
              <DatePicker
                label="Planned End"
                value={formData.PlannedEnd}
                onChange={(date: Date | null) =>
                  setFormData({
                    ...formData,
                    PlannedEnd: date || new Date(),
                  })
                }
              />
            </Stack>
            <Button onClick={handleSubmit}>Update Commpkg</Button>
            <Button color="danger" onClick={deleteSubSystem}>
              Delete Commpkg
            </Button>
          </Form>
        </div>
      ) : (
        <div>No item selected</div>
      )}
    </SideSheet>
  );
};

export default CommpkgSideSheet;
