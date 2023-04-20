export enum Drum {
  FIGHT,
  TREASURE,
  HEAL,
  FREE_SPINS,
  TRAP,
  WILD_CARD,
}

export enum NumberOfDrums {
  TWO = 2,
  THREE = 3,
}

export interface Actions {
  fight: (drums: NumberOfDrums) => void;
  treasure: (drums: NumberOfDrums) => void;
  heal: (drums: NumberOfDrums) => void;
  freeSpins: (drums: NumberOfDrums) => void;
  trap: (drums: NumberOfDrums) => void;
}

export class AdventureActions {
  private _bet: number = 0;
  private drum1: Drum = Drum.FIGHT;
  private drum2: Drum = Drum.FIGHT;
  private drum3: Drum = Drum.FIGHT;

  /**
   * Getter bet
   * @return {number }
   */
  public get bet(): number {
    return this._bet;
  }

  public spin(bet: number, actions: Actions): Drum[] {
    console.log(bet);

    this._bet = bet;

    this.drum1 = this.getRandomDrum();
    this.drum2 = this.getRandomDrum();
    this.drum3 = this.getRandomDrum();

    // Check if all drums have the same value
    if (
      (this.drum1 === this.drum2 && this.drum2 === this.drum3) ||
      (this.drum1 === this.drum2 && this.drum3 === Drum.WILD_CARD) ||
      (this.drum1 === this.drum3 && this.drum2 === Drum.WILD_CARD) ||
      (this.drum2 === this.drum3 && this.drum1 === Drum.WILD_CARD)
    ) {
      switch (this.drum1) {
        case Drum.FIGHT:
          actions.fight(3);
          break;
        case Drum.TREASURE:
          actions.treasure(3);
          break;
        case Drum.HEAL:
          actions.heal(3);
          break;
        case Drum.FREE_SPINS:
          actions.freeSpins(3);
          break;
        case Drum.TRAP:
          actions.trap(3);
          break;
        case Drum.WILD_CARD:
          return this.spin(bet, actions);
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

      console.log(`2 - ${drumValue}`);
      switch (drumValue) {
        case Drum.FIGHT:
          actions.fight(2);
          break;
        case Drum.TREASURE:
          actions.treasure(2);
          break;
        case Drum.HEAL:
          actions.heal(2);
          break;
        case Drum.FREE_SPINS:
          actions.freeSpins(2);
          break;
        case Drum.TRAP:
          actions.trap(2);
          break;
        case Drum.WILD_CARD:
          return this.spin(bet, actions);
      }
    }
    return [this.drum1, this.drum2, this.drum3];
  }

  private getRandomDrum(): Drum {
    const randomIndex = Math.floor(Math.random() * 6);

    switch (randomIndex) {
      case 0:
        return Drum.FIGHT;
      case 1:
        return Drum.TREASURE;
      case 2:
        return Drum.HEAL;
      case 3:
        return Drum.FREE_SPINS;
      case 4:
        return Drum.TRAP;
      case 5:
        return Drum.WILD_CARD;
      default:
        throw new Error("Invalid random index generated");
    }
  }
}
