import { makeAutoObservable } from "mobx";
import React from "react";
import { SpecialAttack } from "../types";
import { loadState, saveState } from "./LocalStorageHelper";

export class PlayerStore {
  private _money: number = 100;
  private _health: number = 100;
  private _maxHealth: number = 100;
  private _damage: number = 10;
  private _armor: number = 10;
  private _specialAttack: SpecialAttack = { damage: 20 };

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

  public addMoney(amount: number) {
    this._money += amount;
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
