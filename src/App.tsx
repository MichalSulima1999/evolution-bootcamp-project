import "./App.css";
import { BetStoreContext, betStore } from "./classes/store/BetStore";
import { PlayerStoreContext, playerStore } from "./classes/store/PlayerStore";
import PlayerStats from "./components/PlayerStats";
import Game from "./components/game/Game";

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
