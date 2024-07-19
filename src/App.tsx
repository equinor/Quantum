import React, { useState } from 'react';
 import { PageLayout } from './login/PageLayout';
 import { loginRequest, graphqlConfig } from './authConfig';
 import { ProfileData } from './login/ProfileData';
 import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
 import './App.css';
 import Button from 'react-bootstrap/Button';
 import Spinner from 'react-bootstrap/Spinner';

 /**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */
 const ProfileContent = () => {
   const { instance, accounts } = useMsal();
   const [graphqlData, setGraphqlData] = useState<any | null>(null);
   const [display, setDisplay] = useState(false);

   function RequestGraphQL() {
       // Silently acquires an access token which is then attached to a request for GraphQL data
       instance
           .acquireTokenSilent({
               ...loginRequest,
               account: accounts[0],
           })
           .then((response) => {
               callGraphQL(response.accessToken).then((response) => setGraphqlData(response));
           });
   }

 async function callGraphQL(accessToken:string) {
   setDisplay(true);
   const query = ` query {
     commissioningPackages(
        first:2000
        orderBy: {Priority3:DESC}
        filter:{
            Facility:{eq:"JCA"}

        }
    ) {
       items{
        CommissioningPackageNo
        ,Facility
        ,Priority3
        ,CommissioningPhase
       }
     } 
  }`;
   fetch(graphqlConfig.graphqlEndpoint, {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${accessToken}`,
           },
           body: JSON.stringify({ 
               query: query
           })
       })
       .then((res) => res.json())
       .then((result) => setGraphqlData(result));
 }

   return (
       <>
           <h5 className="card-title">Welcome {accounts[0].name}</h5>
           <br/>
           {graphqlData ? (
               <ProfileData graphqlData={graphqlData} />
           ) : (
               <Button variant="primary" onClick={RequestGraphQL}>
                   Query Fabric API for GraphQL Data 
                   {display ? (
                         <Spinner
                             as="span"
                             animation="border"
                             size="sm"
                             role="status"
                             aria-hidden="true"
                         />
                     ) : null}
               </Button>
           )}
       </>
   );
 };

 /**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
 const MainContent = () => {
   return (
       <div className="App">
           <AuthenticatedTemplate>
               <ProfileContent />
           </AuthenticatedTemplate>

           <UnauthenticatedTemplate>
               <h5>
                   <center>
                       From app.js line 92
                   </center>
               </h5>
           </UnauthenticatedTemplate>
       </div>
   );
 };

 export default function App() {
   return (
       <PageLayout>
           <center>
               <MainContent />
           </center>
       </PageLayout>
   );
 }