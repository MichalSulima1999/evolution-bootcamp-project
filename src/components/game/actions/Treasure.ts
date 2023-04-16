export enum Treasure {
  WEAPON,
  ARMOR,
  SPECIAL_ATTACK,
  MONEY,
}

export interface TreasureType {
  type: Treasure;
  amount: number;
}

const weaponsDamage = [15, 20, 25, 30, 35, 40];
const armorDefense = [5, 10, 15, 20, 25, 30];
const specialAttacksDamage = [35, 45, 55, 65, 75, 85];

export function getRandomTreasure(): TreasureType {
  const values = Object.values(Treasure);
  const randomIndex = Math.floor(Math.random() * values.length);
  console.log(values[randomIndex]);

  const type = values[randomIndex] as Treasure;

  switch (type) {
    case Treasure.WEAPON:
      const weapon =
        weaponsDamage[Math.floor(Math.random() * weaponsDamage.length)];
      return {
        type: Treasure.WEAPON,
        amount: weapon,
      };
    case Treasure.ARMOR:
      const armor =
        armorDefense[Math.floor(Math.random() * armorDefense.length)];
      return {
        type: Treasure.ARMOR,
        amount: armor,
      };
    case Treasure.SPECIAL_ATTACK:
      const specialAttack =
        specialAttacksDamage[
          Math.floor(Math.random() * specialAttacksDamage.length)
        ];
      return {
        type: Treasure.SPECIAL_ATTACK,
        amount: specialAttack,
      };
    case Treasure.MONEY:
      const money = Math.floor(Math.random() * 20);
      return {
        type: Treasure.MONEY,
        amount: money,
      };
  }
}
