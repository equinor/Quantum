import React, { useState } from "react";
import { CommpkgTable } from "./CommpkgTable";
import "../../App.css";
import { Button, Spinner, Form, InputGroup } from "react-bootstrap";
import { useRequestGraphQL } from "../../graphql/GetGraphQL";
import { CommpkgData } from "./CommpkgData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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
        filter: { Facility: { eq: $facility } Priority3:  {
           isNull: false
        } }
      ) {
        items {
          CommissioningPackageNo,
          Facility,
          Priority3,
          CommissioningPhase
          commissioningPackageMilestone(filter:  {
             Milestone:  {
                eq: "C-08"
             }
          } ) {
             items {
                ForecastDate
                PlannedDate
                ActualDate
                
             }
          }
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

  const transformData = (data: CommpkgData) => {
    const groupedData = data.commissioningPackages.items.reduce((acc, item) => {
      const priority = item.Priority3;
      if (!acc[priority]) {
        acc[priority] = 0;
      }
      acc[priority]++;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(groupedData).map((key) => ({
      Priority3: key,
      Commpkgs: groupedData[key],
    }));
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
          <>
            <BarChart
              width={600}
              height={300}
              data={transformData(commpkgData)}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Priority3" />
              <YAxis />
              <Tooltip />
              <Legend formatter={() => "Priority 3"} />
              <Bar dataKey="Commpkgs" fill="#8884d8" />
            </BarChart>
            <CommpkgTable
              commissioningPackages={commpkgData.commissioningPackages}
            />
          </>
        ) : (
          <h1>Get Data</h1>
        )}
      </div>
    </>
  );
};

export default Commpkg;
