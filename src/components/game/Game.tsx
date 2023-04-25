import { Sprite, Stage } from "@pixi/react";
import React, { useState } from "react";
import "./game.css";
import Machine from "./Machine";
import Bet from "./Bet";
import { Drum } from "../../classes/actions/AdventureActions";
import { useBetStore } from "../../classes/store/BetStore";
import { observer } from "mobx-react";
import { usePlayerStore } from "../../classes/store/PlayerStore";
import Fight from "./fight/Fight";
import { FightPlayerAction, GameMode } from "../../types";
import FightMachine from "./fight/FightMachine";
import { FightDrum } from "../../types";
import AdventureSpinButton from "./adventure/AdventureSpinButton";
import FightSpinButton from "./fight/FightSpinButton";

const Game = observer(function Game() {
  const [drums, setDrums] = useState<Drum[]>([]);
  const [fightDrums, setFightDrums] = useState<FightDrum[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.ADVENTURE);
  const [playerFightAction, setPlayerFightAction] =
    useState<FightPlayerAction | null>(null);
  const [numberOfEnemies, setNumberOfEnemies] = useState<number>(2);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);

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
            <>
              <FightMachine
                drums={fightDrums}
                spinning={spinning}
                setSpinning={setSpinning}
              />
              <Fight
                usePlayerStore={usePlayerStore()}
                useBetStore={useBetStore()}
                playerFightAction={playerFightAction}
                numberOfEnemies={numberOfEnemies}
                isPlayerTurn={isPlayerTurn}
                setIsPlayerTurn={setIsPlayerTurn}
                setGameMode={setGameMode}
              />
            </>
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
            usePlayerStore={usePlayerStore()}
            useBetStore={useBetStore()}
            setGameMode={setGameMode}
          />
        ) : (
          <FightSpinButton
            spinning={spinning}
            setSpinning={setSpinning}
            drums={fightDrums}
            setDrums={setFightDrums}
            usePlayerStore={usePlayerStore()}
            useBetStore={useBetStore()}
            setPlayerFightAction={setPlayerFightAction}
            isPlayerTurn={isPlayerTurn}
          />
        )}
      </div>
    </div>
  );
});

export default Game;
