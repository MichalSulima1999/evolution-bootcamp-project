import { AnimatedSprite, Sprite, Text } from "@pixi/react";
import React, { useEffect } from "react";
import { EnemyInterface } from "../../../classes/enemies/Enemies";
import { FightDrum, FightPlayerAction } from "../../../types";
import { PlayerStore } from "../../../classes/store/PlayerStore";
import { NumberOfDrums } from "../../../classes/actions/AdventureActions";

export interface EnemyProps {
  x: number;
  y: number;
  enemy: EnemyInterface;
  isPlayerTurn: boolean;
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
  playerAction: FightPlayerAction | null;
  usePlayerStore: PlayerStore;
  enemyNumber: number;
  currentEnemyTurn: number;
  setEnemyNumberDied: React.Dispatch<React.SetStateAction<number>>;
}

const Enemy: React.FC<EnemyProps> = ({
  x,
  y,
  enemy,
  isPlayerTurn,
  setIsPlayerTurn,
  playerAction,
  usePlayerStore,
  enemyNumber,
  currentEnemyTurn,
  setEnemyNumberDied,
}) => {
  const [health, setHealth] = React.useState(enemy.health);
  const [currentAnimation, setCurrentAnimation] = React.useState(
    enemy.idleImages
  );
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isLooping, setIsLooping] = React.useState(true);

  const { takeDamage, armor, damage } = usePlayerStore;

  useEffect(() => {
    // window.setTimeout(() => {
    //   attack();
    // }, 2000);
    // window.setTimeout(() => {
    //   enemyTakeDamage(3);
    // }, 5000);
  }, []);

  useEffect(() => {
    console.log("Enemy index from Enemy.tsx: ", currentEnemyTurn);

    if (enemyNumber !== currentEnemyTurn) return;

    setIsPlayerTurn(!isPlayerTurn);

    if (!isPlayerTurn) {
      attack();
      return;
    }

    if (playerAction === null) {
      return;
    }

    switch (playerAction.action) {
      case FightDrum.ATTACK:
        enemyTakeDamage(playerAction.numberOfDrums);
        break;
      case FightDrum.SPECIAL_ATTACK:
        break;
    }
  }, [currentEnemyTurn]);

  const die = () => {
    setIsPlaying(false);
    window.setTimeout(() => {
      setCurrentAnimation(enemy.dieImages);
      setIsPlaying(true);
      setIsLooping(false);
    }, 100);
    setEnemyNumberDied(enemyNumber);
  };

  const attack = async () => {
    setIsPlaying(false);
    setCurrentAnimation(enemy.attackImages);

    await new Promise((resolve) => setTimeout(resolve, 100));

    setIsPlaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsPlaying(false);
    if (playerAction !== null && playerAction.action === FightDrum.DEFEND) {
      takeDamage(enemy.damage - armor * playerAction.numberOfDrums);
    } else {
      takeDamage(enemy.damage - armor);
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
    setCurrentAnimation(enemy.idleImages);
    setIsPlaying(true);
  };

  const enemyTakeDamage = async (numberOfDrums: NumberOfDrums) => {
    setIsPlaying(false);
    setCurrentAnimation(enemy.hurtImages);

    await new Promise((resolve) => setTimeout(resolve, 100));

    setIsPlaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsPlaying(false);
    const hp = health - (numberOfDrums === 2 ? damage : damage * 1.5);
    setHealth(hp);

    await new Promise((resolve) => setTimeout(resolve, 100));
    setCurrentAnimation(enemy.idleImages);
    setIsPlaying(true);

    if (hp <= 0) {
      die();
    }
  };

  return (
    <>
      <Sprite image="/assets/ground.png" scale={5} x={x - 100} y={y + 10} />
      <AnimatedSprite
        anchor={0.5}
        textures={currentAnimation}
        isPlaying={isPlaying}
        loop={isLooping}
        initialFrame={0}
        animationSpeed={0.1}
        scale={3}
        x={x}
        y={y}
      />
      <Sprite
        image="/assets/bottom-ui.png"
        anchor={0.5}
        scale={0.09}
        x={x}
        y={y - 90}
      />
      <Sprite
        image="/assets/heart.png"
        anchor={0.5}
        scale={0.4}
        x={x - 25}
        y={y - 90}
      />
      <Text
        text={`${health}/${enemy.maxHealth}`}
        anchor={0.5}
        scale={0.5}
        x={x + 5}
        y={y - 90}
      />
    </>
  );
};

export default Enemy;
