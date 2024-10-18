import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { createTag, TagData, TagItem } from "./TagData";
import { SideSheet, Button } from "@equinor/eds-core-react";

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
    const mutation = createTag;
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
    <SideSheet
      title={"Create Tag "}
      open={show}
      onClose={handleClose}
      style={{
        height: "100%",
        width: "800px",
      }}
    >
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
        <Button type="submit">Create Tag</Button>
      </Form>
    </SideSheet>
  );
};

export default CreateTag;
