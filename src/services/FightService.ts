import { EnemyInterface, createGoblin } from "../classes/enemies/Enemies";
import { randomIntFromInterval } from "../helpers/NumberHelper";

export const getMoneyReward = (turnNumber: number): number => {
  return randomIntFromInterval(10 + turnNumber, 100 + turnNumber);
};

export const getEnemies = (
  numberOfEnemies: number,
  numberOfTurns: number
): EnemyInterface[] => {
  const enemies: EnemyInterface[] = [];

  for (let i = 0; i < numberOfEnemies; i++) {
    const health = 50 + randomIntFromInterval(0, numberOfTurns);
    const damage = 5 + randomIntFromInterval(0, numberOfTurns);
    const experience = 40 + randomIntFromInterval(0, numberOfTurns);
    const hitChance = 0.6;
    const enemy: EnemyInterface = createGoblin(
      health,
      damage,
      experience,
      hitChance
    );
    enemies.push(enemy);
  }
  return enemies;
};
