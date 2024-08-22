import React, { useState } from "react";
import { CommpkgTable } from "./CommpkgTable";
import "../App.css";
import { Button, Spinner, Form, InputGroup } from "react-bootstrap";
import { useRequestGraphQL } from "../graphql/GetGraphQL";
import { CommpkgData } from "./CommpkgData";

export const Commpkg: React.FC = () => {
  const { RequestGraphQL } = useRequestGraphQL();
  const [commpkgData, setCommpkgData] = useState<CommpkgData | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [facility, setFacility] = useState<string>("JCA");

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setFacility(val);
  };

  const fetchCommpkgData = () => {
    const query = `query getCommpkg($facility: String!) {
      commissioningPackages(
        filter: { Facility: { eq: $facility } }
      ) {
        items {
          CommissioningPackageNo,
          Facility,
          Priority3,
          CommissioningPhase
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
        <InputGroup className="input" size="sm" style={{ width: "300px" }}>
          <InputGroup.Text id="inputGroup-sizing-sm" data-bs-theme="dark">
            Set Facility
          </InputGroup.Text>
          <Form.Control
            data-bs-theme="dark"
            className="form-control"
            aria-label="count"
            aria-describedby="inputGroup-sizing-sm"
            value={facility}
            onChange={inputChange}
          />
        </InputGroup>

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
            "Get Commpkgs"
          )}
        </Button>
        {commpkgData ? (
          <CommpkgTable graphqlData={{ data: commpkgData }} />
        ) : (
          <h1>Get Data</h1>
        )}
      </div>
    </>
  );
};

export default Commpkg;
