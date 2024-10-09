import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { SubSystemData, SubSystemItem } from "./SubSystemData";
import "../../App.css";
import { TextField } from "@equinor/eds-core-react";

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mutation = `
      mutation updateSubSystem(
        $subSystemId: String!,
        $subSystemNo: String!,
        $systemNo: String!,
        $description: String!
      ) {
       updateSubSystem(
       SubSystemId: $subSystemId,
          item: {
            SubSystemNo: $subSystemNo,
            SystemNo: $systemNo,
            Description: $description
          }
        ) {
          result
        }
      }
    `;
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
        <Offcanvas.Title>Sub System</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#323539", color: "#ffffff" }}>
        {selectedItem ? (
          <div>
            <Form onSubmit={handleSubmit}>
              <p>SubSystemNo</p>
              <TextField
                id="SubSystemNo"
                value={formData.SubSystemNo}
                onChange={setFormText("SubSystemNo")}
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
              <Button variant="secondary" type="submit">
                Update Sub System
              </Button>
              <Button
                className="delete-btn"
                variant="danger"
                onClick={deleteSubSystem}
              >
                Delete Sub System
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
