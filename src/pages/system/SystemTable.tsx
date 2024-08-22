import React, { useState } from "react";
import { Table, Stack, Card } from "react-bootstrap";
import SystemSidesheet from "./SystemSidesheet";

interface System {
  SystemId: string;
  SystemNo: string;
  SystemDescription: string;
  CommissioningLead: string;
  SystemOwner: string;
  TechnicalIntegrityResponsible: string;
  OperationResponsible: string;
}

interface SystemData {
  graphqlData: {
    data: {
      systems: {
        items: System[];
      };
    };
  };
}

export const SystemTable: React.FC<SystemData> = (props) => {
  const commpkgs = props.graphqlData.data.systems.items;
  const commpkgCount = commpkgs.length;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<System | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (item: System) => {
    setSelectedItem(item);
    setShow(true);
  };

  return (
    <Stack>
      <Card data-bs-theme="dark" className="custom-card">
        <Card.Body>
          <Card.Title>Count</Card.Title>
          <Card.Text>{commpkgCount}</Card.Text>
        </Card.Body>
      </Card>

      <div className="table-responsive">
        <Table striped bordered hover responsive variant="dark">
          <thead>
            <tr>
              <th style={{ width: "20%" }}>SystemId</th>
              <th style={{ width: "20%" }}>SystemNo</th>
              <th style={{ width: "30%" }}>SystemDescription</th>
              <th style={{ width: "30%" }}>SystemOwner</th>
            </tr>
          </thead>
          <tbody>
            {commpkgs.map((item, i) => (
              <tr key={i} onClick={() => handleShow(item)}>
                <td>{item.SystemId}</td>
                <td>{item.SystemNo}</td>
                <td>{item.SystemDescription}</td>
                <td>{item.SystemOwner}</td>
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
