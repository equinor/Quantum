import "bootstrap/dist/css/bootstrap.css";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

import { Commpkg } from "./pages/commpkg/Commpkgs";
import System from "./pages/system/System";

const App: React.FC = () => {
  return (
    <div className="app" style={{ height: "100vh", width: "100vw" }}>
      <TopBar />
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Commpkg" Component={Commpkg} />
        <Route path="/System" Component={System} />
      </Routes>

      {/* App content goes here */}
    </div>
  );
};

export default App;
