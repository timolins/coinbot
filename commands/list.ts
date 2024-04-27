import Chance from "chance";
import { CoinbotCommand } from "./type";

const chance = new Chance();

const queryToArray = (query: string) =>
  query
    .split(/,|\n/)
    .map((item) => item.trim())
    .filter((item) => item !== "");

const list: CoinbotCommand = (query = "") => {
  const items = queryToArray(query);
  const enabled = items.length > 1;
  const message = enabled
    ? `List: _${items.join(", ")}_\n\nI choose: *${chance.pick(items)}*`
    : "";

  return {
    title: "Item from list",
    trigger: "list",
    enabled,
    message,
    description: "Random item",
    parameter: "Item1, Item2, ...",
    thumb: "list.png",
  };
};

export default list;
