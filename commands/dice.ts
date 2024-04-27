import Chance from "chance";
import { CoinbotCommand } from "./type";

const chance = new Chance();

const dice: CoinbotCommand = (query) => {
  const defaultN = 6;
  const n = Number(query) || defaultN;

  const description = `Number between 1 and ${n}`;
  let disclaimer = "";

  if (n !== defaultN) {
    disclaimer = `_${description}_\n\n`;
  }

  return {
    title: "Roll a dice",
    trigger: "dice",
    enabled: true,
    message: `${disclaimer}Dice rolled: *${chance.integer({
      min: 1,
      max: n,
    })}*`,
    description,
    parameter: "[Sides of the dice]",
    thumb: "dice.png",
  };
};

export default dice;
