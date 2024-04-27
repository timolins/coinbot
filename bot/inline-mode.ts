import { Composer } from "telegraf";
import { commands } from "../commands";
import {
  InlineQueryResult,
  InlineQueryResultDocument,
} from "telegraf/typings/core/types/typegram";
import { CoinbotCommandResult } from "../commands/type";

const url = process.env.URL || process.env.VERCEL_URL;

const buildAnswer = (command: CoinbotCommandResult) => {
  const { title, message, description, thumb } = command;

  let answer: InlineQueryResult = {
    id: title,
    title,
    description,
    type: "article",
    input_message_content: {
      message_text: message,
      parse_mode: "Markdown",
    },
  };

  if (url && thumb) {
    answer.thumbnail_url = `${url}/thumbs/${thumb}`;
  }

  return answer;
};

export default Composer.mount("inline_query", (ctx) => {
  const { query } = ctx.inlineQuery;

  const results = commands
    .map((command) => command(query))
    .filter((command) => command && command.enabled)
    .map((command) => buildAnswer(command));

  ctx.answerInlineQuery(results, {
    is_personal: true,
    cache_time: 0,
  });
});
