import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

import Button from "react-bootstrap/esm/Button";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 * Note the [useMsal] package
 */

export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {
      console.log(e);
    });
  };
  return (
    <Button
      variant="outline-light"
      className="ml-auto"
      onClick={() => handleLogin()}
      title="Sign In"
    >
      Sign In
    </Button>
  );
};
