import React, { useState } from "react";
import { CommpkgTable } from "./CommpkgTable";
import "../../App.css";
import { Button, Spinner, Stack } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { CommpkgData } from "./CommpkgData";
import { CommpkgAnalytics } from "./CommpkgAnalytics";

import CreateCommpkg from "./CreateCommpkg";

export const Commpkg: React.FC = () => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [commpkgData, setCommpkgData] = useState<CommpkgData | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [view, setView] = useState<string>("Table");
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const fetchCommpkgData = () => {
    const query = `query getData(){
  commpkgs() {
     items {
        CommpkgId
        CommpkgNo
        PlannedEnd
        ProjectMilestone
        Comment
        HandoverStatus
        PlannedStart
        ActualStart
        ActualEnd
        Responsible
        Progress
        Estimate
        Description
        SubSystemNo
        SubSystemId
        Identifier
        Phase
        CommStatus
        MCStatus
        SafetyMilestone
     }
  }
}`;

    const variables = {};

    setDisplay(true);
    RequestGraphQL<CommpkgData>(query, variables, (data: CommpkgData) => {
      setCommpkgData(data);
      setDisplay(false);
    });
  };

  const handleCreateShow = () => setShowCreate(true);
  const handleCreateClose = () => setShowCreate(false);

  return (
    <>
      <div className="center-content">
        <Stack direction="horizontal" gap={3}>
          <Button
            variant="outline-light"
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
              "Get Commpkgs"
            )}
          </Button>
          <Button variant="secondary" onClick={handleCreateShow}>
            Create Commpkg
          </Button>
          <div className="p-2"></div>
          <div className="p-2 ms-auto">
            <Button
              variant={view === "Table" ? "light" : "outline-light"}
              onClick={() => setView("Table")}
            >
              Table
            </Button>
            <Button
              variant={view === "Table" ? "outline-light" : "light"}
              onClick={() => setView("Analytics")}
            >
              Analytics
            </Button>
          </div>
        </Stack>
        {commpkgData ? (
          view === "Table" ? (
            <>
              <CommpkgTable commpkgs={commpkgData.commpkgs} />
            </>
          ) : (
            <>
              <CommpkgAnalytics commpkgs={commpkgData.commpkgs} />
            </>
          )
        ) : (
          <h1>Get Data</h1>
        )}
      </div>
      <CreateCommpkg
        show={showCreate}
        handleClose={handleCreateClose}
        selectedItem={null}
      />
    </>
  );
};

export default Commpkg;
