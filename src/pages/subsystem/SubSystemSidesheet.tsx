import React, { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { SubSystemData, SubSystemItem } from "./SubSystemData";
import "../../App.css";

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
  const deleteId = selectedItem?.SubSystemId;
  const [subSystemNo, setSubSystemNo] = useState<string>(
    selectedItem?.SubSystemNo || ""
  );
  const [description, setDescription] = useState<string>("");
  const [systemNo, setSystemNo] = useState<string>("");

  useEffect(() => {
    if (selectedItem) {
      setSubSystemNo(selectedItem.SubSystemNo);
      setDescription(selectedItem.Description);
      setSystemNo(selectedItem.SystemNo);
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
      subSystemId: deleteId,
      subSystemNo,
      description,
      systemNo,
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
      subSystemNo,
      description,
      systemNo,
    });
  };

  const deleteSubSystem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("deleteId");
    console.log(deleteId);
    const mutation = `
    mutation deleteSubSystem($subSystemId: String!) {
      deleteSubSystem(SubSystemId: $subSystemId) {
        result
      }
    }
    `;
    const variables = {
      subSystemId: deleteId,
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
              <Form.Group controlId="formSubSystemNo">
                <Form.Label>System No</Form.Label>
                <Form.Control
                  type="text"
                  value={systemNo}
                  onChange={(e) => setSystemNo(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formSubSystemDescription">
                <Form.Label>Sub System Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <br />

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
