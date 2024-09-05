import React, { useEffect, useState } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { getAccessToken } from "../../GetAccessToken";
import "./Report.css";
import "../../App.css";
import { useLocation } from "react-router-dom";
import { Stack, Spinner, Alert } from "react-bootstrap";
import ReportMenu from "./ReportMenu";

const Report: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const embedUrl = location.state?.embedUrl || "";

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        console.log("Getting access token");
        const token = await getAccessToken();
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching access token:", error);
        setError("Failed to fetch access token.");
      } finally {
        setLoading(false);
      }
    }

    fetchAccessToken();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div id="report-container">
      <Stack>
        <ReportMenu />
        {embedUrl ? (
          <PowerBIEmbed
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual and qna
              embedUrl: embedUrl,
              accessToken: accessToken,
              tokenType: models.TokenType.Aad,
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                  pageNavigation: {
                    visible: true,
                    position: models.PageNavigationPosition.Left,
                  },
                },
              },
            }}
            cssClassName={"Embed-container"}
            getEmbeddedComponent={(embed) => {
              embed.on("loaded", () => {});
            }}
          />
        ) : (
          <Alert variant="warning">No report URL provided.</Alert>
        )}
      </Stack>
    </div>
  );
};

export default Report;
