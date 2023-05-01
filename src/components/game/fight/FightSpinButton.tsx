import React from "react";
import ImageButton from "../ImageButton";
import {
  FightActions,
  FightActionsMethods,
} from "../../../classes/actions/FightActions";
import {
  PlayerStore,
  usePlayerStore,
} from "../../../classes/store/PlayerStore";
import { NumberOfDrums } from "../../../classes/actions/AdventureActions";
import { BetStore, useBetStore } from "../../../classes/store/BetStore";
import {
  DrawnActionAnimationInterface,
  FightDrum,
  FightPlayerAction,
} from "../../../types";
import { observer } from "mobx-react";
import { Images } from "../../../helpers/FileHelper";
import useDidUpdateEffect from "../../../hooks/UseDidUpdateEffect";

interface ButtonProps {
  spinning: boolean;
  setSpinning: React.Dispatch<React.SetStateAction<boolean>>;
  setDrums: React.Dispatch<React.SetStateAction<FightDrum[]>>;
  setPlayerFightAction: React.Dispatch<
    React.SetStateAction<FightPlayerAction | null>
  >;
  isPlayerTurn: boolean;
  setShowDrawnActionAnimation: React.Dispatch<
    React.SetStateAction<DrawnActionAnimationInterface>
  >;
}

const FightSpinButton: React.FC<ButtonProps> = observer(
  function FightSpinButton({
    spinning,
    setSpinning,
    setDrums,
    setPlayerFightAction,
    isPlayerTurn,
    setShowDrawnActionAnimation,
  }) {
    const fightActions = new FightActions();
    const { money, freeSpins, betMoney, addFreeSpins } = usePlayerStore();

    const { bet } = useBetStore();

    useDidUpdateEffect(() => {
      if (spinning) return;

      const actions: FightActionsMethods = {
        attack: function (drums: NumberOfDrums): void {
          setPlayerFightAction({
            action: FightDrum.ATTACK,
            numberOfDrums: drums,
          });
        },
        specialAttack: function (drums: NumberOfDrums): void {
          setPlayerFightAction({
            action: FightDrum.SPECIAL_ATTACK,
            numberOfDrums: drums,
          });
        },
        defend: function (drums: NumberOfDrums): void {
          setPlayerFightAction({
            action: FightDrum.DEFEND,
            numberOfDrums: drums,
          });
        },
        none: function (): void {
          setPlayerFightAction(null);
        },
      };

      if (freeSpins > 0) {
        setDrums(fightActions.spin(10, actions));
        addFreeSpins(-1);
      } else {
        betMoney(bet);
        setDrums(fightActions.spin(bet, actions));
      }
    }, [spinning]);

    const spin = () => {
      if (spinning || !isPlayerTurn) return;
      if (bet > money && freeSpins <= 0) {
        setShowDrawnActionAnimation({
          show: true,
          image: Images.COIN,
          text: "NO GOLD!",
        });
        return;
      }

      setSpinning(true);
    };

    return (
      <div>
        <ImageButton
          onClick={spin}
          imgPath="/assets/spin.png"
          imgPressedPath="/assets/spin_pressed.png"
          width="6rem"
          height="4rem"
        />
      </div>
    );
  }
);

export default FightSpinButton;
