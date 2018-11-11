import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

let url  = process.env.REACT_APP_API_URL == undefined ? 'NONE' : process.env.REACT_APP_API_URL

ReactDOM.render(
  <App api_url={url}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
