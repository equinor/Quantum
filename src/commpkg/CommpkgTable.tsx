import React from "react";
import { Table, Stack, Card } from "react-bootstrap";

interface ProfileDataProps {
  graphqlData: {
    data: {
      commissioningPackages: {
        items: {
          CommissioningPackageNo: string;
          Facility: string;
          Priority3: string;
          CommissioningPhase: string;
        }[];
      };
    };
  };
}

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
export const ProfileData: React.FC<ProfileDataProps> = (props) => {
  const holidays = props.graphqlData.data.commissioningPackages.items;
  const commpkgCount = holidays.length;
  return (
    <Stack>
      <div>
        <Card data-bs-theme="dark">
          <Card.Body>
            <Card.Title>Count</Card.Title>
            <Card.Text>{commpkgCount}</Card.Text>
          </Card.Body>
        </Card>
      </div>

      <Table striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Commpkg</th>
            <th>Facility</th>
            <th>Safety Milestone</th>
            <th>Phase</th>
          </tr>
        </thead>
        <tbody>
          {holidays.map((item, i) => (
            <tr key={i}>
              <td>{item.CommissioningPackageNo}</td>
              <td>{item.Facility}</td>
              <td>{item.Priority3}</td>
              <td>{item.CommissioningPhase}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Stack>
  );
};
