import React, { ChangeEvent, useEffect, useState } from "react";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { SubSystemData, SubSystemItem, updateSubSystem } from "./SubSystemData";
import "../../App.css";
import { SideSheet, TextField, Button } from "@equinor/eds-core-react";

interface SubSystemSideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: SubSystemItem | null;
}

const SubSystemSideSheet: React.FC<SubSystemSideSheetProps> = ({
  show,
  handleClose,
  selectedItem,
}) => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [formData, setFormData] = useState<SubSystemItem>({
    SubSystemId: "",
    SubSystemNo: "",
    SystemId: "",
    SystemNo: "",
    Description: "",
  });
  const setFormText = (item: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [item]: e.target.value, // Use computed property name
    });
  };
  useEffect(() => {
    if (selectedItem) {
      setFormData({
        SubSystemId: selectedItem.SubSystemId,
        SubSystemNo: selectedItem.SubSystemNo,
        SystemId: selectedItem.SystemId,
        SystemNo: selectedItem.SystemNo,
        Description: selectedItem.Description,
      });
    }
  }, [selectedItem]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const mutation = updateSubSystem;
    const variables = {
      subSystemId: formData.SubSystemId,
      subSystemNo: formData.SubSystemNo,
      description: formData.Description,
      systemNo: formData.SystemNo,
    };
    RequestGraphQL<SubSystemData>(
      mutation,
      variables,
      (data: SubSystemData) => {
        console.log("System updated:", data);
        handleClose();
      }
    );
    console.log("Form submitted with:", {
      formData,
    });
  };

  const deleteSubSystem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("Deleted: " + formData.SubSystemNo);
    const mutation = `
    mutation deleteSubSystem($subSystemId: String!) {
      deleteSubSystem(SubSystemId: $subSystemId) {
        result
      }
    }
    `;
    const variables = {
      subSystemId: formData.SubSystemId,
    };
    RequestGraphQL<SubSystemData>(
      mutation,
      variables,
      (data: SubSystemData) => {
        console.log("Sub System deleted:", data);
        handleClose();
      }
    );
  };

  return (
    <SideSheet
      title={"Sub System: " + selectedItem?.SubSystemNo}
      open={show}
      onClose={handleClose}
      style={{
        height: "100%",
        width: "800px",
      }}
    >
      {selectedItem ? (
        <div>
          <TextField
            id="SubSystemNo"
            label="Sub System"
            value={formData.SubSystemNo}
            onChange={setFormText("SubSystemNo")}
          />
          <br />
          <TextField
            id="description"
            label="Description"
            multiline
            rowsMax={10}
            value={formData.Description}
            onChange={setFormText("Description")}
          />
          <br />
          <Button onClick={handleSubmit}>Update Sub System</Button>
          <Button
            className="delete-btn"
            color="danger"
            onClick={deleteSubSystem}
          >
            Delete Sub System
          </Button>
        </div>
      ) : (
        <p>No system selected.</p>
      )}
    </SideSheet>
  );
};

export default SubSystemSideSheet;
