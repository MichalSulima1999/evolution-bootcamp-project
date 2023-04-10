import "./App.css";
import { PlayerStoreContext, playerStore } from "./store/PlayerStore";
import PlayerStats from "./components/PlayerStats";
import Game from "./components/game/Game";

function App() {
  return (
    <PlayerStoreContext.Provider value={playerStore}>
      <div className="container">
        <PlayerStats />
        <Game />
      </div>
    </PlayerStoreContext.Provider>
  );
}

export default App;
