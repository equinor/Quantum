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
            <h1>
              {" "}
              Welcome to this GraphQL test, navigate to test different objects
            </h1>
          </center>
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <h5 className="dark-text">
            <div className="center-text">
              Welcome to GraphQL test, Sign in to test
            </div>
          </h5>
        </UnauthenticatedTemplate>
      </div>
    </>
  );
};

export default Home;
