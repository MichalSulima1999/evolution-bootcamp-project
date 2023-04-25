export const betBonus = (bet: number): number => {
  const a = 0.2;
  const b = 2.4;
  return a * Math.sqrt(b * bet);
};
