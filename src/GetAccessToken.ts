import {
  InteractionRequiredAuthError,
  PublicClientApplication,
} from "@azure/msal-browser";
import { msalConfig, loginRequest } from "./authConfig"; // Adjust the import path as needed

const msalInstance = new PublicClientApplication(msalConfig);

export async function getAccessToken() {
  try {
    // Ensure MSAL instance is initialized
    await msalInstance.initialize();

    const account = msalInstance.getAllAccounts()[0];
    if (!account) {
      throw new Error("No accounts found. Please log in.");
    }

    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: account,
    });

    return response.accessToken;
  } catch (error) {
    if (error instanceof InteractionRequiredAuthError) {
      const response = await msalInstance.acquireTokenPopup(loginRequest);
      return response.accessToken;
    } else {
      console.error(error);
      throw error;
    }
  }
}

getAccessToken()
  .then((token) => {
    console.log("Access Token:", token);
  })
  .catch((error) => {
    console.error("Error getting access token:", error);
  });
