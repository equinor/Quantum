import React, { useState } from "react";
import { CommpkgTable } from "./ChecklistTable";
import "../../App.css";
import { Button, Spinner, Stack, Dropdown } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { ChecklistData } from "./ChecklistData";
import { Analytics } from "./ChecklistAnalytics";
import { Facility as FacilityEnum } from "../../library/Facility";

export const Checklist: React.FC = () => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [checklistData, setChecklistData] = useState<ChecklistData | null>(
    null
  );
  const [display, setDisplay] = useState<boolean>(false);
  const [facility, setFacility] = useState<FacilityEnum | "">(""); // Default to empty string
  const [view, setView] = useState<string>("Table");

  const fetchData = () => {
    const query = `query getData($facility: String!){
  checklists(first: 20000
  filter:  {
     Facility:  {
        eq: $facility
     }
  }) {
     items {
        ChecklistId
        SignedDate
        VerifiedDate
        HandoverPlan
        FormType
        FormGroup
        FormDiscipline
        TagNo
        TagId
        Facility
        Project
        FormResponsible
        Status
        
     }
  }
}`;

    const variables = { facility };

    setDisplay(true);
    RequestGraphQL<ChecklistData>(query, variables, (data: ChecklistData) => {
      setChecklistData(data);
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
            onClick={fetchData}
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
              "Get Checklists"
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
        {checklistData ? (
          view === "Table" ? (
            <>
              <CommpkgTable checklists={checklistData.checklists} />
            </>
          ) : (
            <>
              <Analytics checklists={checklistData.checklists} />
            </>
          )
        ) : (
          <h1>Get Data</h1>
        )}
      </div>
    </>
  );
};

export default Checklist;
