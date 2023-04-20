import { makeAutoObservable } from "mobx";
import React from "react";
import { SpecialAttack } from "../types";
import { loadState, saveState } from "./LocalStorageHelper";

const EXP_TO_NEXT_LEVEL = [100, 150, 220, 260, 330, 400, 500, 620, 750];
const MAX_LEVEL = EXP_TO_NEXT_LEVEL.length + 1;

export class PlayerStore {
  private _money: number = 100;
  private _health: number = 100;
  private _maxHealth: number = 100;
  private _damage: number = 10;
  private _armor: number = 0;
  private _specialAttack: SpecialAttack = { damage: 20 };
  private _level: number = 1;
  private _experience: number = 0;
  private _experienceToNextLevel: number = EXP_TO_NEXT_LEVEL[this.level - 1];
  private _freeSpins: number = 0;

  /**
   * Getter money
   * @return {number }
   */
  public get money(): number {
    return this._money;
  }

  /**
   * Getter health
   * @return {number }
   */
  public get health(): number {
    return this._health;
  }

  /**
   * Getter max health
   * @return {number }
   */
  public get maxHealth(): number {
    return this._maxHealth;
  }

  /**
   * Getter damage
   * @return {number }
   */
  public get damage(): number {
    return this._damage;
  }

  /**
   * Getter armor
   * @return {number }
   */
  public get armor(): number {
    return this._armor;
  }

  /**
   * Getter specialAttack
   * @return {SpecialAttack }
   */
  public get specialAttack(): SpecialAttack {
    return this._specialAttack;
  }

  /**
   * Getter level
   * @return {number }
   */
  public get level(): number {
    return this._level;
  }

  /**
   * Getter experience
   * @return {number }
   */
  public get experience(): number {
    return this._experience;
  }

  /**
   * Getter experienceToNextLevel
   * @return {number }
   */
  public get experienceToNextLevel(): number {
    return this._experienceToNextLevel;
  }

  /**
   * Getter freeSpins
   * @return {number }
   */
  public get freeSpins(): number {
    return this._freeSpins;
  }

  public addMoney(amount: number) {
    this._money += amount;
    saveState(this, "playerStore");
  }

  public betMoney(amount: number) {
    if (amount > this.money) {
      return;
    }
    this._money -= amount;
    saveState(this, "playerStore");
  }

  public levelUp() {
    if (this._level >= MAX_LEVEL) {
      return;
    }

    this._maxHealth += 10;
    this._health = this._maxHealth;
    this._level++;
    this._experience = 0;
    this._experienceToNextLevel = EXP_TO_NEXT_LEVEL[this._level - 1];
    saveState(this, "playerStore");
  }

  public changeArmorIfBetter(armor: number) {
    if (this._armor >= armor) {
      return;
    }

    this._armor = armor;
    saveState(this, "playerStore");
  }

  public changeDamageIfBetter(damage: number) {
    if (this._damage >= damage) {
      return;
    }
    this._damage = damage;
    saveState(this, "playerStore");
  }

  public changeSpecialAttackIfBetter(specialAttack: SpecialAttack) {
    if (this._specialAttack.damage >= specialAttack.damage) {
      return;
    }

    this._specialAttack = specialAttack;
    saveState(this, "playerStore");
  }

  public heal(amount: number) {
    this._health += amount;
    if (this._health > this._maxHealth) {
      this._health = this._maxHealth;
    }
    saveState(this, "playerStore");
  }

  public takeDamage(amount: number) {
    this._health -= amount;
    if (this._health <= 0) {
      this._health = 0;

      // Die
    }
    saveState(this, "playerStore");
  }

  public addFreeSpins(amount: number) {
    this._freeSpins += amount;
    saveState(this, "playerStore");
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    const loadedState = loadState("playerStore");
    if (loadedState) {
      const state = loadedState as PlayerStore;
      this._armor = state._armor;
      this._damage = state._damage;
      this._health = state._health;
      this._maxHealth = state._maxHealth;
      this._money = state._money;
      this._specialAttack = state._specialAttack;
      this._level = state._level;
      this._experience = state._experience;
      this._freeSpins = state._freeSpins;
    }
  }
}

export const PlayerStoreContext = React.createContext<PlayerStore | null>(null);
export const playerStore = new PlayerStore();

export function usePlayerStore() {
  const context = React.useContext(PlayerStoreContext);
  if (!context) {
    throw new Error("Wrap element with context first!");
  }
  return context;
}