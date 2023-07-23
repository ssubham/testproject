import React, {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom'
import { StyledEngineProvider } from "@mui/material/styles";
import Axios from 'axios';

import Header from './layout/header/';
import LoginScreen from './layout/login/';
import SignupScreen from './layout/signup/';
import Dashboard from './layout/dashboard/';

import './App.css';


const App = (props) => {

  console.log('app ',localStorage.getItem('userId'));

  Axios.defaults.baseURL = 'http://localhost:5000/api/v1';

  let routes = (
      <Routes>      
        <Route path= {'dashboard'} element={<Dashboard {...props}/>} />
        <Route path= {'signup'} element={<SignupScreen {...props}/>} />
        <Route exact path={'login'} element={<LoginScreen {...props} />} />
      </Routes>
  );


  return (
    <div className="App">
      <StyledEngineProvider injectFirst>
        <Header />
          <Suspense fallback={<p>Loading... </p>}>{routes}</Suspense>
      </StyledEngineProvider>
    </div>
  );
}

export default App;
