import React, { useState } from "react";
import { Table, Stack, Card } from "react-bootstrap";
import CommpkgSideSheet from "./CommpkgSideheet";
import { CommpkgItem, CommpkgData } from "./CommpkgData";

export const CommpkgTable: React.FC<CommpkgData> = (props) => {
  const commpkgs = props.commissioningPackages.items;
  const commpkgCount = commpkgs.length;

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CommpkgItem | null>(null);

  const handleClose = () => setShow(false);
  const handleShow = (item: CommpkgItem) => {
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
              <th style={{ width: "20%" }}>Commpkg</th>
              <th style={{ width: "20%" }}>Facility</th>
              <th style={{ width: "30%" }}>Safety Milestone</th>
              <th style={{ width: "30%" }}>Phase</th>
            </tr>
          </thead>
          <tbody>
            {commpkgs.map((item, i) => (
              <tr key={i} onClick={() => handleShow(item)}>
                <td>{item.CommissioningPackageNo}</td>
                <td>{item.Facility}</td>
                <td>{item.Priority3}</td>
                <td>{item.CommissioningPhase}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <CommpkgSideSheet
        show={show}
        handleClose={handleClose}
        selectedItem={selectedItem}
      />
    </Stack>
  );
};
