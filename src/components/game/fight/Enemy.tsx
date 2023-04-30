import { AnimatedSprite, Container, Sprite, Text } from "@pixi/react";
import React, { useEffect } from "react";
import { EnemyInterface } from "../../../classes/enemies/Enemies";
import {
  DrawnActionAnimationInterface,
  FightDrum,
  FightPlayerAction,
} from "../../../types";
import { usePlayerStore } from "../../../classes/store/PlayerStore";
import { NumberOfDrums } from "../../../classes/actions/AdventureActions";
import { TurnInterface } from "./Fight";
import { useBetStore } from "../../../classes/store/BetStore";
import { betBonus } from "../../../helpers/FightHelper";
import SpecialAttackEffect from "./SpecialAttackEffect";
import { Images } from "../../../helpers/FileHelper";

const CRITICAL_MULTIPLIER = 1.5;

export interface EnemyProps {
  x: number;
  y: number;
  enemy: EnemyInterface;
  setIsPlayerTurn: React.Dispatch<React.SetStateAction<boolean>>;
  playerAction: FightPlayerAction | null;
  enemyNumber: number;
  currentEnemyTurn: TurnInterface;
  setEnemyNumberDied: React.Dispatch<React.SetStateAction<number>>;
  setShowDrawnActionAnimation: React.Dispatch<
    React.SetStateAction<DrawnActionAnimationInterface>
  >;
  setPlayerDead: React.Dispatch<React.SetStateAction<boolean>>;
}

const Enemy: React.FC<EnemyProps> = ({
  x,
  y,
  enemy,
  setIsPlayerTurn,
  playerAction,
  enemyNumber,
  currentEnemyTurn,
  setEnemyNumberDied,
  setShowDrawnActionAnimation,
  setPlayerDead,
}) => {
  const [health, setHealth] = React.useState(enemy.health);
  const [currentAnimation, setCurrentAnimation] = React.useState(
    enemy.idleImages
  );
  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isLooping, setIsLooping] = React.useState(true);
  const [isDead, setIsDead] = React.useState(false);
  const [specialAttackActive, setSpecialAttackActive] = React.useState(false);

  const { takeDamage, armor, damage, specialAttack, addExperience } =
    usePlayerStore();

  const { bet } = useBetStore();

  useEffect(() => {
    if (enemyNumber !== currentEnemyTurn.index || isDead) return;

    if (playerAction !== null) {
      switch (playerAction.action) {
        case FightDrum.ATTACK:
          enemyTakeDamage(playerAction.numberOfDrums, damage).then((dead) => {
            if (!dead) attack();
          });
          break;
        case FightDrum.SPECIAL_ATTACK:
          setSpecialAttackActive(true);
          enemyTakeDamage(
            playerAction.numberOfDrums,
            specialAttack.damage
          ).then((dead) => {
            if (!dead) attack();
          });
          break;
        case FightDrum.DEFEND:
          attackPlayer();
      }
    } else {
      attackPlayer();
    }
  }, [currentEnemyTurn]);

  const attackPlayer = async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    attack();
  };

  const die = async () => {
    setIsPlaying(false);
    setIsDead(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    setCurrentAnimation(enemy.dieImages);
    setIsPlaying(true);
    setIsLooping(false);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEnemyNumberDied(enemyNumber);
    setIsPlayerTurn(true);
    const playerLeveledUp = addExperience(enemy.experience);
    if (playerLeveledUp) {
      setShowDrawnActionAnimation({
        show: true,
        image: Images.LVL_UP,
        text: "LEVEL UP!",
      });
    }
  };

  const attack = async () => {
    if (isDead) return;
    setIsPlaying(false);
    setCurrentAnimation(enemy.attackImages);

    await new Promise((resolve) => setTimeout(resolve, 100));

    setIsPlaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsPlaying(false);
    const hit = Math.random() < enemy.hitChance;
    if (hit) {
      let damage: number;
      if (playerAction !== null && playerAction.action === FightDrum.DEFEND) {
        damage = Math.floor(
          enemy.damage - armor * playerAction.numberOfDrums * betBonus(bet)
        );
      } else {
        damage = Math.floor(enemy.damage - armor);
      }
      const playerDied = takeDamage(damage);
      setShowDrawnActionAnimation({
        show: true,
        image: Images.SWORD,
        text: `HIT! ${damage} DAMAGE TAKEN.`,
      });

      if (playerDied) {
        setPlayerDead(true);
        return;
      }
    } else {
      setShowDrawnActionAnimation({
        show: true,
        image: Images.SWORD,
        text: "ENEMY MISSED!",
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
    setCurrentAnimation(enemy.idleImages);
    setIsPlaying(true);
    setIsPlayerTurn(true);
  };

  /**
   *
   * @param numberOfDrums
   * @param baseDamage
   * @returns true if enemy died, false if not
   */
  const enemyTakeDamage = async (
    numberOfDrums: NumberOfDrums,
    baseDamage: number
  ): Promise<boolean> => {
    if (isDead) return true;
    setIsPlaying(false);
    setCurrentAnimation(enemy.hurtImages);

    await new Promise((resolve) => setTimeout(resolve, 100));

    setIsPlaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsPlaying(false);
    const hp =
      health -
      (numberOfDrums === 2
        ? baseDamage * betBonus(bet)
        : baseDamage * CRITICAL_MULTIPLIER * betBonus(bet));
    setHealth(Math.ceil(hp));

    await new Promise((resolve) => setTimeout(resolve, 100));
    setCurrentAnimation(enemy.idleImages);
    setIsPlaying(true);

    if (hp <= 0) {
      die();
      return true;
    }
    return false;
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
      <Container position={[x, y - 90]} anchor={0.5}>
        <Sprite
          image="/assets/bottom-ui.png"
          anchor={0.5}
          scale={0.1}
          x={0}
          y={0}
        />
        <Text text={enemy.name} anchor={0.5} scale={0.5} x={0} y={-9} />
        <Sprite
          image="/assets/heart.png"
          anchor={0.5}
          scale={0.4}
          x={-25}
          y={9}
        />
        <Text
          text={`${health}/${enemy.maxHealth}`}
          anchor={0.5}
          scale={0.5}
          x={5}
          y={9}
        />
      </Container>
      {specialAttackActive && (
        <SpecialAttackEffect
          x={x}
          y={y}
          setSpecialAttackActive={setSpecialAttackActive}
        />
      )}
    </>
  );
};

export default Enemy;
