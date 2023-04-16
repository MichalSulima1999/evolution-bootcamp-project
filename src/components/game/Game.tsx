import { Sprite, Stage } from "@pixi/react";
import React, { useState } from "react";
import "./game.css";
import Machine from "./Machine";
import ImageButton from "./ImageButton";
import Bet from "./Bet";
import {
  Actions,
  AdventureActions,
  Drum,
  NumberOfDrums,
} from "./actions/AdventureActions";
import { useBetStore } from "../../store/BetStore";
import { observer } from "mobx-react";
import { usePlayerStore } from "../../store/PlayerStore";
import { Treasure, getRandomTreasure } from "./actions/Treasure";

const Game = observer(function Game() {
  const [drums, setDrums] = useState<Drum[]>([]);
  const [spinning, setSpinning] = useState(false);

  const { bet } = useBetStore();
  const {
    money,
    maxHealth,
    freeSpins,
    betMoney,
    changeArmorIfBetter,
    changeDamageIfBetter,
    changeSpecialAttackIfBetter,
    addMoney,
    takeDamage,
    heal,
    addFreeSpins,
  } = usePlayerStore();
  const adventureActions = new AdventureActions();

  const spin = () => {
    if (spinning) return;
    if (bet > money && freeSpins <= 0) {
      // informacja dla użytkownika
      return;
    }

    const actions: Actions = {
      fight: fightAction,
      heal: healAction,
      treasure: treasureAction,
      freeSpins: freeSpinsAction,
      trap: trapAction,
    };

    setSpinning(true);
    if (freeSpins > 0) {
      setDrums(adventureActions.spin(0, actions));
      addFreeSpins(-1);
    } else {
      betMoney(bet);
      setDrums(adventureActions.spin(bet, actions));
    }
  };

  const fightAction = (drums: NumberOfDrums) => {};

  const healAction = (drums: NumberOfDrums) => {
    heal(Math.floor((drums * 0.1 + bet * 0.001) * maxHealth));
  };

  const treasureAction = (drums: NumberOfDrums) => {
    const treasure = getRandomTreasure();

    switch (treasure.type) {
      case Treasure.WEAPON:
        changeDamageIfBetter(Math.floor(treasure.amount + bet * 0.1));
        break;
      case Treasure.ARMOR:
        changeArmorIfBetter(Math.floor(treasure.amount + bet * 0.1));
        break;
      case Treasure.SPECIAL_ATTACK:
        changeSpecialAttackIfBetter({
          damage: Math.floor(treasure.amount + bet * 0.1),
        });
        break;
      case Treasure.MONEY:
        addMoney(Math.floor(treasure.amount + bet * 0.2));
        break;
    }
  };

  const freeSpinsAction = (drums: NumberOfDrums) => {
    addFreeSpins(Math.floor((drums * bet) / 10));
  };

  const trapAction = (drums: NumberOfDrums) => {
    takeDamage(Math.floor(drums * 0.1 * maxHealth));
  };

  return (
    <div className="stage">
      <div>
        <Stage width={800} height={600} options={{ backgroundColor: 0x000000 }}>
          <Sprite
            image="/assets/dungeon-background.png"
            width={800}
            height={600}
            y={-100}
          />
          <Sprite
            image="/assets/bottom-ui.png"
            width={800}
            height={200}
            y={400}
          />
          <Machine
            drums={drums}
            spinning={spinning}
            setSpinning={setSpinning}
          />
        </Stage>
      </div>
      <div className="buttons">
        <Bet />
        <ImageButton
          onClick={spin}
          imgPath="/assets/spin.png"
          imgPressedPath="/assets/spin_pressed.png"
          width="6rem"
          height="4rem"
        />
      </div>
    </div>
  );
});

export default Game;
