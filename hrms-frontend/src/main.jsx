import React from 'react';
import ReactDOM from 'react-dom/client';
import Maintain from './Maintain';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css';
import { UserProvider } from './components/UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <Maintain />
    </UserProvider>
  </React.StrictMode>
);
