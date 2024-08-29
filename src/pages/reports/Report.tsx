import React, { useEffect, useState } from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import { getAccessToken } from "../../GetAccessToken";
import "./Report.css";
import "../../App.css";

const Report: React.FC = () => {
  const [accessToken, setAccessToken] = useState<string>("");

  useEffect(() => {
    async function fetchAccessToken() {
      try {
        console.error("Getting accessToken");
        const token = await getAccessToken();
        setAccessToken(token);
      } catch (error) {
        console.error("Error fetching access token:", error);
      }
    }

    fetchAccessToken();
  }, []);

  return (
    <div className="report-container">
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          embedUrl:
            "https://app.powerbi.com/reportEmbed?reportId=4b5e6723-ffa5-42eb-83c6-95bd33fe9914&groupId=8de382f7-c5d4-413a-adb0-fbf34341d27e&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLU5PUlRILUVVUk9QRS1ILVBSSU1BUlktcmVkaXJlY3QuYW5hbHlzaXMud2luZG93cy5uZXQiLCJlbWJlZEZlYXR1cmVzIjp7InVzYWdlTWV0cmljc1ZOZXh0Ijp0cnVlfX0%3d",
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
        eventHandlers={
          new Map<string, (event?: any) => void>([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event) {
                console.log(event.detail);
              },
            ],
          ])
        }
        cssClassName={"Embed-container"}
        getEmbeddedComponent={(embeddedReport) => {
          (window as any).report = embeddedReport;
        }}
      />
    </div>
  );
};

export default Report;
