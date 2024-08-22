import React, { useState } from "react";
import { SystemTable } from "./SystemTable";
import "../../App.css";
import { Button, Spinner } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { SystemData } from "./SystemData";
import CreateSystem from "./CreateSystem";

export const System: React.FC = () => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [SystemData, setSystemData] = useState<SystemData | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [showCreateSystem, setShowCreateSystem] = useState<boolean>(false);

  const fetchCommpkgData = () => {
    const query = `query GetSystem(){
      systems {
        items {
          SystemId
          SystemNo
          SystemDescription
          CommissioningLead
          SystemOwner
          TechnicalIntegrityResponsible
          OperationResponsible
        }
      }
    }`;

    setDisplay(true);
    RequestGraphQL<SystemData>(query, {}, (data: SystemData) => {
      setSystemData(data);
      setDisplay(false);
    });
  };

  const handleCreateSystemClose = () => setShowCreateSystem(false);
  const handleCreateSystemShow = () => setShowCreateSystem(true);

  return (
    <>
      <div className="center-content">
        <Button
          variant="secondary"
          onClick={fetchCommpkgData}
          disabled={display}
        >
          {display ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Get Systems"
          )}
        </Button>
        <Button variant="secondary" onClick={handleCreateSystemShow}>
          Create System
        </Button>
        {SystemData ? (
          <SystemTable graphqlData={{ data: SystemData }} />
        ) : (
          <h1>No Data to display</h1>
        )}
      </div>
      <CreateSystem
        show={showCreateSystem}
        handleClose={handleCreateSystemClose}
        selectedItem={null}
      />
    </>
  );
};

export default System;
