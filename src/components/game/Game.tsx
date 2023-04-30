import { Sprite, Stage } from "@pixi/react";
import React, { useEffect, useState } from "react";
import Machine from "./Machine";
import { Drum } from "../../classes/actions/AdventureActions";
import Fight from "./fight/Fight";
import {
  DrawnActionAnimationInterface,
  FightPlayerAction,
  GameMode,
} from "../../types";
import FightMachine from "./fight/FightMachine";
import { FightDrum } from "../../types";
import DrawnActionAnimation from "./DrawnActionAnimation";
import { BetStoreContext, betStore } from "../../classes/store/BetStore";
import {
  PlayerStoreContext,
  playerStore,
} from "../../classes/store/PlayerStore";
import Spinner from "../Spinner";
import Menu from "../Menu";
import styled from "styled-components";

const StageDiv = styled.div`
  text-align: center;
  padding-top: 4rem;
`;

const Game = () => {
  const [drums, setDrums] = useState<Drum[]>([]);
  const [fightDrums, setFightDrums] = useState<FightDrum[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.ADVENTURE);
  const [playerFightAction, setPlayerFightAction] =
    useState<FightPlayerAction | null>(null);
  const [numberOfEnemies, setNumberOfEnemies] = useState<number>(0);
  const [isPlayerTurn, setIsPlayerTurn] = useState<boolean>(true);
  const [showDrawnActionAnimation, setShowDrawnActionAnimation] =
    useState<DrawnActionAnimationInterface>({
      show: false,
      image: "",
      text: "",
    });
  const [showMenu, setShowMenu] = useState(true);
  const [playerDead, setPlayerDead] = useState(false);
  const [preventAdventureFromSpinning, setPreventAdventureFromSpinning] =
    useState(false);

  useEffect(() => {
    if (!playerDead) return;

    setShowMenu(true);
    setGameMode(GameMode.ADVENTURE);
    setPreventAdventureFromSpinning(false);
    setShowDrawnActionAnimation({
      show: false,
      image: "",
      text: "",
    });
    setPlayerFightAction(null);
    setDrums([]);
    setFightDrums([]);
    setSpinning(false);
    setIsPlayerTurn(true);
  }, [playerDead]);

  return (
    <StageDiv>
      <div>
        <Stage width={800} height={600} options={{ backgroundColor: 0x000000 }}>
          <Sprite
            image="/assets/dungeon-background.png"
            width={800}
            height={600}
            y={-100}
          />
          {showMenu ? (
            <BetStoreContext.Provider value={betStore}>
              <PlayerStoreContext.Provider value={playerStore}>
                <Menu
                  setShowMenu={setShowMenu}
                  playerDead={playerDead}
                  setPlayerDead={setPlayerDead}
                />
              </PlayerStoreContext.Provider>
            </BetStoreContext.Provider>
          ) : (
            <>
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
                      setSpinning={setSpinning}
                      setShowDrawnActionAnimation={setShowDrawnActionAnimation}
                      setPreventAdventureFromSpinning={
                        setPreventAdventureFromSpinning
                      }
                      fightDrums={fightDrums}
                      setPlayerDead={setPlayerDead}
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
            </>
          )}
        </Stage>
      </div>
      <Spinner
        adventureDrums={drums}
        setDrums={setDrums}
        setFightDrums={setFightDrums}
        spinning={spinning}
        setSpinning={setSpinning}
        gameMode={gameMode}
        setGameMode={setGameMode}
        setPlayerFightAction={setPlayerFightAction}
        setNumberOfEnemies={setNumberOfEnemies}
        isPlayerTurn={isPlayerTurn}
        setShowDrawnActionAnimation={setShowDrawnActionAnimation}
        showMenu={showMenu}
        preventAdventureFromSpinning={preventAdventureFromSpinning}
        setPreventAdventureFromSpinning={setPreventAdventureFromSpinning}
      ></Spinner>
    </StageDiv>
  );
};

export default Game;
