import React from 'react';
import ReactDOM from 'react-dom';
import Checklist from './Checklist/Checklist';
import reportWebVitals from './reportWebVitals';

import 'ui-library/styles/common.scss';
import 'ui-library/styles/index.css';

ReactDOM.render(
  <React.StrictMode>
    <Checklist />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
