import { Container, Sprite, Text } from "@pixi/react";
import React, { useEffect } from "react";
import { Images } from "../helpers/FileHelper";
import { TextStyle } from "pixi.js";
import { observer } from "mobx-react";
import { loadState } from "../helpers/LocalStorageHelper";
import { PLAYER_STORE_KEY, usePlayerStore } from "../classes/store/PlayerStore";

interface MenuProps {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  playerDead: boolean;
  setPlayerDead: React.Dispatch<React.SetStateAction<boolean>>;
}

const Menu: React.FC<MenuProps> = observer(function Menu({
  setShowMenu,
  playerDead,
  setPlayerDead,
}) {
  const [info, setInfo] = React.useState<string>("");

  const { resetStats } = usePlayerStore();

  useEffect(() => {
    if (playerDead) {
      setInfo("You have died!");
    }
  }, []);

  const loadGame = () => {
    if (!loadState(PLAYER_STORE_KEY)) {
      setInfo("No save found");
      return;
    }
    setPlayerDead(false);
    setShowMenu(false);
  };

  const newGame = () => {
    resetStats();
    setPlayerDead(false);
    setShowMenu(false);
  };

  return (
    <Container position={[400, 300]}>
      <Sprite
        image={Images.UI_BACKGROUND}
        scale={0.95}
        anchor={0.5}
        x={0}
        y={0}
      />
      <Text
        text="SlotQuest"
        anchor={0.5}
        x={0}
        y={-150}
        style={
          new TextStyle({
            fontFamily: '"VT323"',
            fontSize: 70,
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 3,
          })
        }
      />
      <Container position={[-150, 150]} eventMode="static" onclick={newGame}>
        <Sprite image={Images.BUTTON} scale={2} anchor={0.5} x={0} y={0} />
        <Text
          text="New game"
          anchor={0.5}
          x={0}
          y={0}
          style={
            new TextStyle({
              fontFamily: '"VT323"',
              fontSize: 40,
              fill: "#ffffff",
              stroke: "#000000",
              strokeThickness: 2,
            })
          }
        />
      </Container>
      <Container position={[150, 150]} eventMode="static" onclick={loadGame}>
        <Sprite image={Images.BUTTON} scale={2} anchor={0.5} x={0} y={0} />
        <Text
          text="Load Game"
          anchor={0.5}
          x={0}
          y={0}
          style={
            new TextStyle({
              fontFamily: '"VT323"',
              fontSize: 40,
              fill: "#ffffff",
              stroke: "#000000",
              strokeThickness: 2,
            })
          }
        />
      </Container>
      <Text
        text={info}
        anchor={0.5}
        x={0}
        y={0}
        style={
          new TextStyle({
            fontFamily: '"VT323", "monospace"',
            fontSize: 40,
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 2,
          })
        }
      />
    </Container>
  );
});

export default Menu;
