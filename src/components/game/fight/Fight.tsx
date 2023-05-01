import React, { useEffect, useState } from "react";
import Enemy from "./Enemy";
import { usePlayerStore } from "../../../classes/store/PlayerStore";
import {
  DrawnActionAnimationInterface,
  FightDrum,
  FightPlayerAction,
  GameMode,
} from "../../../types";
import useDidUpdateEffect from "../../../hooks/UseDidUpdateEffect";
import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { getEnemies, getMoneyReward } from "../../../services/FightService";
import { observer } from "mobx-react";
import { EnemyInterface } from "../../../classes/enemies/Enemies";
import { Images } from "../../../helpers/FileHelper";

interface FightProps {
  playerFightAction: FightPlayerAction | null;
  isPlayerTurn: boolean;
  numberOfEnemies: number;
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDrawnActionAnimation: React.Dispatch<
    React.SetStateAction<DrawnActionAnimationInterface>
  >;
  setPreventAdventureFromSpinning: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  fightDrums: FightDrum[];
  setPlayerDead: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TurnInterface {
  index: number;
  turnNumber: number;
}

const Fight: React.FC<FightProps> = observer(function Fight({
  playerFightAction,
  isPlayerTurn,
  setIsPlayerTurn,
  numberOfEnemies,
  setGameMode,
  setSpinning,
  setShowDrawnActionAnimation,
  setPreventAdventureFromSpinning,
  fightDrums,
  setPlayerDead,
}) {
  const [enemyNumberDied, setEnemyNumberDied] = useState<number>(-1);
  const [currentEnemyTurn, setCurrentEnemyTurn] = useState<TurnInterface>({
    index: -1,
    turnNumber: 0,
  });
  const [currentEnemyTurnIndex, setCurrentEnemyTurnIndex] =
    useState<number>(-1);
  const [aliveEnemiesIndexes, setAliveEnemiesIndexes] = useState<number[]>([]);
  const [enemies, setEnemies] = useState<EnemyInterface[]>([]);

  const { addMoney, numberOfTurns } = usePlayerStore();

  useEffect(() => {
    setIsPlayerTurn(true);
    setEnemies(getEnemies(numberOfEnemies, numberOfTurns));
    setPreventAdventureFromSpinning(true);
  }, []);

  useEffect(() => {
    setAliveEnemiesIndexes(enemies.map((_, i) => i));
  }, [enemies]);

  const enemyDied = () => {
    aliveEnemiesIndexes.splice(
      aliveEnemiesIndexes.findIndex((e) => e === enemyNumberDied),
      1
    );
    setAliveEnemiesIndexes([...aliveEnemiesIndexes]);

    if (aliveEnemiesIndexes.length <= 0) {
      endFight();
    }
  };

  const endFight = () => {
    setGameMode(GameMode.ADVENTURE);
    const money = getMoneyReward(numberOfTurns);
    addMoney(money);
    setShowDrawnActionAnimation({
      show: true,
      image: Images.COIN,
      text: `YOU WON! +${money} GOLD!`,
    });
    setSpinning(false);
  };

  const changeEnemyTurn = async () => {
    if (aliveEnemiesIndexes.length <= 0) return;

    setIsPlayerTurn(false);

    const enemyIndex = aliveEnemiesIndexes[currentEnemyTurnIndex + 1]
      ? aliveEnemiesIndexes[currentEnemyTurnIndex + 1]
      : aliveEnemiesIndexes[0];

    setCurrentEnemyTurnIndex(enemyIndex);
    setCurrentEnemyTurn({
      index: enemyIndex,
      turnNumber: currentEnemyTurn.turnNumber + 1,
    });
  };

  useDidUpdateEffect(changeEnemyTurn, [fightDrums]);

  useDidUpdateEffect(enemyDied, [enemyNumberDied]);

  return (
    <>
      <Text
        text={isPlayerTurn ? "Your turn" : "Enemy turn"}
        pivot={0.5}
        x={200}
        y={10}
        style={
          new TextStyle({
            fontFamily: '"VT323"',
            fontSize: 50,
            fill: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5,
            letterSpacing: 20,
          })
        }
      />
      {aliveEnemiesIndexes.map((i) => (
        <Enemy
          x={150 + i * 250}
          y={250}
          enemy={enemies[i]}
          setIsPlayerTurn={setIsPlayerTurn}
          playerAction={playerFightAction}
          enemyNumber={i}
          currentEnemyTurn={currentEnemyTurn}
          setEnemyNumberDied={setEnemyNumberDied}
          setShowDrawnActionAnimation={setShowDrawnActionAnimation}
          setPlayerDead={setPlayerDead}
          key={i}
        />
      ))}
    </>
  );
});

export default Fight;
