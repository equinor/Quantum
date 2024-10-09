import React from "react";
import { CommpkgData } from "./CommpkgData";
import { Chart } from "react-google-charts";

export const CommpkgGantt: React.FC<CommpkgData> = (props) => {
  const commpkgs = props.commpkgs?.items || [];

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percent Complete" },
    { type: "string", label: "Dependencies" },
  ];

  const rows = commpkgs.map((pkg) => [
    pkg.CommpkgId,
    pkg.CommpkgNo,
    new Date(pkg.PlannedStart),
    new Date(pkg.PlannedEnd),
    null, // Duration can be calculated if needed
    pkg.Progress,
    "", // Dependencies can be added if available
  ]);

  const data = [columns, ...rows];
  const options = {
    gantt: {
      criticalPathEnabled: false,
      innerGridHorizLine: {
        stroke: "#ffe0b2",
        strokeWidth: 2,
      },
      innerGridTrack: { fill: "#fff3e0" },
      innerGridDarkTrack: { fill: "#ffcc80" },
    },
    height: 900,
    backgroundColor: { fill: "#323539" },
  };

  return (
    <div className="p-3">
      <Chart chartType="Gantt" data={data} options={{ options }} />
    </div>
  );
};
