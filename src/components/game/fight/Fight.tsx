import React, { useEffect, useState } from "react";
import Enemy from "./Enemy";
import { EnemyInterface, Goblin } from "../../../classes/enemies/Enemies";
import { usePlayerStore } from "../../../classes/store/PlayerStore";
import { FightPlayerAction, GameMode } from "../../../types";
import useDidUpdateEffect from "../../../hooks/UseDidUpdateEffect";
import { Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useBetStore } from "../../../classes/store/BetStore";
import { getMoneyReward } from "../../../services/FightService";
import { observer } from "mobx-react";

interface FightProps {
  playerFightAction: FightPlayerAction | null;
  isPlayerTurn: boolean;
  numberOfEnemies: number;
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
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
}) {
  const [enemyNumberDied, setEnemyNumberDied] = useState<number>(-1);
  const [currentEnemyTurn, setCurrentEnemyTurn] = useState<TurnInterface>({
    index: -1,
    turnNumber: 0,
  });
  const [currentEnemyTurnIndex, setCurrentEnemyTurnIndex] =
    useState<number>(-1);
  const [aliveEnemiesIndexes, setAliveEnemiesIndexes] = useState<number[]>([]);

  const { addMoney } = usePlayerStore();

  const createEnemies = (enemyType: EnemyInterface): JSX.Element[] => {
    const enemies: JSX.Element[] = [];
    const aliveEnemiesIndexes = [];

    for (let i = 0; i < numberOfEnemies; i++) {
      enemies.push(
        <Enemy
          x={150 + i * 250}
          y={250}
          enemy={enemyType}
          setIsPlayerTurn={setIsPlayerTurn}
          playerAction={playerFightAction}
          usePlayerStore={usePlayerStore()}
          useBetStore={useBetStore()}
          enemyNumber={i}
          currentEnemyTurn={currentEnemyTurn}
          setEnemyNumberDied={setEnemyNumberDied}
          key={i}
        />
      );
      aliveEnemiesIndexes.push(i);
    }

    return enemies;
  };
  const enemies: JSX.Element[] = createEnemies(Goblin);

  useEffect(() => {
    setAliveEnemiesIndexes(enemies.map((_, i) => i));
    setIsPlayerTurn(true);
  }, []);

  const enemyDied = () => {
    const deadEnemyIndex = enemies.findIndex(
      (e) => parseInt(e.key as string) === enemyNumberDied
    );

    aliveEnemiesIndexes.splice(
      aliveEnemiesIndexes.findIndex((e) => e === deadEnemyIndex),
      1
    );
    setAliveEnemiesIndexes([...aliveEnemiesIndexes]);

    if (aliveEnemiesIndexes.length <= 0) {
      endFight();
    }
  };

  const endFight = () => {
    setGameMode(GameMode.ADVENTURE);
    addMoney(getMoneyReward());
  };

  const changeEnemyTurn = async () => {
    if (aliveEnemiesIndexes.length <= 0) return;

    setIsPlayerTurn(false);

    const enemyIndex = aliveEnemiesIndexes[currentEnemyTurnIndex + 1]
      ? aliveEnemiesIndexes[currentEnemyTurnIndex + 1]
      : aliveEnemiesIndexes[0];
    console.log(
      currentEnemyTurnIndex >=
        aliveEnemiesIndexes[aliveEnemiesIndexes.length - 1]
    );

    setCurrentEnemyTurnIndex(enemyIndex);
    setCurrentEnemyTurn({
      index: parseInt(enemies[enemyIndex].key as string, 10),
      turnNumber: currentEnemyTurn.turnNumber + 1,
    });
  };

  useDidUpdateEffect(changeEnemyTurn, [playerFightAction]);

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
            fontFamily: '"VT323", "monospace"',
            fontSize: 50,
            fill: "#ffffff", // gradient
            stroke: "#000000",
            strokeThickness: 5,
            letterSpacing: 20,
          })
        }
      />
      {aliveEnemiesIndexes.map((e) => {
        return enemies[e];
      })}
    </>
  );
});

export default Fight;
