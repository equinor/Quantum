import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { SideSheet, Button } from "@equinor/eds-core-react";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { createSystem, SystemData, SystemItem } from "./SystemData";

interface SystemSideSheetProps {
  show: boolean;
  handleClose: () => void;
  fetchSystemData: () => void; // Add the fetch function to the props
  selectedItem: SystemItem | null;
}

const CreateSystem: React.FC<SystemSideSheetProps> = ({
  show,
  handleClose,
  fetchSystemData, // Destructure the fetch function
}) => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [systemId, setSystemId] = useState<string>("");
  const [systemNo, setSystemNo] = useState<string>("");
  const [systemDescription, setSystemDescription] = useState<string>("");
  const [systemOwner, setSystemOwner] = useState<string>("");
  const [commissioningLead, setcommissioningLead] = useState<string>("");
  const [technicalIntegrityResponsible, setTechnicalIntegrityResponsible] =
    useState<string>("");
  const [operationResponsible, setOperationResponsible] = useState<string>("");

  useEffect(() => {
    setSystemId("sys-" + uuidv4());
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    const newSystemId = uuidv4();
    setSystemId("sys-" + newSystemId);
    console.log(newSystemId);
    console.log(systemId);
    const mutation = createSystem;
    const input = {
      systemId,
      systemNo,
      systemDescription,
      systemOwner,
      commissioningLead,
      technicalIntegrityResponsible,
      operationResponsible,
    };
    RequestGraphQL<SystemData>(mutation, input, (data: SystemData) => {
      console.log("System created:", data);
      console.log(systemId);
      console.log(systemNo);
      console.log(systemDescription);
      // Reset form fields
      setSystemNo("");
      setSystemDescription("");
      setSystemOwner("");
      setTechnicalIntegrityResponsible("");
      setOperationResponsible("");
      handleClose();
      fetchSystemData(); // Fetch the updated system data
    }).catch((error) => {
      console.error("Error creating system:", error);
    });
  };

  return (
    <SideSheet
      title={"Create System"}
      open={show}
      onClose={handleClose}
      style={{
        height: "100%",
        width: "800px",
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formSystemNo">
          <Form.Label>System No</Form.Label>
          <Form.Control
            type="text"
            value={systemNo}
            onChange={(e) => setSystemNo(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formSystemDescription">
          <Form.Label>System Description</Form.Label>
          <Form.Control
            type="text"
            value={systemDescription}
            onChange={(e) => setSystemDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formSystemOwner">
          <Form.Label>System Owner</Form.Label>
          <Form.Control
            type="text"
            value={systemOwner}
            onChange={(e) => setSystemOwner(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formCommissioningLead">
          <Form.Label>Commissioning Lead</Form.Label>
          <Form.Control
            type="text"
            value={commissioningLead}
            onChange={(e) => setcommissioningLead(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formTechnicalIntegrityResponsible">
          <Form.Label>Technical Integrity Responsible</Form.Label>
          <Form.Control
            type="text"
            value={technicalIntegrityResponsible}
            onChange={(e) => setTechnicalIntegrityResponsible(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formOperationResponsible">
          <Form.Label>Operation Responsible</Form.Label>
          <Form.Control
            type="text"
            value={operationResponsible}
            onChange={(e) => setOperationResponsible(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Create System</Button>
      </Form>
    </SideSheet>
  );
};

export default CreateSystem;
