import React from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import "./CommpkgAnalytics.css"; // Import the CSS file

interface CommpkgData {
  commissioningPackages: {
    items: {
      Priority3: string;
    }[];
  };
}

const CommpkgAnalytics: React.FC<{ commpkgData: CommpkgData }> = ({
  commpkgData,
}) => {
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
    <div className="chart-container">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={transformData(commpkgData)}>
          <XAxis dataKey="Priority3" tick={{ fill: "white" }} />
          <YAxis tick={{ fill: "white" }} />
          <Tooltip />
          <Legend formatter={() => "Priority 3"} />
          <Bar dataKey="Commpkgs" fill="#8884d8">
            <LabelList dataKey="Commpkgs" position="top" fill="white" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommpkgAnalytics;
