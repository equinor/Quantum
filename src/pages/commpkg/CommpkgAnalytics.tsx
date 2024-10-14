import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { CommpkgData } from "./CommpkgData";
import { AgChartOptions } from "ag-charts-community";

export const CommpkgAnalytics: React.FC<CommpkgData> = (props) => {
  const commpkgs = props.commpkgs?.items || [];

  // Transform the data to count occurrences of each SafetyMilestone value
  const transformedData = commpkgs.reduce((acc, pkg) => {
    if (pkg.SafetyMilestone !== null) {
      const found = acc.find(
        (item) => item.SafetyMilestone === pkg.SafetyMilestone
      );
      if (found) {
        found.count += 1;
      } else {
        acc.push({ SafetyMilestone: pkg.SafetyMilestone, count: 1 });
      }
    }
    return acc;
  }, [] as { SafetyMilestone: string; count: number }[]);

  const [chartOptions, setChartOptions] = useState<AgChartOptions>({
    theme: {
      baseTheme: "ag-default-dark", // Set the base theme to dark
    },
    data: transformedData,
    series: [
      {
        type: "bar",
        xKey: "SafetyMilestone",
        yKey: "count",
        yName: "Count",
        label: {
          enabled: true,
          formatter: (params) => {
            // Format labels as ### ###
            return params.value
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          },
          color: "#FFFFFF",
          placement: "outside",
        },
      },
    ],
  });

  useEffect(() => {
    const newTransformedData = commpkgs.reduce((acc, pkg) => {
      if (pkg.SafetyMilestone !== null) {
        const found = acc.find(
          (item) => item.SafetyMilestone === pkg.SafetyMilestone
        );
        if (found) {
          found.count += 1;
        } else {
          acc.push({ SafetyMilestone: pkg.SafetyMilestone, count: 1 });
        }
      }
      return acc;
    }, [] as { SafetyMilestone: string; count: number }[]);

    setChartOptions((prevOptions) => ({
      ...prevOptions,
      data: newTransformedData,
    }));
  }, [commpkgs]);

  return (
    <div className="ag-theme-quartz-dark" style={{ height: "80vh" }}>
      <AgCharts
        options={chartOptions}
        className="chart"
        style={{ width: "100%", height: "80vh" }}
      />
    </div>
  );
};
