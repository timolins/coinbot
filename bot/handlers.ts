import { Context, Telegraf } from "telegraf";
import { Update } from "telegraf/typings/core/types/typegram";
import { VercelRequest, VercelResponse } from "@vercel/node";
import createDebug from "debug";

const debug = createDebug("bot:dev");

const development = async (bot: Telegraf<Context<Update>>) => {
  const botInfo = await bot.telegram.getMe();

  debug("Bot runs in development mode");
  debug(`${botInfo} deleting webhook`);
  await bot.telegram.deleteWebhook();
  debug(`${botInfo} starting polling`);

  await bot.launch();

  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};

const VERCEL_URL = `${process.env.VERCEL_URL}`;

export const registerWebhook = async (
  bot: Telegraf<Context<Update>>,
  webhookUrl: string
): Promise<boolean> => {
  const getWebhookInfo = await bot.telegram.getWebhookInfo();

  debug(`setting webhook: ${webhookUrl}`);

  if (getWebhookInfo.url !== webhookUrl) {
    debug(`deleting webhook ${getWebhookInfo.url}`);
    await bot.telegram.deleteWebhook();
    debug(`setting webhook: ${webhookUrl}`);
    await bot.telegram.setWebhook(webhookUrl);

    return true;
  }

  return false;
};

const production = async (
  req: VercelRequest,
  res: VercelResponse,
  bot: Telegraf<Context<Update>>
) => {
  debug("Bot runs in production mode");

  if (!VERCEL_URL) {
    throw new Error("VERCEL_URL is not set.");
  }

  if (req.method === "POST") {
    debug("Received update");
    await bot.handleUpdate(req.body as unknown as Update, res);
  } else {
    res.status(200).json("Listening to bot events...");
  }
};
export { production, development };
