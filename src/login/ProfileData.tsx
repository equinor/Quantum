import React from "react";
import Table from 'react-bootstrap/Table';

interface CommissioningPackage {
  CommissioningPackageNo: string;
  Facility: string;
  Priority3: string;
  CommissioningPhase: string;
}

interface ProfileDataProps {
  graphqlData: {
    data: {
      commissioningPackages: {
        items: CommissioningPackage[];
      };
    };
  };
}

export const ProfileData: React.FC<ProfileDataProps> = ({ graphqlData }) => {
  const holidays = graphqlData.data.commissioningPackages.items;
  const commpkgCount = holidays.length;

  return (
    <Table striped bordered hover responsive>
      <h3>total: {commpkgCount}</h3>
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
  );
};

export default ProfileData;
