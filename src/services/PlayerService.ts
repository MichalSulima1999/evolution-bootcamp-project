import { LevelUpInterface, PlayerStats } from "../types";

const EXP_TO_NEXT_LEVEL = [100, 150, 220, 260, 330, 400, 500, 620, 750];

export const getMaxLevel = (): number => {
  return EXP_TO_NEXT_LEVEL.length + 1;
};

export const getExpToNextLevel = (level: number): number => {
  if (level > getMaxLevel()) {
    return Number.MAX_SAFE_INTEGER;
  }

  return EXP_TO_NEXT_LEVEL[level - 1];
};

export const levelUpPlayer = (level: number): LevelUpInterface => {
  if (level >= getMaxLevel()) {
    return {
      hpToAdd: 0,
      nextLevel: getMaxLevel(),
      experienceToNextLevel: Number.MAX_SAFE_INTEGER,
    };
  }

  const stats: LevelUpInterface = {
    hpToAdd: 10,
    nextLevel: level + 1,
    experienceToNextLevel: EXP_TO_NEXT_LEVEL[level],
  };
  return stats;
};

export const getInitialStats = (): PlayerStats => {
  const stats: PlayerStats = {
    money: 100,
    maxHealth: 100,
    damage: 10,
    armor: 0,
    specialAttack: {
      damage: 20,
    },
    experienceToNextLevel: getExpToNextLevel(1),
  };
  return stats;
};
