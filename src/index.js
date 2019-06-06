import React from 'react';
import ReactDOM from 'react-dom';
import RootContainer from './containers/RootContainer';
import store from './utils/loadStoreHelper';

ReactDOM.render(
  <RootContainer store={store} />,
  document.getElementById('root')
);

// document.addEventListener('DOMContentLoaded', () => {
//   ReactDOM.render(
//     <RootContainer store={store} />,
//     document.getElementById('root')
//   );
// });
