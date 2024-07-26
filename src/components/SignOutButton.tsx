import { useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/esm/Button";

/**
 * Renders a sign out button 
 */
export const SignOutButton = () => {
  const { instance } = useMsal();

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
      onClick={() => handleLogout()}
    >
      Sign out
    </Button>
  );
};