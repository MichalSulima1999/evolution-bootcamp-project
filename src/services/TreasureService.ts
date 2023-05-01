import { NumberOfDrums } from "../classes/actions/AdventureActions";

export enum Treasure {
  WEAPON = "WEAPON",
  ARMOR = "ARMOR",
  SPECIAL_ATTACK = "SPECIAL_ATTACK",
  MONEY = "MONEY",
}

export interface TreasureType {
  type: Treasure;
  amount: number;
}

const WEAPONS_DAMAGE = [15, 20, 25, 30, 35, 40, 65, 80];
const ARMORS_DEFENCE = [5, 10, 15, 20, 25, 30, 40, 55];
const SPECIAL_ATTACKS_DAMAGE = [35, 45, 55, 65, 75, 85, 100, 120];

export function getRandomTreasure(
  numberOfDrums: NumberOfDrums,
  bet: number,
  turnNumber: number
): TreasureType {
  const values = Object.values(Treasure);
  const randomIndex = Math.floor(Math.random() * values.length);

  const type = values[randomIndex];
  let amount = 0;
  let itemIndex = 0;

  switch (type) {
    case Treasure.WEAPON:
      itemIndex =
        Math.floor(turnNumber / 10) > WEAPONS_DAMAGE.length - 1
          ? WEAPONS_DAMAGE.length - 1
          : Math.floor(turnNumber / 10);
      amount = Math.floor(
        WEAPONS_DAMAGE[itemIndex] + bet * 0.05 * numberOfDrums
      );
      break;
    case Treasure.ARMOR:
      itemIndex =
        Math.floor(turnNumber / 10) > ARMORS_DEFENCE.length - 1
          ? ARMORS_DEFENCE.length - 1
          : Math.floor(turnNumber / 10);
      amount = Math.floor(
        ARMORS_DEFENCE[itemIndex] + bet * 0.05 * numberOfDrums
      );
      break;
    case Treasure.SPECIAL_ATTACK:
      itemIndex =
        Math.floor(turnNumber / 10) > SPECIAL_ATTACKS_DAMAGE.length - 1
          ? SPECIAL_ATTACKS_DAMAGE.length - 1
          : Math.floor(turnNumber / 10);
      amount = Math.floor(
        SPECIAL_ATTACKS_DAMAGE[itemIndex] + bet * 0.05 * numberOfDrums
      );
      break;
    case Treasure.MONEY:
      amount = Math.floor(
        Math.floor(Math.random() * 20) + bet * 0.05 * numberOfDrums * turnNumber
      );
      break;
  }
  console.log({
    type: type,
    amount: amount,
  });

  return {
    type: type,
    amount: amount,
  };
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
