import { NumberOfDrums } from "../classes/actions/AdventureActions";

export enum Treasure {
  WEAPON,
  ARMOR,
  SPECIAL_ATTACK,
  MONEY,
}

export interface TreasureType {
  type: Treasure;
  amount: number;
}

const WEAPONS_DAMAGE = [15, 20, 25, 30, 35, 40];
const ARMORS_DEFENCE = [5, 10, 15, 20, 25, 30];
const SPECIAL_ATTACKS_DAMAGE = [35, 45, 55, 65, 75, 85];

export function getRandomTreasure(
  numberOfDrums: NumberOfDrums,
  bet: number
): TreasureType {
  const values = Object.values(Treasure);
  const randomIndex = Math.floor(Math.random() * values.length);
  console.log(values[randomIndex]);

  const type = values[randomIndex] as Treasure;

  switch (type) {
    case Treasure.WEAPON:
      const weapon = Math.floor(
        WEAPONS_DAMAGE[Math.floor(Math.random() * WEAPONS_DAMAGE.length)] +
          bet * 0.05 * numberOfDrums
      );
      return {
        type: Treasure.WEAPON,
        amount: weapon,
      };
    case Treasure.ARMOR:
      const armor = Math.floor(
        ARMORS_DEFENCE[Math.floor(Math.random() * ARMORS_DEFENCE.length)] +
          bet * 0.05 * numberOfDrums
      );
      return {
        type: Treasure.ARMOR,
        amount: armor,
      };
    case Treasure.SPECIAL_ATTACK:
      const specialAttack = Math.floor(
        SPECIAL_ATTACKS_DAMAGE[
          Math.floor(Math.random() * SPECIAL_ATTACKS_DAMAGE.length)
        ] +
          bet * 0.05 * numberOfDrums
      );
      return {
        type: Treasure.SPECIAL_ATTACK,
        amount: specialAttack,
      };
    case Treasure.MONEY:
      const money = Math.floor(
        Math.floor(Math.random() * 20) + bet * 0.05 * numberOfDrums
      );
      return {
        type: Treasure.MONEY,
        amount: money,
      };
  }
}

export const getFreeSpins = (drums: NumberOfDrums, bet: number): number => {
  return Math.floor((drums * bet) / 10);
};

export const getTrapDamage = (
  drums: NumberOfDrums,
  maxHealth: number
): number => {
  return Math.floor(drums * 0.1 * maxHealth);
};

export const getHealAmount = (
  drums: NumberOfDrums,
  bet: number,
  maxHealth: number
): number => {
  return Math.floor((drums * 0.1 + bet * 0.001) * maxHealth);
};
