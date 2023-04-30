import styled from "styled-components";
import { BetStoreContext, betStore } from "./classes/store/BetStore";
import { PlayerStoreContext, playerStore } from "./classes/store/PlayerStore";
import PlayerStats from "./components/PlayerStats";
import Game from "./components/game/Game";
import background from "./assets/background.jpg";

const Container = styled.div`
  background-image: url(${background});
  width: 100vw;
  height: 100vh;
  background-size: cover;
`;

function App() {
  return (
    <BetStoreContext.Provider value={betStore}>
      <PlayerStoreContext.Provider value={playerStore}>
        <Container>
          <PlayerStats />
          <Game />
        </Container>
      </PlayerStoreContext.Provider>
    </BetStoreContext.Provider>
  );
}

export default App;
