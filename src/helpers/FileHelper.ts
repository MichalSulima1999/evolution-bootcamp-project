export enum Images {
  SWORD = "assets/sword.png",
  HEART = "assets/heart.png",
  COIN = "assets/coin.png",
  CHEST = "assets/ChestYellow.png",
  ARMOR = "assets/breastplate.png",
  SHIELD = "assets/shield.png",
  TRAP = "assets/trap.png",
  SWORD_SPECIAL = "assets/sword_special.png",
  FREE_SPINS = "assets/Free-spins.png",
  LVL_UP = "assets/arrow_up.png",
  UI_BACKGROUND = "assets/bottom-ui.png",
  BUTTON = "assets/button.png",
}

export function getFilenamesFromFolder(
  folderPath: string,
  imageName: string,
  numberOfImages: number
): string[] {
  const files: string[] = [];

  for (let i = 0; i < numberOfImages; i++) {
    files.push(`${folderPath}/${imageName}-${i + 1}.png`);
  }

  return files;
}
