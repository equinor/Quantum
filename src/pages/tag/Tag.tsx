import React, { useState } from "react";
import { TagTable } from "./TagTable";
import "../../App.css";
import { Spinner, Stack } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { TagData } from "./TagData";
import CreateTag from "./CreateTag";
import { TagAnalytics } from "./TagAnalytics";
import { Button } from "@equinor/eds-core-react";

export const System: React.FC = () => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [TagData, setSystemData] = useState<TagData | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [showCreateSystem, setShowCreateTag] = useState<boolean>(false);
  const [view, setView] = useState<string>("Table");
  const fetchData = () => {
    const query = `query getTags(){
  tags(first: 10000) {
     items {
        TagId
        TagNo
        Description
        TagMountedOn
        Register
        Location
        Discipline
        Status
     }
  }
}`;

    setDisplay(true);
    RequestGraphQL<TagData>(query, {}, (data: TagData) => {
      setSystemData(data);
      setDisplay(false);
    });
  };

  const handleCreateTagClose = () => setShowCreateTag(false);
  const handleCreateTagShow = () => setShowCreateTag(true);

  return (
    <>
      <div className="center-content">
        <Stack direction="horizontal" gap={3}>
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
              "Get Tags"
            )}
          </Button>
          <Button onClick={handleCreateTagShow}>Create Tag</Button>
          <div className="p-2 ms-auto">
            <Button
              color={view === "Table" ? "primary" : "secondary"}
              onClick={() => setView("Table")}
            >
              Table
            </Button>
            <Button
              color={view === "Table" ? "secondary" : "primary"}
              onClick={() => setView("Analytics")}
            >
              Analytics
            </Button>
          </div>
        </Stack>

        {TagData ? (
          view === "Table" ? (
            <>
              <TagTable tags={TagData.tags} />
            </>
          ) : (
            <>
              <TagAnalytics tags={TagData.tags} />
            </>
          )
        ) : (
          <h1>Get Data</h1>
        )}
      </div>

      <CreateTag
        show={showCreateSystem}
        handleClose={handleCreateTagClose}
        fetchData={fetchData} // Pass the fetch function as a prop
        selectedItem={null}
      />
    </>
  );
};

export default System;
