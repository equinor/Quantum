import React, { useEffect, useState } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { TagData, TagItem } from "./TagData";

interface CreateTagProps {
  show: boolean;
  handleClose: () => void;
  fetchData: () => void;
  selectedItem: TagItem | null;
}

const CreateTag: React.FC<CreateTagProps> = ({
  show,
  handleClose,
  fetchData,
}) => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [tagId, setTagId] = useState<string>("");
  const [tagNo, setTagNo] = useState<string>("");
  const [discipline, setDiscipline] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [register, setRegister] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    setTagId("tag-" + uuidv4());
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    const newTagId = uuidv4();
    setTagId("tag-" + newTagId);
    console.log(tagId);
    const mutation = `
            mutation createTag(
        $tagId: String!,
        $tagNo: String!,
        $description: String!,
        $discipline: String!,
        $register: String!,
        $location: String!,
        $status: String!,

      ) {
        createTag(
          item: {
            TagId: $tagId,
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
    const input = {
      tagId: tagId,
      tagNo: tagNo,
      description: description,
      discipline: discipline,
      register: register,
      $location: location,
      $status: status,
    };
    RequestGraphQL<TagData>(mutation, input, (data: TagData) => {
      console.log("Tag created:", data);
      resetFormFields();
      handleClose();
      fetchData();
    });
  };

  const resetFormFields = () => {
    setTagNo("");
    setRegister("");
    setDiscipline("");
    setDescription("");
    setLocation("");
    setStatus("");
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
        <Offcanvas.Title>Create New System</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#323539", color: "#ffffff" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="tagNo">
            <Form.Label>TagNo</Form.Label>
            <Form.Control
              type="text"
              value={tagNo}
              onChange={(e) => setTagNo(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSubSystemNo">
            <Form.Label>Discipline</Form.Label>
            <Form.Control
              type="text"
              value={discipline}
              onChange={(e) => setDiscipline(e.target.value)}
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
          <br />
          <Button variant="secondary" type="submit">
            Create Tag
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CreateTag;
