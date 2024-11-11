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

  );
}

export default App;
