import { getFilenamesFromFolder } from "../../helpers/FileHelper";
import { Enemy } from "./Enemy";

export class Goblin extends Enemy {
  constructor() {
    const idleImages = getFilenamesFromFolder(
      "/assets/enemies/goblin/idle",
      "goblin-idle",
      4
    );
    const attackImages = getFilenamesFromFolder(
      "/assets/enemies/goblin/attack",
      "goblin-attack",
      5
    );
    const dieImages = getFilenamesFromFolder(
      "/assets/enemies/goblin/die",
      "goblin-die",
      4
    );
    const hurtImages = getFilenamesFromFolder(
      "/assets/enemies/goblin/hurt",
      "goblin-hurt",
      4
    );

    super("Goblin", 100, 10, idleImages, attackImages, dieImages, hurtImages);
  }
}
