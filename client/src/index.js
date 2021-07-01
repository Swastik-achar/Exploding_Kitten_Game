import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import axios from 'axios';
import config from './config/config';

import storeConfig from './store/storeConfig';
import { Provider } from "react-redux";
import reportWebVitals from './reportWebVitals';
import { getUser, getAllUserData } from './Actions/userActions';
const { BACKEND_SERVICE } = config;
axios.defaults.baseURL = BACKEND_SERVICE;


const store= storeConfig();
const data = localStorage.getItem('userName');
if (data) {
  store.dispatch(getUser(data));
}

store.dispatch(getAllUserData());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
