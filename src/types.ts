export enum GameMode {
  ADVENTURE,
  FIGHT,
}

export interface SpecialAttack {
  damage: number;
}

export interface LevelUpInterface {
  hpToAdd: number;
  nextLevel: number;
  experienceToNextLevel: number;
}

export interface PlayerStats {
  money: number;
  maxHealth: number;
  damage: number;
  armor: number;
  specialAttack: SpecialAttack;
  experienceToNextLevel: number;
}

export enum FightDrum {
  ATTACK,
  SPECIAL_ATTACK,
  DEFEND,
}

export interface FightPlayerAction {
  action: FightDrum;
  numberOfDrums: number;
}

export interface DrawnActionAnimationInterface {
  show: boolean;
  image: string;
  text: string;
}
