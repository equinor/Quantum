import React from "react";
//import { ProfileContent } from "../components/getData";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import "../App.css";

const Home: React.FC = () => {
  return (
    <>
      <div className="center-content">
        <AuthenticatedTemplate>
          <br />
          <br />
          <br />
          <br />
          <center>
            <h1> Welcome</h1>
            <br />
          </center>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <h5 className="dark-text">
            <div className="center-text">
              <br />
              <br />
              <br />
              <br />
              <center>
                <h1>Welcome to Quantum. A Fabric graphQL test</h1>
                <h2>Sign In to start</h2>
              </center>
            </div>
          </h5>
        </UnauthenticatedTemplate>
      </div>
    </>
  );
};

export default Home;
