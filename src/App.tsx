<<<<<<< HEAD
import './App.css';
import Kanbas from "./Kanbas";

import store from "./Kanbas/store";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import KanbasNavigation from './Kanbas/Navigation';
import {Provider} from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="Kanbas" />} />
            <Route path="/Kanbas/*" element={<Kanbas />} />
          </Routes>
        </div>
      </HashRouter>
    </Provider>

=======
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Labs from './Labs';
import Kanbas from "./Kanbas";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import KanbasNavigation from './Kanbas/Navigation';
import store from "./Kanbas/store";
import { Provider } from "react-redux";

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="Kanbas" />} />
          <Route path="/Labs/*" element={<Labs />} />
          <Route path="/Kanbas/*" element={<Kanbas />} />
        </Routes>
      </div>
      </Provider>
    </HashRouter>

    
>>>>>>> kanbas-react-web-app-cs5610-fa24/a6
  );
}

export default App;
