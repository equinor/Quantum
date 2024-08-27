import React, { useState } from "react";
import { Table, Stack, Card } from "react-bootstrap";
import SystemSidesheet from "./SystemSidesheet";
import { SystemItem, SystemData } from "./SystemData";

export const SystemTable: React.FC<SystemData> = (props) => {
  const system = props.systems.items;
  const systemCount = system.length;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<SystemItem | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (item: SystemItem) => {
    setSelectedItem(item);
    setShow(true);
  };

  return (
    <Stack>
      <Card data-bs-theme="dark" className="custom-card">
        <Card.Body>
          <Card.Title>Count</Card.Title>
          <Card.Text>{systemCount}</Card.Text>
        </Card.Body>
      </Card>

      <div className="table-responsive">
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th style={{ width: "200px" }}>System</th>
              <th style={{ width: "500px" }}>System Description</th>
              <th style={{ width: "200px" }}>SystemOwner</th>
              <th style={{ width: "200px" }}>Commissioning Lead</th>
              <th style={{ width: "200px" }}>Operation Responsible</th>
              <th style={{ width: "200px" }}>TI Responsible</th>
            </tr>
          </thead>
          <tbody>
            {system.map((item, i) => (
              <tr key={i} onClick={() => handleShow(item)}>
                <td>{item.SystemNo}</td>
                <td>{item.SystemDescription}</td>
                <td>{item.SystemOwner}</td>
                <td>{item.CommissioningLead}</td>
                <td>{item.OperationResponsible}</td>
                <td>{item.TechnicalIntegrityResponsible}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <SystemSidesheet
        show={show}
        handleClose={handleClose}
        selectedItem={selectedItem}
      />
    </Stack>
  );
};
