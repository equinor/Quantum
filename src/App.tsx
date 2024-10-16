import "bootstrap/dist/css/bootstrap.css";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

import { Commpkg } from "./pages/commpkg/Commpkg";
import System from "./pages/system/System";
import Report from "./pages/reports/Report";
import SubSystem from "./pages/subsystem/SubSystem";
import Tag from "./pages/tag/Tag";
import Checklist from "./pages/checklist/Checklist";

const App: React.FC = () => {
  return (
    <div id="page-container" style={{ height: "100vh", width: "100vw" }}>
      <TopBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Commpkg" Component={Commpkg} />
        <Route path="/Checklist" Component={Checklist} />
        <Route path="/System" Component={System} />
        <Route path="/SubSystem" Component={SubSystem} />
        <Route path="/Tag" Component={Tag} />
        <Route path="/Report/:id" Component={Report} />
      </Routes>

      {/* App content goes here */}
    </div>
  );
};

export default App;
