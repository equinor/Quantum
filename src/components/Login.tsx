import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { useIsAuthenticated } from "@azure/msal-react";
import Button from "react-bootstrap/esm/Button";
import { SystemData } from "../pages/system/SystemData";
import { useRequestGraphQL } from "../graphql/GetGraphQL";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package
 */

export const Login = () => {
  const { instance } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const { RequestGraphQL } = useRequestGraphQL();

  const fetchCommpkgData = () => {
    const query = `query GetSystem(){
      systems {
        items {
          SystemId
          SystemNo
        }
      }
    }`;

    RequestGraphQL<SystemData>(query, {}, (data: SystemData) => {
      console.log(data);
    });
  };

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
    fetchCommpkgData;
  };

  const handleLogout = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  return (
    <Button
      variant="outline-light"
      className="ml-auto"
      onClick={isAuthenticated ? handleLogout : handleLogin}
      title={isAuthenticated ? "Sign Out" : "Sign In"}
    >
      {isAuthenticated ? "Sign Out" : "Sign In"}
    </Button>
  );
};
