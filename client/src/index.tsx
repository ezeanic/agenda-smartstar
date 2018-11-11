import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

let url = ''

ReactDOM.render(
  <App api_url={url}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
