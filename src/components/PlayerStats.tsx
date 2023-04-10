import React from "react";
import { usePlayerStore } from "../store/PlayerStore";
import { observer } from "mobx-react";

const PlayerStats = observer(function PlayerStats() {
  const { money, addMoney, health, maxHealth, armor, damage, specialAttack } =
    usePlayerStore();
  return (
    <header>
      <h1>SlotQuest</h1>
      <div className="stats">
        <div>
          <img src="assets/coin.png" alt="coin" />
          {money}$
        </div>
        <div>
          <img src="assets/heart.png" alt="heart" />
          {health} / {maxHealth}
        </div>
        <div>
          <img src="assets/breastplate.png" alt="armor" />
          {armor}
        </div>
        <div>
          <img src="assets/sword.png" alt="sword" />
          {damage}
        </div>
        <div>
          <img src="assets/sword_special.png" alt="special" />
          {specialAttack.damage}
        </div>
        <button
          onClick={() => {
            addMoney(10);
          }}
        >
          Add money
        </button>
      </div>
    </header>
  );
});

export default PlayerStats;
