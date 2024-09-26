import React, { useState, useEffect } from "react";
import { Offcanvas, Form, Button, Dropdown, Stack } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { v4 as uuidv4 } from "uuid";
import { CommpkgData, CommpkgItem } from "./CommpkgData";
import { SubSystemData } from "../subsystem/SubSystemData";

interface CreateSubSystemProps {
  show: boolean;
  handleClose: () => void;
  selectedItem: CommpkgItem | null;
}

const CreateCommpkg: React.FC<CreateSubSystemProps> = ({
  show,
  handleClose,
}) => {
  const { RequestGraphQL } = useRequestGraphQL();

  //const [commpkgId, setCommpkgId] = useState<string>("comm-");
  const [formData, setFormData] = useState({
    commpkgId: "comm-" + uuidv4(),
    commpkgNo: "",
    subSystemId: "",
    subSystemNo: "",
    projectMilestone: "",
    comment: "",
    handoverStatus: "",
    plannedStart: "",
    plannedEnd: "",
    actualEnd: "",
    actualStart: "",
    responsible: "",
    progress: "",
    estimate: "",
    description: "",
    identifier: "",
    phase: "",
    commStatus: "",
    mCStatus: "",
    safetyMilestone: "",
  });
  const [subSystem, setSubSystem] = useState<SubSystemData | null>(null);

  useEffect(() => {
    if (show) {
      fetchSubSystems();
      console.log("Show:true");
    } else {
      console.log("Show:false");
      // resetFormFields();
    }
  }, [show]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newCommpkgId = "comm-" + uuidv4();
    setFormData((prevData) => ({
      ...prevData,
      commpkgId: newCommpkgId,
    }));
    console.log("Commpkg created:", formData);
    const mutation = `
      mutation createCommpkg(
        $commpkgId: String!,
        $commpkgNo: String!,
        $subSystemId: String!,
        $subSystemNo: String!,
      ) {
        createCommpkg(
          item: {
            CommpkgId: $commpkgId
            CommpkgNo: $commpkgNo
            SubSystemId: $subSystemId
            SubSystemNo: $subSystemNo
          }
        ) {
          result
        }
      }
    `;
    const input = {
      commpkgId: formData.commpkgId,
      commpkgNo: formData.commpkgNo,
      subSystemId: formData.subSystemId,
      subSystemNo: formData.subSystemNo,
      // projectMilestone: formData.projectMilestone,
      // comment: formData.comment,
      // handoverStatus: formData.handoverStatus,
      // plannedStart: formData.plannedStart,
      // plannedEnd: formData.plannedEnd,
      // actualEnd: formData.actualEnd,
      // actualStart: formData.actualStart,
      // responsible: formData.responsible,
      // progress: formData.progress,
      // estimate: formData.estimate,
      // description: formData.description,
      // identifier: formData.identifier,
      // phase: formData.phase,
      // commStatus: formData.commStatus,
      // mCStatus: formData.mCStatus,
      // safetyMilestone: formData.safetyMilestone,
    };
    RequestGraphQL<CommpkgData>(mutation, input, (data: CommpkgData) => {
      console.log("Commpkg created:", data);
      handleClose();
      resetFormFields();
    });
  };

  const fetchSubSystems = () => {
    const query = `    
    query GetSubSystem() {
    subSystems() {
       items {
        SubSystemNo
        SubSystemId
        SystemNo
       }
    }
  }`;

    RequestGraphQL<SubSystemData>(query, {}, (data: SubSystemData) => {
      setSubSystem(data);
    });
  };

  const resetFormFields = () => {
    //setCommpkgId("");
    setFormData({
      commpkgId: "comm-",
      commpkgNo: "",
      subSystemId: "",
      subSystemNo: "",
      projectMilestone: "",
      comment: "",
      handoverStatus: "",
      plannedStart: "",
      plannedEnd: "",
      actualEnd: "",
      actualStart: "",
      responsible: "",
      progress: "",
      estimate: "",
      description: "",
      identifier: "",
      phase: "",
      commStatus: "",
      mCStatus: "",
      safetyMilestone: "",
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
        <Offcanvas.Title>Create New Commpkg</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ backgroundColor: "#323539", color: "#ffffff" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formSubSystemNo">
            <Form.Label>Commpkg No</Form.Label>
            <Form.Control
              type="text"
              value={formData.commpkgNo}
              onChange={(e) =>
                setFormData({ ...formData, commpkgNo: e.target.value })
              }
              required
            />
          </Form.Group>
          <Form.Group controlId="formSystemDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </Form.Group>
          <br />
          <Stack direction="horizontal" gap={0}>
            {formData.subSystemNo && (
              <Form.Group controlId="formSelectedSystem">
                <Form.Control
                  type="text"
                  value={formData.subSystemNo}
                  readOnly
                />
              </Form.Group>
            )}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Select System
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {subSystem?.subSystems.items.map((subsystem) => (
                  <Dropdown.Item
                    key={subsystem.SubSystemId}
                    onClick={() => {
                      setFormData({
                        ...formData,
                        subSystemId: subsystem.SubSystemId,
                        subSystemNo: subsystem.SubSystemNo,
                      });
                    }}
                  >
                    {subsystem.SystemNo + subsystem.SubSystemNo}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Stack>
          <br />
          <Button variant="secondary" type="submit">
            Create Commpkg
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default CreateCommpkg;
