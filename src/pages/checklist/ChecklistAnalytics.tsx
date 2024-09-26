import { ChecklistData } from "./ChecklistData";

import React, { useState, useEffect } from "react";
import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";
import { getISOWeek, getYear } from "date-fns";

export const Analytics: React.FC<ChecklistData> = (props) => {
  const checklist = props.checklists?.items || [];

  // Transform the data to count occurrences of each SignedDate and HandoverPlan value
  const transformedData = checklist.reduce((acc, pkg) => {
    const signedWeekYear = `${getISOWeek(new Date(pkg.SignedDate))}-${getYear(
      new Date(pkg.SignedDate)
    )}`;
    const handoverWeekYear = `${getISOWeek(
      new Date(pkg.HandoverPlan)
    )}-${getYear(new Date(pkg.HandoverPlan))}`;

    const signedFound = acc.find((item) => item.Signed === signedWeekYear);
    if (signedFound) {
      signedFound.signedCount += 1;
    } else {
      acc.push({ Signed: signedWeekYear, signedCount: 1, handoverCount: 0 });
    }

    const handoverFound = acc.find((item) => item.Signed === handoverWeekYear);
    if (handoverFound) {
      handoverFound.handoverCount += 1;
    } else {
      acc.push({ Signed: handoverWeekYear, signedCount: 0, handoverCount: 1 });
    }

    return acc;
  }, [] as { Signed: string; signedCount: number; handoverCount: number }[]);

  // Sort the transformed data by week-year
  transformedData.sort((a, b) => {
    const [weekA, yearA] = a.Signed.split("-").map(Number);
    const [weekB, yearB] = b.Signed.split("-").map(Number);
    return yearA - yearB || weekA - weekB;
  });

  const [chartOptions, setChartOptions] = useState<AgChartOptions>({
    theme: {
      baseTheme: "ag-default-dark", // Set the base theme to dark
    },
    data: transformedData,
    series: [
      {
        type: "bar",
        xKey: "Signed",
        yKey: "signedCount",
        yName: "Signed Count",
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
      {
        type: "bar",
        xKey: "Signed",
        yKey: "handoverCount",
        yName: "Handover Count",
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
    const newTransformedData = checklist.reduce((acc, pkg) => {
      const signedWeekYear = `${getISOWeek(new Date(pkg.SignedDate))}-${getYear(
        new Date(pkg.SignedDate)
      )}`;
      const handoverWeekYear = `${getISOWeek(
        new Date(pkg.HandoverPlan)
      )}-${getYear(new Date(pkg.HandoverPlan))}`;

      const signedFound = acc.find((item) => item.Signed === signedWeekYear);
      if (signedFound) {
        signedFound.signedCount += 1;
      } else {
        acc.push({ Signed: signedWeekYear, signedCount: 1, handoverCount: 0 });
      }

      const handoverFound = acc.find(
        (item) => item.Signed === handoverWeekYear
      );
      if (handoverFound) {
        handoverFound.handoverCount += 1;
      } else {
        acc.push({
          Signed: handoverWeekYear,
          signedCount: 0,
          handoverCount: 1,
        });
      }

      return acc;
    }, [] as { Signed: string; signedCount: number; handoverCount: number }[]);

    // Sort the new transformed data by week-year
    newTransformedData.sort((a, b) => {
      const [weekA, yearA] = a.Signed.split("-").map(Number);
      const [weekB, yearB] = b.Signed.split("-").map(Number);
      return yearA - yearB || weekA - weekB;
    });

    setChartOptions((prevOptions) => ({
      ...prevOptions,
      data: newTransformedData,
    }));
  }, [checklist]);

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
