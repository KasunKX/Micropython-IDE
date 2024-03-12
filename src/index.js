import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Main from './Main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Auth0Provider } from "@auth0/auth0-react";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-rbq4vv64emkpgpoc.us.auth0.com"
    clientId="KMQRGEeUNFSlIwPC8RCQ6Ltpiw5Un05T"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    
    {/* <Route path='/app' element={<App />} /> */}
     <Main />
  </Auth0Provider>,
);

