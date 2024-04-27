import Chance from "chance";
import { CoinbotCommand } from "./type";

const chance = new Chance();

const rockPaperScissors: CoinbotCommand = () => ({
  title: "Rock, paper, scissors",
  trigger: "rps",
  enabled: true,
  message: `*${chance.pick(["Rock", "Paper", "Scissors"])}*`,
  description: "Either Rock, Paper or Scissors",
  thumb: "rock-paper-scissors.png",
});

export default rockPaperScissors;
