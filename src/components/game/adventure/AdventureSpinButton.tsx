import React from "react";
import {
  Actions,
  AdventureActions,
  Drum,
  NumberOfDrums,
} from "../../../classes/actions/AdventureActions";
import { PlayerStore } from "../../../classes/store/PlayerStore";
import { GameMode } from "../../../types";
import {
  Treasure,
  getFreeSpins,
  getHealAmount,
  getRandomTreasure,
  getTrapDamage,
} from "../../../services/TreasureService";
import ImageButton from "../ImageButton";
import { BetStore } from "../../../classes/store/BetStore";

interface ButtonProps {
  spinning: boolean;
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  drums: Drum[];
  setDrums: React.Dispatch<React.SetStateAction<Drum[]>>;
  usePlayerStore: PlayerStore;
  useBetStore: BetStore;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
}

const AdventureSpinButton: React.FC<ButtonProps> = ({
  spinning,
  setSpinning,
  drums,
  setDrums,
  usePlayerStore,
  useBetStore,
  setGameMode,
}) => {
  const adventureActions = new AdventureActions();

  const { bet } = useBetStore;

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
  } = usePlayerStore;

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

  const fightAction = (drums: NumberOfDrums) => {
    setGameMode(GameMode.FIGHT);
  };

  const healAction = (drums: NumberOfDrums) => {
    heal(getHealAmount(drums, bet, maxHealth));
  };

  const treasureAction = (drums: NumberOfDrums) => {
    const treasure = getRandomTreasure(drums, bet);

    switch (treasure.type) {
      case Treasure.WEAPON:
        changeDamageIfBetter(treasure.amount);
        break;
      case Treasure.ARMOR:
        changeArmorIfBetter(treasure.amount);
        break;
      case Treasure.SPECIAL_ATTACK:
        changeSpecialAttackIfBetter({
          damage: treasure.amount,
        });
        break;
      case Treasure.MONEY:
        addMoney(treasure.amount);
        break;
    }
  };

  const freeSpinsAction = (drums: NumberOfDrums) => {
    addFreeSpins(getFreeSpins(drums, bet));
  };

  const trapAction = (drums: NumberOfDrums) => {
    takeDamage(getTrapDamage(drums, maxHealth));
  };
  return (
    <ImageButton
      onClick={spin}
      imgPath="/assets/spin.png"
      imgPressedPath="/assets/spin_pressed.png"
      width="6rem"
      height="4rem"
    />
  );
};

export default AdventureSpinButton;
