import styled from "styled-components";
import { BetStoreContext, betStore } from "./classes/store/BetStore";
import { PlayerStoreContext, playerStore } from "./classes/store/PlayerStore";
import PlayerStats from "./components/PlayerStats";
import Game from "./components/game/Game";
import background from "./assets/background.jpg";
import useFontFaceObserver from "use-font-face-observer";

const Container = styled.div`
  background-image: url(${background});
  width: 100vw;
  height: 100vh;
  background-size: cover;
`;

function App() {
  const isFontListLoaded = useFontFaceObserver([
    {
      family: `VT323`,
    },
  ]);

  return (
    <BetStoreContext.Provider value={betStore}>
      <PlayerStoreContext.Provider value={playerStore}>
        {!isFontListLoaded ? (
          <div>Loading...</div>
        ) : (
          <Container>
            <PlayerStats />
            <Game />
          </Container>
        )}
      </PlayerStoreContext.Provider>
    </BetStoreContext.Provider>
  );
}

export default App;
