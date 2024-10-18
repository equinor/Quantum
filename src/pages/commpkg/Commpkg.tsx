import React, { useState } from "react";
import { CommpkgTable } from "./CommpkgTable";

import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { CommpkgData, getCommpkg } from "./CommpkgData";
import { CommpkgAnalytics } from "./CommpkgAnalytics";
import { CommpkgGantt } from "./CommpkgGantt";
import { StarProgress } from "@equinor/eds-core-react";
import CreateCommpkg from "./CreateCommpkg";
import CommpkgSidebar from "./CommpkgSidebar";
//import CommpkgSidebar from "./CommpkgSidebar";

export const Commpkg: React.FC = () => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [commpkgData, setCommpkgData] = useState<CommpkgData | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [view, setView] = useState<string>("Table");
  const [showCreate, setShowCreate] = useState<boolean>(false);

  const fetchCommpkgData = () => {
    const query = getCommpkg;

    const variables = {};

    setDisplay(true);
    RequestGraphQL<CommpkgData>(query, variables, (data: CommpkgData) => {
      setCommpkgData(data);
      setDisplay(false);
    });
  };

  const handleCreate = () => setShowCreate(!showCreate);

  return (
    <>
      <div id="content-container">
        <div id="sidebar">
          <CommpkgSidebar
            fetchData={fetchCommpkgData}
            handleCreate={handleCreate}
            selected={view}
            setSelected={setView}
          />
        </div>
        <div id="main-content">
          {!display && commpkgData ? (
            view === "gantt" ? (
              <CommpkgGantt commpkgs={commpkgData.commpkgs} />
            ) : view === "analytics" ? (
              <CommpkgAnalytics commpkgs={commpkgData.commpkgs} />
            ) : (
              <CommpkgTable commpkgs={commpkgData.commpkgs} />
            )
          ) : (
            !display && <h1>Get Data</h1>
          )}
          {display && (
            <div>
              <br />
              <br />
              <br />
              <br />
              <center>
                <StarProgress size={48} />
              </center>
            </div>
          )}
        </div>
      </div>
      <CreateCommpkg
        show={showCreate}
        handleClose={handleCreate}
        selectedItem={null}
      />
    </>
  );
};

export default Commpkg;
