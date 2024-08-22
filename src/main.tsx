import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "./authConfig";
import { HashRouter } from "react-router-dom";
// Bootstrap components
import "bootstrap/dist/css/bootstrap.min.css";

const msalInstance = new PublicClientApplication(msalConfig);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <MsalProvider instance={msalInstance}>
      <App />
    </MsalProvider>
  </HashRouter>
);
