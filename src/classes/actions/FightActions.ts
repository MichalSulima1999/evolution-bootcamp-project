import { FightDrum } from "../../types";
import { NumberOfDrums } from "./AdventureActions";

export interface FightActionsMethods {
  attack: (drums: NumberOfDrums) => void;
  specialAttack: (drums: NumberOfDrums) => void;
  defend: (drums: NumberOfDrums) => void;
  none: () => void;
}

export class FightActions {
  private drum1: FightDrum = FightDrum.ATTACK;
  private drum2: FightDrum = FightDrum.ATTACK;
  private drum3: FightDrum = FightDrum.ATTACK;

  public spin(bet: number, actions: FightActionsMethods): FightDrum[] {
    this.drum1 = this.getRandomDrum();
    this.drum2 = this.getRandomDrum();
    this.drum3 = this.getRandomDrum();

    if (this.drum1 === this.drum2 && this.drum2 === this.drum3) {
      switch (this.drum1) {
        case FightDrum.ATTACK:
          actions.attack(3);
          break;
        case FightDrum.SPECIAL_ATTACK:
          actions.specialAttack(3);
          break;
        case FightDrum.DEFEND:
          actions.defend(3);
          break;
      }
    } else if (
      this.drum1 === this.drum2 ||
      this.drum1 === this.drum3 ||
      this.drum2 === this.drum3
    ) {
      const drumValue =
        this.drum1 === this.drum2
          ? this.drum1
          : this.drum2 === this.drum3
          ? this.drum2
          : this.drum1;

      switch (drumValue) {
        case FightDrum.ATTACK:
          actions.attack(2);
          break;
        case FightDrum.SPECIAL_ATTACK:
          actions.specialAttack(2);
          break;
        case FightDrum.DEFEND:
          actions.defend(2);
          break;
      }
    } else {
      actions.none();
    }
    return [this.drum1, this.drum2, this.drum3];
  }

  private getRandomDrum(): FightDrum {
    const randomIndex = Math.floor(Math.random() * 3);

    switch (randomIndex) {
      case 0:
        return FightDrum.ATTACK;
      case 1:
        return FightDrum.SPECIAL_ATTACK;
      case 2:
        return FightDrum.DEFEND;
      default:
        throw new Error("Invalid random index generated");
    }
  }
}
