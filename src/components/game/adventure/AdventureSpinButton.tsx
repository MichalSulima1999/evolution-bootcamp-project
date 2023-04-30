import React from "react";
import {
  Actions,
  AdventureActions,
  Drum,
  NumberOfDrums,
} from "../../../classes/actions/AdventureActions";
import { usePlayerStore } from "../../../classes/store/PlayerStore";
import { DrawnActionAnimationInterface, GameMode } from "../../../types";
import {
  Treasure,
  getFreeSpins,
  getHealAmount,
  getRandomTreasure,
  getTrapDamage,
} from "../../../services/TreasureService";
import ImageButton from "../ImageButton";
import { useBetStore } from "../../../classes/store/BetStore";
import { Images } from "../../../helpers/FileHelper";
import { observer } from "mobx-react";
import useDidUpdateEffect from "../../../hooks/UseDidUpdateEffect";

interface ButtonProps {
  spinning: boolean;
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfEnemies: React.Dispatch<React.SetStateAction<number>>;
  drums: Drum[];
  setDrums: React.Dispatch<React.SetStateAction<Drum[]>>;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  setShowDrawnActionAnimation: React.Dispatch<
    React.SetStateAction<DrawnActionAnimationInterface>
  >;
  showMenu: boolean;
  preventAdventureFromSpinning: boolean;
  setPreventAdventureFromSpinning: React.Dispatch<
    React.SetStateAction<boolean>
  >;
}

const AdventureSpinButton: React.FC<ButtonProps> = observer(
  function AdventureSpinButton({
    spinning,
    setSpinning,
    setNumberOfEnemies,
    setDrums,
    setGameMode,
    setShowDrawnActionAnimation,
    showMenu,
    preventAdventureFromSpinning,
    setPreventAdventureFromSpinning,
  }) {
    const adventureActions = new AdventureActions();

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
      increaseTurns,
    } = usePlayerStore();

    useDidUpdateEffect(() => {
      if (spinning || showMenu) return;

      // Fix to spinning after fight ended
      if (preventAdventureFromSpinning) {
        setPreventAdventureFromSpinning(false);
        return;
      }

      const actions: Actions = {
        fight: fightAction,
        heal: healAction,
        treasure: treasureAction,
        freeSpins: freeSpinsAction,
        trap: trapAction,
      };

      if (freeSpins > 0) {
        setDrums(adventureActions.spin(0, actions));
        addFreeSpins(-1);
      } else {
        betMoney(bet);
        setDrums(adventureActions.spin(bet, actions));
      }
    }, [spinning]);

    const spin = () => {
      if (spinning) return;
      if (bet > money && freeSpins <= 0) {
        setShowDrawnActionAnimation({
          show: true,
          image: Images.COIN,
          text: "NO GOLD!",
        });
        return;
      }

      setSpinning(true);
      increaseTurns();
    };

    const fightAction = (drums: NumberOfDrums) => {
      setNumberOfEnemies(drums);
      setGameMode(GameMode.FIGHT);
      setShowDrawnActionAnimation({
        show: true,
        image: Images.SWORD,
        text: "FIGHT",
      });
    };

    const healAction = (drums: NumberOfDrums) => {
      const amount = getHealAmount(drums, bet, maxHealth);
      heal(amount);
      setShowDrawnActionAnimation({
        show: true,
        image: Images.HEART,
        text: "+ " + amount,
      });
    };

    const treasureAction = (drums: NumberOfDrums) => {
      const treasure = getRandomTreasure(drums, bet);

      switch (treasure.type) {
        case Treasure.WEAPON:
          const changedWeapon = changeDamageIfBetter(treasure.amount);
          setShowDrawnActionAnimation({
            show: true,
            image: Images.SWORD,
            text: (changedWeapon ? "Better: " : "Worse: ") + treasure.amount,
          });
          break;
        case Treasure.ARMOR:
          const changedArmor = changeArmorIfBetter(treasure.amount);
          setShowDrawnActionAnimation({
            show: true,
            image: Images.ARMOR,
            text: (changedArmor ? "Better: " : "Worse: ") + treasure.amount,
          });
          break;
        case Treasure.SPECIAL_ATTACK:
          const changedSpecial = changeSpecialAttackIfBetter({
            damage: treasure.amount,
          });
          setShowDrawnActionAnimation({
            show: true,
            image: Images.SWORD_SPECIAL,
            text: (changedSpecial ? "Better: " : "Worse: ") + treasure.amount,
          });
          break;
        case Treasure.MONEY:
          addMoney(treasure.amount);
          setShowDrawnActionAnimation({
            show: true,
            image: Images.COIN,
            text: "+ " + treasure.amount,
          });
          break;
      }
    };

    const freeSpinsAction = (drums: NumberOfDrums) => {
      const numberOfFreeSpins = getFreeSpins(drums, bet);
      addFreeSpins(numberOfFreeSpins);

      setShowDrawnActionAnimation({
        show: true,
        image: Images.FREE_SPINS,
        text: "+ " + numberOfFreeSpins,
      });
    };

    const trapAction = (drums: NumberOfDrums) => {
      const damage = getTrapDamage(drums, maxHealth);
      takeDamage(damage);

      setShowDrawnActionAnimation({
        show: true,
        image: Images.HEART,
        text: "TRAP! -" + damage + " HP",
      });
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
  }
);

export default AdventureSpinButton;
