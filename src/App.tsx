import "./App.css";
import { PlayerStoreContext, playerStore } from "./store/PlayerStore";
import PlayerStats from "./components/PlayerStats";
import Game from "./components/game/Game";
import { BetStoreContext, betStore } from "./store/BetStore";

function App() {
  return (
    <BetStoreContext.Provider value={betStore}>
      <PlayerStoreContext.Provider value={playerStore}>
        <div className="container">
          <PlayerStats />
          <Game />
        </div>
      </PlayerStoreContext.Provider>
    </BetStoreContext.Provider>
  );
}

export default App;
