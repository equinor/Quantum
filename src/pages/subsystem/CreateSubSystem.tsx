import React, { useState, useEffect } from "react";
import { Offcanvas, Form, Button, Dropdown, Stack } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { SubSystemData, SubSystemItem } from "./SubSystemData";
import { SystemData } from "../system/SystemData";

interface CreateSubSystemProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: SubSystemItem | null;
}

const CreateSubSystem: React.FC<CreateSubSystemProps> = ({
  show,
  handleClose,
}) => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [subSystemId, setSubSystemId] = useState<string>("subsys-" + uuidv4());
  const [systemNo, setSystemNo] = useState<string>("");
  const [systemId, setSystemId] = useState<string>("");
  const [subSystemNo, setSubSystemNo] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [systemData, setSystemData] = useState<SystemData | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<string>("");

  useEffect(() => {
    if (show) {
      fetchSystems();
    } else {
      resetFormFields();
    }
  }, [show]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent form submission from reloading the page
    const newSubSystemId = uuidv4();
    setSubSystemId("subsys-" + newSubSystemId);
    const mutation = `
      mutation createSubSystem(
        $subSystemId: String!,
        $subSystemNo: String!,
        $systemId: String!,
        $systemNo: String!,
        $description: String!
      ) {
        createSubSystem(
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
    const input = {
      subSystemId,
      subSystemNo,
      systemId,
      systemNo,
      description,
    };
    RequestGraphQL<SubSystemData>(mutation, input, (data: SubSystemData) => {
      console.log("System created:", data);
      resetFormFields();
      handleClose();
    });
  };

  const fetchSystems = () => {
    const query = `query GetSystem {
      systems {
        items {
          SystemId
          SystemNo
        }
      }
    }`;

    RequestGraphQL<SystemData>(query, {}, (data: SystemData) => {
      setSystemData(data);
    });
  };

  const resetFormFields = () => {
    setSystemNo("");
    setSystemId("");
    setSubSystemNo("");
    setDescription("");
    setSelectedSystem("");
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
          <Form.Group controlId="formSubSystemNo">
            <Form.Label>Sub System No</Form.Label>
            <Form.Control
              type="text"
              value={subSystemNo}
              onChange={(e) => setSubSystemNo(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formSystemDescription">
            <Form.Label>Sub System Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <br />
          <Stack direction="horizontal" gap={0}>
            {selectedSystem && (
              <Form.Group controlId="formSelectedSystem">
                <Form.Control type="text" value={selectedSystem} readOnly />
              </Form.Group>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Select System
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {systemData?.systems.items.map((system) => (
                  <Dropdown.Item
                    key={system.SystemId}
                    onClick={() => {
                      setSystemId(system.SystemId);
                      setSystemNo(system.SystemNo);
                      setSelectedSystem(system.SystemNo);
                    }}
                  >
                    {system.SystemNo}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
          <br />
          <Button variant="secondary" type="submit">
            Create Sub System
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CreateSubSystem;
