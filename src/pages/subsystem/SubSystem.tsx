import React, { useState } from "react";
import { SubSystemTable } from "./SubSystemTable";
import "../../App.css";
import { Spinner } from "react-bootstrap";
import { Button } from "@equinor/eds-core-react";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { SubSystemData } from "./SubSystemData";
import CreateSubSystem from "./CreateSubSystem";

export const System: React.FC = () => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [subSystemmData, setSubSystemData] = useState<SubSystemData | null>(
    null
  );
  const [display, setDisplay] = useState<boolean>(false);
  const [showCreateSystem, setShowCreateSystem] = useState<boolean>(false);

  const fetchData = () => {
    const query = `
     query GetSubSystem() {
    subSystems() {
       items {
        SubSystemNo
        SubSystemId
          SystemNo
          Description
        
       }
    }
  }`;

    setDisplay(true);
    RequestGraphQL<SubSystemData>(query, {}, (data: SubSystemData) => {
      setSubSystemData(data);
      console.log(subSystemmData);
      setDisplay(false);
    });
  };

  const handleCreateSystemClose = () => setShowCreateSystem(false);
  const handleCreateSystemShow = () => setShowCreateSystem(true);

  return (
    <>
      <div className="center-content">
        <Button onClick={fetchData} disabled={display}>
          {display ? (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            "Get Sub Systems"
          )}
        </Button>
        <Button onClick={handleCreateSystemShow}>Create Sub System</Button>
        {subSystemmData ? (
          <SubSystemTable subSystems={subSystemmData.subSystems} />
        ) : (
          <h1>No Data to display</h1>
        )}
      </div>
      <CreateSubSystem
        show={showCreateSystem}
        handleClose={handleCreateSystemClose}
        selectedItem={null}
      />
    </>
  );
};

export default System;
