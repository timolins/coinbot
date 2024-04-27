import Chance from "chance";
import { CoinbotCommand } from "./type";

const chance = new Chance();

const coin: CoinbotCommand = () => ({
  title: "Flip a coin",
  trigger: "coin",
  enabled: true,
  message: `Coin flipped: *${chance.pick(["Heads", "Tails"])}*`,
  description: "Heads or Tails",
  thumb: "coin.png",
});

export default coin;
