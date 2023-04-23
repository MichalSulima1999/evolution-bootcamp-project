import React, { useEffect, useState } from "react";
import Enemy from "./Enemy";
import { EnemyInterface, Goblin } from "../../../classes/enemies/Enemies";
import { PlayerStore } from "../../../classes/store/PlayerStore";
import { FightPlayerAction } from "../../../types";

interface FightProps {
  usePlayerStore: PlayerStore;
  playerFightAction: FightPlayerAction | null;
  isPlayerTurn: boolean;
  numberOfEnemies: number;
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Fight: React.FC<FightProps> = ({
  usePlayerStore,
  playerFightAction,
  isPlayerTurn,
  setIsPlayerTurn,
  numberOfEnemies,
}) => {
  const [enemyNumberDied, setEnemyNumberDied] = useState<number>(0);
  const [currentEnemyTurn, setCurrentEnemyTurn] = useState<number>(-1);
  const [currentEnemyTurnIndex, setCurrentEnemyTurnIndex] = useState<number>(0);
  //const [enemies, setEnemies] = useState<JSX.Element[]>([]);

  const fight = () => {};

  const createEnemies = (enemyType: EnemyInterface): JSX.Element[] => {
    const enemies: JSX.Element[] = [];

    for (let i = 0; i < numberOfEnemies; i++) {
      enemies.push(
        <Enemy
          x={150 + i * 250}
          y={250}
          enemy={enemyType}
          isPlayerTurn={isPlayerTurn}
          setIsPlayerTurn={setIsPlayerTurn}
          playerAction={playerFightAction}
          usePlayerStore={usePlayerStore}
          enemyNumber={i}
          currentEnemyTurn={currentEnemyTurn}
          setEnemyNumberDied={setEnemyNumberDied}
          key={i}
        />
      );
    }

    return enemies;
    //setEnemies(enemies);
  };
  const enemies: JSX.Element[] = createEnemies(Goblin);

  useEffect(() => {
    createEnemies(Goblin);
    setIsPlayerTurn(true);
  }, []);

  useEffect(() => {
    console.log(playerFightAction);
  }, [playerFightAction]);

  useEffect(() => {}, [enemyNumberDied]);

  useEffect(() => {
    if (enemies.length <= 0) return;
    if (!isPlayerTurn) return;

    const enemyIndex =
      currentEnemyTurnIndex >= enemies.length - 1
        ? 0
        : currentEnemyTurnIndex + 1;
    setCurrentEnemyTurnIndex(enemyIndex);
    console.log("Index: ", currentEnemyTurn);
    setCurrentEnemyTurn(parseInt(enemies[enemyIndex].key as string));
  }, [playerFightAction]);

  return <>{enemies}</>;
};

export default Fight;
