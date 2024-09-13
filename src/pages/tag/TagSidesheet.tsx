import React, { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { TagData, TagItem } from "./TagData";
import "../../App.css";

interface CommpkgSideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: TagItem | null;
}

const SystemSideSheet: React.FC<CommpkgSideSheetProps> = ({
  show,
  handleClose,
  selectedItem,
}) => {
  const { RequestGraphQL } = useRequestGraphQL();
  const deleteId = selectedItem?.TagId;
  const [tagNo, setTagNo] = useState<string>(selectedItem?.TagNo || "");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [register, setRegister] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [discipline, setDiscipline] = useState<string>("");

  useEffect(() => {
    if (selectedItem) {
      setTagNo(selectedItem.TagNo);
      setDescription(selectedItem.Description);
      setStatus(selectedItem.Status);
      setRegister(selectedItem.Register);
      setLocation(selectedItem.Location);
      setDiscipline(selectedItem.Discipline);
    }
  }, [selectedItem]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mutation = `
        mutation updateTag(
            $tagId: String!,
            $tagNo: String!,
            $description: String!,
            $discipline: String!,
            $register: String!,
            $location: String!,
            $status: String!,
        ) {
        updateTag(TagId: $tagId,
          item: {
            TagNo: $tagNo,
            Description: $description,
            Discipline: $discipline,
            Register: $register
            Status: $status
            Location: $location
          }
        ) {
          result
        }
      }
    `;
    const variables = {
      tagId: deleteId,
      tagNo: tagNo,
      description: description,
      discipline: discipline,
      register: register,
      location: location,
      status: status,
    };
    RequestGraphQL<TagData>(mutation, variables, (data: TagData) => {
      console.log("Tag updated:", data);
      handleClose();
    });
    console.log("Form submitted with:", {
      tagNo: description,
      description: description,
      status: tagNo,
      location: location,
      discipline: status,
    });
  };

  const deleteTag = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(deleteId);
    const mutation = `
    mutation deleteTag($tagId: String!) {
      deleteTag(TagId: $tagId) {
        result
      }
    }
    `;
    const variables = {
      tagId: deleteId,
    };
    RequestGraphQL<TagData>(mutation, variables, (data: TagData) => {
      console.log("Tag deleted:", data);
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
        <Offcanvas.Title>Commissioning Package Details</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#323539", color: "#ffffff" }}>
        {selectedItem ? (
          <div>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formSystemNo">
                <Form.Label>Tag No</Form.Label>
                <Form.Control
                  type="text"
                  value={tagNo}
                  onChange={(e) => setTagNo(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formSystemDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formSystemOwner">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCommissioningLead">
                <Form.Label>Register</Form.Label>
                <Form.Control
                  type="text"
                  value={register}
                  onChange={(e) => setRegister(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formTechnicalIntegrityResponsible">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formOperationResponsible">
                <Form.Label>Discipline</Form.Label>
                <Form.Control
                  type="text"
                  value={discipline}
                  onChange={(e) => setDiscipline(e.target.value)}
                />
              </Form.Group>
              <br />

              <Button variant="secondary" type="submit">
                Update Tag
              </Button>
              <Button
                className="delete-btn"
                variant="danger"
                onClick={deleteTag}
              >
                Delete Tag
              </Button>
            </Form>
          </div>
        ) : (
          <p>No Tag selected.</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SystemSideSheet;
