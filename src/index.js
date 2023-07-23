import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { HashRouter as Router, } from 'react-router-dom';
import { Provider } from 'react-redux';

import CssBaseline from '@mui/material/CssBaseline'

import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStores } from './store/index';

const {store} = configureStores()

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router forceRefresh={true}>
      <Provider store={store}>
    <CssBaseline />
      <App />
      </Provider>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
