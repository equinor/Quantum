import React from "react";
//import { ProfileContent } from "../components/getData";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { Commpkg } from "../commpkg/Commpkgs";
import "../App.css";

const Home: React.FC = () => {
  return (
    <>
      <div className="center-content">
        <AuthenticatedTemplate>
          <Commpkg />
        </AuthenticatedTemplate>
        <UnauthenticatedTemplate>
          <h5 className="dark-text">
            <div className="center-text">
              Welcome to GraphQL test, Sign in to try
            </div>
          </h5>
        </UnauthenticatedTemplate>
      </div>
    </>
  );
};

export default Home;
