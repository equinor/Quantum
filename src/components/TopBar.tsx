import React, { useEffect, useState } from "react";
import { Dropdown, Nav, Navbar, Spinner, Alert } from "react-bootstrap";
import { Login } from "./Login";
import "bootstrap/dist/css/bootstrap.css";
import { useIsAuthenticated } from "@azure/msal-react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { getAccessToken } from "../GetAccessToken";
import FusionIcon from "../../public/Fusion.svg";

type ReportData = {
  name: string;
  id: string;
  embedUrl: string;
};

const fetchReports = async (groupId: string, accessToken: string) => {
  const url = `https://api.powerbi.com/v1.0/myorg/groups/${groupId}/reports`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.value; // Assuming the API response has a 'value' property containing the reports
};

const TopBar: React.FC = () => {
  const isAuthenticated = useIsAuthenticated();
  const [reports, setReports] = useState<ReportData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAccessTokenAndReports = async () => {
    const groupId = "8de382f7-c5d4-413a-adb0-fbf34341d27e";
    try {
      console.log("Getting access token");
      const token = await getAccessToken();
      const reportsData = await fetchReports(groupId, token);
      setReports(reportsData);
    } catch (error) {
      console.error("Error fetching access token or reports:", error);
      setError("Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAccessTokenAndReports();
    }
  }, [isAuthenticated]);

  const handleSelectReport = (report: ReportData) => {
    navigate(`/report/${report.id}`, { state: { embedUrl: report.embedUrl } });
  };

  return (
    <Navbar bg="light" data-bs-theme="light" className="navbarStyle">
      <Navbar.Brand className="brand" as={Link} to="/">
        <img src={FusionIcon} alt="Fusion Icon" className="fusion-icon" />{" "}
        Quantum
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {isAuthenticated ? (
          <Nav className="mr-auto">
            <Dropdown className="dropdown-padding">
              <Dropdown.Toggle variant="outline" id="dropdown-search">
                Search
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/System">
                  System
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/SubSystem">
                  Sub System
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/Commpkg">
                  Commpkg
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/Tag">
                  Tag
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/Checklist">
                  Checklist
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown className="dropdown-padding">
              <Dropdown.Toggle variant="outline" id="dropdown-basic">
                Report
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {loading ? (
                  <Spinner animation="border" />
                ) : error ? (
                  <Alert variant="danger">{error}</Alert>
                ) : (
                  reports.map((report) => (
                    <Dropdown.Item
                      key={report.id}
                      onClick={() => handleSelectReport(report)}
                    >
                      {report.name}
                    </Dropdown.Item>
                  ))
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        ) : (
          <></>
        )}
        <Nav className="justify-content-end flex-grow-1 pe-3">
          <Login />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopBar;
