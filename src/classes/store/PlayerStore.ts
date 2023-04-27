import { makeAutoObservable } from "mobx";
import React from "react";
import { LevelUpInterface, SpecialAttack } from "../../types";
import { loadState, saveState } from "../../helpers/LocalStorageHelper";
import { getInitialStats, getMaxLevel } from "../../services/PlayerService";
import { levelUpPlayer } from "../../services/PlayerService";

export class PlayerStore {
  private _money: number;
  private _health: number;
  private _maxHealth: number;
  private _damage: number;
  private _armor: number;
  private _specialAttack: SpecialAttack;
  private _level: number;
  private _experience: number;
  private _experienceToNextLevel: number;
  private _freeSpins: number;

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

  public levelUp(stats: LevelUpInterface) {
    if (this._level >= getMaxLevel()) {
      return;
    }

    this._maxHealth += stats.hpToAdd;
    this._health = this._maxHealth;
    this._level = stats.nextLevel;
    this._experience = 0;
    this._experienceToNextLevel = stats.experienceToNextLevel;
    saveState(this, "playerStore");
  }

  public addExperience(experience: number) {
    const exp = experience + this._experience;
    if (exp >= this._experienceToNextLevel) {
      this._experience = exp - this._experienceToNextLevel;
      this.levelUp(levelUpPlayer(this._level));
    } else {
      this._experience = exp;
    }
  }

  public changeArmorIfBetter(armor: number): boolean {
    if (this._armor >= armor) {
      return false;
    }

    this._armor = armor;
    saveState(this, "playerStore");
    return true;
  }

  public changeDamageIfBetter(damage: number): boolean {
    if (this._damage >= damage) {
      return false;
    }
    this._damage = damage;
    saveState(this, "playerStore");
    return true;
  }

  public changeSpecialAttackIfBetter(specialAttack: SpecialAttack): boolean {
    if (this._specialAttack.damage >= specialAttack.damage) {
      return false;
    }

    this._specialAttack = specialAttack;
    saveState(this, "playerStore");
    return true;
  }

  public heal(amount: number) {
    this._health += amount;
    if (this._health > this._maxHealth) {
      this._health = this._maxHealth;
    }
    saveState(this, "playerStore");
  }

  public takeDamage(amount: number) {
    if (amount <= 0) return;
    this._health -= amount;
    if (this._health <= 0) {
      this._health = 0;

      this.die();
    }
    saveState(this, "playerStore");
  }

  public addFreeSpins(amount: number) {
    this._freeSpins += amount;
    saveState(this, "playerStore");
  }

  private die() {
    this.resetStats();
  }

  private resetStats() {
    const stats = getInitialStats();
    this._armor = stats.armor;
    this._damage = stats.damage;
    this._maxHealth = stats.maxHealth;
    this._money = stats.money;
    this._specialAttack = stats.specialAttack;
    this._health = this._maxHealth;
    this._experienceToNextLevel = stats.experienceToNextLevel;
    this._level = 1;
    this._experience = 0;
    this._freeSpins = 0;
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
      this._experienceToNextLevel = state._experienceToNextLevel;
    } else {
      const stats = getInitialStats();
      this._armor = stats.armor;
      this._damage = stats.damage;
      this._maxHealth = stats.maxHealth;
      this._money = stats.money;
      this._specialAttack = stats.specialAttack;
      this._health = this._maxHealth;
      this._experienceToNextLevel = stats.experienceToNextLevel;
      this._level = 1;
      this._experience = 0;
      this._freeSpins = 0;
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
