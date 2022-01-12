import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import {AppProvider} from '@shopify/polaris';
import en from '@shopify/polaris/locales/en.json';
import "@shopify/polaris/build/esm/styles.css";

ReactDOM.render(
  <AppProvider i18n={en} theme={{colorScheme:"dark"}}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppProvider>,
  document.getElementById('root')
);
