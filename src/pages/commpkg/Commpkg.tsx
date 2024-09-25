import React, { useState } from "react";
import { CommpkgTable } from "./CommpkgTable";
import "../../App.css";
import { Button, Spinner, Stack, Dropdown } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { CommpkgData } from "./CommpkgData";
import { CommpkgAnalytics } from "./CommpkgAnalytics";
import { Facility as FacilityEnum } from "../../library/Facility";

export const Commpkg: React.FC = () => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [commpkgData, setCommpkgData] = useState<CommpkgData | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [facility, setFacility] = useState<FacilityEnum | "">(""); // Default to empty string
  const [view, setView] = useState<string>("Table");

  const fetchCommpkgData = () => {
    const query = `query getCommpkg($facility: String!) {
      commissioningPackages(
      first: 2000
        filter: { Facility: { eq: $facility } Priority3:  {
           isNull: false
        } }
      ) {
        items {
          CommissioningPackageNo,
          Description,
          Location,
          Status,
          Responsible,
          Priority1,
          Priority2,
          Priority3,
          CommissioningPhase,
          Facility
        }
      }
    }`;

    const variables = { facility };

    setDisplay(true);
    RequestGraphQL<CommpkgData>(query, variables, (data: CommpkgData) => {
      setCommpkgData(data);
      setDisplay(false);
    });
  };

  return (
    <>
      <div className="center-content">
        <Stack direction="horizontal" gap={3}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {facility || "Select Facility"}{" "}
              {/* Display the selected facility or hint */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.values(FacilityEnum).map((facility) => (
                <Dropdown.Item
                  key={facility}
                  onClick={() => setFacility(facility)}
                >
                  {facility}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
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
              <CommpkgTable
                commissioningPackages={commpkgData.commissioningPackages}
              />
            </>
          ) : (
            <>
              <CommpkgAnalytics
                commissioningPackages={commpkgData.commissioningPackages}
              />
            </>
          )
        ) : (
          <h1>Get Data</h1>
        )}
      </div>
    </>
  );
};

export default Commpkg;
