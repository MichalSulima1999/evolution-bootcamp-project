import { Resource, Texture } from "pixi.js";
import { getFilenamesFromFolder } from "../../helpers/FileHelper";

export interface EnemyInterface {
  name: string;
  maxHealth: number;
  health: number;
  damage: number;
  idleImages: Texture<Resource>[];
  attackImages: Texture<Resource>[];
  dieImages: Texture<Resource>[];
  hurtImages: Texture<Resource>[];
  experience: number;
  hitChance: number;
}

const getTextures = (
  enemyName: string,
  stateType: string,
  numberOfFrames: number
): Texture<Resource>[] => {
  const textures = [];

  const images = getFilenamesFromFolder(
    `assets/enemies/${enemyName}/${stateType}`,
    `${enemyName}-${stateType}`,
    numberOfFrames
  );

  for (let i = 0; i < numberOfFrames; i++) {
    const texture = Texture.from(images[i]);
    textures.push(texture);
  }
  return textures;
};

export const createGoblin = (
  health: number,
  damage: number,
  experience: number,
  hitChance: number
): EnemyInterface => {
  const goblin: EnemyInterface = {
    name: "Goblin",
    maxHealth: health,
    health: health,
    damage: damage,
    idleImages: getTextures("goblin", "idle", 4),
    attackImages: getTextures("goblin", "attack", 5),
    dieImages: getTextures("goblin", "die", 4),
    hurtImages: getTextures("goblin", "hurt", 4),
    experience: experience,
    hitChance: hitChance,
  };
  return goblin;
};
