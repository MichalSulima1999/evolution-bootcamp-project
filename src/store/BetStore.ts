import { makeAutoObservable } from "mobx";
import React from "react";

const MIN_BET = 10;
const MAX_BET = 100;
const BET_STEP = 10;

export class BetStore {
  private _bet: number = 10;

  /**
   * Getter bet
   * @return {number }
   */
  public get bet(): number {
    return this._bet;
  }

  public betMore() {
    if (this._bet >= MAX_BET) {
      return;
    }

    this._bet += BET_STEP;
  }

  public betLess() {
    if (this._bet <= MIN_BET) {
      return;
    }

    this._bet -= BET_STEP;
  }

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

export const BetStoreContext = React.createContext<BetStore | null>(null);
export const betStore = new BetStore();

export function useBetStore() {
  const context = React.useContext(BetStoreContext);
  if (!context) {
    throw new Error("Wrap element with context first!");
  }
  return context;
}
