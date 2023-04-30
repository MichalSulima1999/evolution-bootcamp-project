import React from "react";
import { usePlayerStore } from "../classes/store/PlayerStore";
import { observer } from "mobx-react";
import styled from "styled-components";

const Header = styled.header`
  padding: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  text-align: center;
`;

const H1 = styled.h1`
  margin: 1rem;
`;

const Stats = styled.div`
  display: flex;
  justify-content: space-around;
  > div {
    display: flex;
    align-items: center;
    border-radius: 25px;
    border: 2px solid #73ad21;
    padding: 10px;
  }
  img {
    width: 25px;
    margin-right: 1rem;
  }
`;

const PlayerStats = observer(function PlayerStats() {
  const {
    money,
    addMoney,
    health,
    maxHealth,
    armor,
    damage,
    specialAttack,
    freeSpins,
    experience,
    experienceToNextLevel,
    level,
  } = usePlayerStore();
  return (
    <Header>
      <H1>SlotQuest</H1>
      <Stats>
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
        <div>
          <img src="assets/Exp.png" alt="special" />
          {experience} / {experienceToNextLevel}
        </div>
        <div>
          <img src="assets/Level.png" alt="level" />
          {level}
        </div>
        <div>
          <img src="assets/Free-spins.png" alt="spins" />
          {freeSpins}
        </div>
        <button
          onClick={() => {
            addMoney(10);
          }}
        >
          Add money
        </button>
      </Stats>
    </Header>
  );
});

export default PlayerStats;
