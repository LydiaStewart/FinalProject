import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Auth0Provider} from "@auth0/auth0-react"

//dotenv.config()
//const CLIENT_ID = process.env.REACT_APP_CLIENT_ID

//const {BOOKS_API_KEY, REACT_APP_CLIENT_ID, REACT_APP_DOMAIN_LINK} = process.env;
//console.log(CLIENT_ID)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-2egzdlxcia45xf42.us.auth0.com"
    clientId={process.env.REACT_APP_CLIENT_ID}
    authorizationParams={{redirect_uri: "http://localhost:3000"}}>
    <App />
    </Auth0Provider>
  </React.StrictMode>
);
