import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { SystemData, updateSystem } from "./SystemData";
import "../../App.css";
import { SideSheet, Button, Icon } from "@equinor/eds-core-react";
import { save } from "@equinor/eds-icons";

interface System {
  SystemId: string;
  SystemNo: string;
  SystemDescription: string;
  CommissioningLead: string;
  SystemOwner: string;
  TechnicalIntegrityResponsible: string;
  OperationResponsible: string;
}

interface SideSheetProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: System | null;
}

const SystemSideSheet: React.FC<SideSheetProps> = ({
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
  const [commissioningLead, setcommissioningLead] = useState<string>("");
  const [technicalIntegrityResponsible, setTechnicalIntegrityResponsible] =
    useState<string>("");
  const [operationResponsible, setOperationResponsible] = useState<string>("");
  Icon.add({ save });

  useEffect(() => {
    if (selectedItem) {
      setSystemNo(selectedItem.SystemNo);
      setSystemDescription(selectedItem.SystemDescription);
      setSystemOwner(selectedItem.SystemOwner);
      setcommissioningLead(selectedItem.CommissioningLead);
      setTechnicalIntegrityResponsible(
        selectedItem.TechnicalIntegrityResponsible
      );
      setOperationResponsible(selectedItem.OperationResponsible);
    }
  }, [selectedItem]);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const mutation = updateSystem;
    const variables = {
      systemId: deleteId,
      systemOwner,
      systemNo,
      systemDescription,
      commissioningLead,
      technicalIntegrityResponsible,
      operationResponsible,
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
    <SideSheet
      title={"System: " + selectedItem?.SystemNo}
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

            <Button variant="ghost_icon" onClick={handleSubmit}>
              <Icon data={save}></Icon>
            </Button>

            <Button color="danger" onClick={deleteSystem}>
              Delete System
            </Button>
          </Form>
        </div>
      ) : (
        <p>No system selected.</p>
      )}
    </SideSheet>
  );
};

export default SystemSideSheet;
