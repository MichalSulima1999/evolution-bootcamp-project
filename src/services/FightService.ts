import { randomIntFromInterval } from "../helpers/NumberHelper";

export const getMoneyReward = (): number => {
  return randomIntFromInterval(10, 100);
};
