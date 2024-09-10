import React from "react";
import { Button, Stack } from "react-bootstrap";

const ReportMenu: React.FC = () => {
  async function printReport() {
    console.log("print report");
  }

  return (
    <div className="report-menu">
      <Stack direction="horizontal" gap={3}>
        <h2>Managment</h2>
        <Button variant="outline-light" onClick={printReport}>
          Print
        </Button>
      </Stack>
    </div>
  );
};

export default ReportMenu;
