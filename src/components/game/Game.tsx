import { Sprite, Stage } from "@pixi/react";
import React, { useState } from "react";
import "./game.css";
import Machine from "./Machine";
import Bet from "./Bet";
import { Drum } from "../../classes/actions/AdventureActions";
import Fight from "./fight/Fight";
import {
  DrawnActionAnimationInterface,
  FightPlayerAction,
  GameMode,
} from "../../types";
import FightMachine from "./fight/FightMachine";
import { FightDrum } from "../../types";
import AdventureSpinButton from "./adventure/AdventureSpinButton";
import FightSpinButton from "./fight/FightSpinButton";
import DrawnActionAnimation from "./DrawnActionAnimation";
import { BetStoreContext, betStore } from "../../classes/store/BetStore";
import {
  PlayerStoreContext,
  playerStore,
} from "../../classes/store/PlayerStore";

const Game = () => {
  const [drums, setDrums] = useState<Drum[]>([]);
  const [fightDrums, setFightDrums] = useState<FightDrum[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.ADVENTURE);
  const [playerFightAction, setPlayerFightAction] =
    useState<FightPlayerAction | null>(null);
  const [numberOfEnemies, setNumberOfEnemies] = useState<number>(2);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [showDrawnActionAnimation, setShowDrawnActionAnimation] =
    useState<DrawnActionAnimationInterface>({
      show: false,
      image: "",
      text: "",
    });

  return (
    <div className="stage">
      <div>
        <Stage width={800} height={600} options={{ backgroundColor: 0x000000 }}>
          <Sprite
            image="/assets/dungeon-background.png"
            width={800}
            height={600}
            y={-100}
          />
          {gameMode === GameMode.ADVENTURE ? (
            <Machine
              drums={drums}
              spinning={spinning}
              setSpinning={setSpinning}
            />
          ) : (
            <BetStoreContext.Provider value={betStore}>
              <PlayerStoreContext.Provider value={playerStore}>
                <FightMachine
                  drums={fightDrums}
                  spinning={spinning}
                  setSpinning={setSpinning}
                />
                <Fight
                  playerFightAction={playerFightAction}
                  numberOfEnemies={numberOfEnemies}
                  isPlayerTurn={isPlayerTurn}
                  setIsPlayerTurn={setIsPlayerTurn}
                  setGameMode={setGameMode}
                />
              </PlayerStoreContext.Provider>
            </BetStoreContext.Provider>
          )}

          {showDrawnActionAnimation.show && (
            <DrawnActionAnimation
              image={showDrawnActionAnimation.image}
              text={showDrawnActionAnimation.text}
              setShowDrawnActionAnimation={setShowDrawnActionAnimation}
            />
          )}
        </Stage>
      </div>
      <div className="buttons">
        <Bet />
        {gameMode === GameMode.ADVENTURE ? (
          <AdventureSpinButton
            spinning={spinning}
            setSpinning={setSpinning}
            setNumberOfEnemies={setNumberOfEnemies}
            drums={drums}
            setDrums={setDrums}
            setGameMode={setGameMode}
            setShowDrawnActionAnimation={setShowDrawnActionAnimation}
          />
        ) : (
          <FightSpinButton
            spinning={spinning}
            setSpinning={setSpinning}
            setDrums={setFightDrums}
            setPlayerFightAction={setPlayerFightAction}
            isPlayerTurn={isPlayerTurn}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
