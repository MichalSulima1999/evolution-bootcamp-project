enum Drum {
  FIGHT,
  TREASURE,
  HEAL,
  FREE_SPINS,
  TRAP,
  WILD_CARD,
}

export class AdventureActions {
  private bet: number = 0;
  private drum1: Drum = Drum.FIGHT;
  private drum2: Drum = Drum.FIGHT;
  private drum3: Drum = Drum.FIGHT;

  public spin(bet: number) {
    this.bet = bet;

    this.drum1 = this.getRandomDrum();
    this.drum2 = this.getRandomDrum();
    this.drum3 = this.getRandomDrum();

    // Check if all drums have the same value
    if (this.drum1 === this.drum2 && this.drum2 === this.drum3) {
      console.log(`3 - ${this.drum1}`);
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
    }
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

  private fight() {}

  private treasure() {}

  private heal() {}

  private freeSpins() {}

  private trap() {}
}
