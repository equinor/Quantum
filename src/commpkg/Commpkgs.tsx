import React, { useState } from "react";
import { loginRequest, graphqlConfig } from "../authConfig";
import { ProfileData } from "./CommpkgTable";
import { useMsal } from "@azure/msal-react";
import "../App.css";
import { Button, Spinner, Form, InputGroup } from "react-bootstrap";
import { CommpkgData } from "./CommpkgData";

interface GraphQLResponse {
  accessToken: string;
}

export const Commpkg: React.FC = () => {
  const { instance, accounts } = useMsal();
  const [commpkgData, setCommpkgData] = useState<CommpkgData | null>(null);
  const [display, setDisplay] = useState<boolean>(false);
  const [limit, setLimit] = useState(10);
  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(event.target.value, 10);
    if (!isNaN(val)) {
      setLimit(val);
    } else {
      setLimit(0); // or handle the invalid input case as needed
    }
  };

  function RequestGraphQL(): void {
    // Silently acquires an access token which is then attached to a request for GraphQL data
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response: GraphQLResponse) => {
        callGraphQL(response.accessToken).then((data: CommpkgData) =>
          setCommpkgData(data)
        );
      })
      .catch((error) => {
        console.error("Error acquiring token silently:", error);
      });
  }

  async function callGraphQL(accessToken: string): Promise<CommpkgData> {
    setDisplay(true);
    const query = `query  getCommpkg($limit: Int!){
        commissioningPackages(
          first: $limit,
          orderBy: { Priority3: DESC },
          filter: { Facility: { eq: "JCA" } }
        ) {
          items {
            CommissioningPackageNo,
            Facility,
            Priority3,
            CommissioningPhase
          }
        }
      }`;

    try {
      const response = await fetch(graphqlConfig.graphqlEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ query, variables: { limit } }),
      });

      const result = await response.json();
      return result as CommpkgData;
    } catch (error) {
      console.error("Error fetching GraphQL data:", error);
      throw error;
    }
  }

  return (
    <>
      <InputGroup className="input" size="sm">
        <InputGroup.Text id="inputGroup-sizing-sm" data-bs-theme="dark">
          Set count
        </InputGroup.Text>
        <Form.Control
          data-bs-theme="dark"
          className="form-control"
          aria-label="count"
          aria-describedby="inputGroup-sizing-sm"
          value={limit}
          onChange={inputChange}
        />
      </InputGroup>
      {commpkgData ? (
        <ProfileData graphqlData={commpkgData} />
      ) : (
        <div className="get-commpkg">
          <Button variant="secondary" onClick={RequestGraphQL}>
            Get Commpkgs
            {display ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : null}
          </Button>
        </div>
      )}
    </>
  );
};
