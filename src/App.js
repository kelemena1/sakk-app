import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import './App.css';
import { ChessListPage } from "./Components/ChessListPage";
import {PlayerModifyPage} from "./Components/PlayerModifyPage";
import {PlayerAddPage} from "./Components/PlayerAddPage";
import {SinglePlayerPage} from "./Components/SinglePlayerPage";
function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
           <NavLink to={`/ChessList`} className="nav-link">
              <span className="nav-link">Sakk bejegyzések</span>
              </NavLink>
            </li>
            <li className="nav-item">
            <NavLink to={`/add-player`} className="nav-link">
              <span className="nav-link">Sakk bejegyzés készítése</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        
          <Route path="/ChessList" element={<ChessListPage/>} />
          <Route path="/player-modify/:playerId" element={<PlayerModifyPage />} />
          <Route path="/add-player" element={<PlayerAddPage />} />
          <Route path="/chessPlayer/:playerId" element={<SinglePlayerPage />} />
      </Routes>
    </Router>
  );
}

export default App;



