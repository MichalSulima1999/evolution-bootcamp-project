import { AnimatedSprite, Sprite } from "@pixi/react";
import React, { useEffect } from "react";
import { EnemyInterface } from "../../../classes/enemies/Enemies";
import { Texture } from "pixi.js";
//import { Enemy as EnemyClass } from "../../../classes/enemies/Enemy";

export interface EnemyProps {
  x: number;
  y: number;
  enemy: EnemyInterface;
}

const Enemy: React.FC<EnemyProps> = ({ x, y, enemy }) => {
  const [health, setHealth] = React.useState(enemy.health);
  const [currentAnimation, setCurrentAnimation] = React.useState(
    enemy.idleImages
  );
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isLooping, setIsLooping] = React.useState(true);

  useEffect(() => {
    window.setTimeout(() => {
      attack();
    }, 2000);

    window.setTimeout(() => {
      die();
    }, 5000);
  }, []);

  const die = () => {
    setIsPlaying(false);
    window.setTimeout(() => {
      setCurrentAnimation(enemy.dieImages);
      setIsPlaying(true);
      setIsLooping(false);
    }, 100);
  };

  const attack = async () => {
    setIsPlaying(false);
    setCurrentAnimation(enemy.attackImages);

    await new Promise((resolve) => setTimeout(resolve, 100));

    setIsPlaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsPlaying(false);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setCurrentAnimation(enemy.idleImages);
    setIsPlaying(true);
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
    </>
  );
};

export default Enemy;
