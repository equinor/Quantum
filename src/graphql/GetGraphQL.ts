import { loginRequest, graphqlConfig } from "../authConfig";
import { useMsal } from "@azure/msal-react";

export function useRequestGraphQL() {
  const { instance, accounts } = useMsal();

  const RequestGraphQL = async <T>(
    query: string,
    variables: Record<string, unknown>,
    setData: (data: T) => void
  ): Promise<void> => {
    try {
      // Silently acquires an access token which is then attached to a request for GraphQL data
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });

      const data = await callGraphQL<T>(response.accessToken, query, variables);
      setData(data);
    } catch (error) {
      console.error("Error acquiring token silently:", error);
    }
  };

  return { RequestGraphQL };
}

async function callGraphQL<T>(
  accessToken: string,
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  try {
    const response = await fetch(graphqlConfig.graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query, variables }),
    });

    const result = await response.json();
    return result.data as T;
  } catch (error) {
    console.error("Error fetching GraphQL data:", error);
    throw error;
  }
}
