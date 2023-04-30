import React from "react";
import { Drum } from "../classes/actions/AdventureActions";
import {
  DrawnActionAnimationInterface,
  FightDrum,
  FightPlayerAction,
  GameMode,
} from "../types";
import Bet from "./game/Bet";
import AdventureSpinButton from "./game/adventure/AdventureSpinButton";
import FightSpinButton from "./game/fight/FightSpinButton";
import { observer } from "mobx-react";
import { usePlayerStore } from "../classes/store/PlayerStore";
import styled from "styled-components";

interface SpinnerProps {
  adventureDrums: Drum[];
  setDrums: React.Dispatch<React.SetStateAction<Drum[]>>;
  setFightDrums: React.Dispatch<React.SetStateAction<FightDrum[]>>;
  spinning: boolean;
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  gameMode: GameMode;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  setPlayerFightAction: React.Dispatch<
    React.SetStateAction<FightPlayerAction | null>
  >;
  setNumberOfEnemies: React.Dispatch<React.SetStateAction<number>>;
  isPlayerTurn: boolean;
  setShowDrawnActionAnimation: React.Dispatch<
    React.SetStateAction<DrawnActionAnimationInterface>
  >;
  showMenu: boolean;
  preventAdventureFromSpinning: boolean;
  setPreventAdventureFromSpinning: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: black;
`;

const Spinner: React.FC<SpinnerProps> = observer(function PlayerStats({
  adventureDrums,
  setDrums,
  setFightDrums,
  spinning,
  setSpinning,
  gameMode,
  setGameMode,
  setPlayerFightAction,
  setNumberOfEnemies,
  isPlayerTurn,
  setShowDrawnActionAnimation,
  showMenu,
  preventAdventureFromSpinning,
  setPreventAdventureFromSpinning,
}) {
  const { numberOfTurns } = usePlayerStore();
  return (
    <Buttons>
      <Bet />
      <div>Turn: {numberOfTurns}</div>
      {gameMode === GameMode.ADVENTURE ? (
        <AdventureSpinButton
          spinning={spinning}
          setSpinning={setSpinning}
          setNumberOfEnemies={setNumberOfEnemies}
          drums={adventureDrums}
          setDrums={setDrums}
          setGameMode={setGameMode}
          setShowDrawnActionAnimation={setShowDrawnActionAnimation}
          showMenu={showMenu}
          preventAdventureFromSpinning={preventAdventureFromSpinning}
          setPreventAdventureFromSpinning={setPreventAdventureFromSpinning}
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
    </Buttons>
  );
});

export default Spinner;
