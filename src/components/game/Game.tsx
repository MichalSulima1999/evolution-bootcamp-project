import { Sprite, Stage } from "@pixi/react";
import React from "react";
import "./game.css";

const Game = () => {
  return (
    <div className="stage">
      <Stage width={800} height={600} options={{ backgroundColor: 0x000000 }}>
        <Sprite
          image="/assets/coin.png"
          scale={{ x: 0.5, y: 0.5 }}
          anchor={0.5}
          x={150}
          y={150}
        />
      </Stage>
    </div>
  );
};

export default Game;
