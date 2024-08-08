import "bootstrap/dist/css/bootstrap.css";
import NavbarComponent from "./components/navbar";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <NavbarComponent />
      <Home></Home>
      {/* App content goes here */}
    </div>
  );
};

export default App;
