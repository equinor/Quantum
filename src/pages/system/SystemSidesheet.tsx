import React, { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { SystemData } from "./SystemData";
import "../../App.css";

interface System {
  SystemId: string;
  SystemNo: string;
  SystemDescription: string;
  CommissioningLead: string;
  SystemOwner: string;
  TechnicalIntegrityResponsible: string;
  OperationResponsible: string;
}

interface CommpkgSideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: System | null;
}

const SystemSideSheet: React.FC<CommpkgSideSheetProps> = ({
  show,
  handleClose,
  selectedItem,
}) => {
  const { RequestGraphQL } = useRequestGraphQL();
  const deleteId = selectedItem?.SystemId;
  const [systemNo, setSystemNo] = useState<string>(
    selectedItem?.SystemNo || ""
  );
  const [systemDescription, setSystemDescription] = useState<string>("");
  const [systemOwner, setSystemOwner] = useState<string>("");
  const [technicalIntegrityResponsible, setTechnicalIntegrityResponsible] =
    useState<string>("");
  const [operationResponsible, setOperationResponsible] = useState<string>("");

  useEffect(() => {
    if (selectedItem) {
      setSystemNo(selectedItem.SystemNo);
      setSystemDescription(selectedItem.SystemDescription);
      setSystemOwner(selectedItem.SystemOwner);
      setTechnicalIntegrityResponsible(
        selectedItem.TechnicalIntegrityResponsible
      );
      setOperationResponsible(selectedItem.OperationResponsible);
    }
  }, [selectedItem]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const mutation = `
    mutation updateSystem($systemId: String!, $systemOwner: String!) {
updateSystem(SystemId: $systemId,item:{SystemOwner: $systemOwner} )  {
   result
}
}
    `;
    const variables = {
      systemId: deleteId,
      systemOwner,
    };
    RequestGraphQL<SystemData>(mutation, variables, (data: SystemData) => {
      console.log("System updated:", data);
      handleClose();
    });
    console.log("Form submitted with:", {
      systemNo,
      systemDescription,
      systemOwner,
      technicalIntegrityResponsible,
      operationResponsible,
    });
  };

  const deleteSystem = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(deleteId);
    const mutation = `
    mutation deleteSystem($systemId: String!) {
      deleteSystem(SystemId: $systemId) {
        result
      }
    }
    `;
    const variables = {
      systemId: deleteId,
    };
    RequestGraphQL<SystemData>(mutation, variables, (data: SystemData) => {
      console.log("System deleted:", data);
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
              <Form.Group controlId="formTechnicalIntegrityResponsible">
                <Form.Label>Technical Integrity Responsible</Form.Label>
                <Form.Control
                  type="text"
                  value={technicalIntegrityResponsible}
                  onChange={(e) =>
                    setTechnicalIntegrityResponsible(e.target.value)
                  }
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
              <br />

              <Button variant="secondary" type="submit">
                Update System
              </Button>
              <Button
                className="delete-btn"
                variant="danger"
                onClick={deleteSystem}
              >
                Delete System
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

export default SystemSideSheet;
