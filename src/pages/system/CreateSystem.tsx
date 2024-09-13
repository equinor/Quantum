import React, { useState, useEffect } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { SystemData, SystemItem } from "./SystemData";

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
    const mutation = `
      mutation 
        createSystem(
          $systemId: String!
          ,$systemNo: String!
          ,$systemDescription: String!
          ,$systemOwner: String!
          ,$commissioningLead: String!
          ,$technicalIntegrityResponsible: String!
          ,$operationResponsible: String!
          ) {
        createSystem(
          item:{
            SystemId: $systemId
            SystemNo: $systemNo
            SystemDescription: $systemDescription
            SystemOwner: $systemOwner
            CommissioningLead: $commissioningLead
            TechnicalIntegrityResponsible: $technicalIntegrityResponsible
            OperationResponsible: $operationResponsible
          }
        )  
        {
        result
        }
      }
      `;
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
          <Button variant="secondary" type="submit">
            Create System
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CreateSystem;
