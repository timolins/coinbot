import { Telegraf } from "telegraf";

import { VercelRequest, VercelResponse } from "@vercel/node";
import { development, production, registerWebhook } from "./handlers";
import chatMode from "./chat-mode";
import inlineMode from "./inline-mode";

const BOT_TOKEN = process.env.BOT_TOKEN;
const ENVIRONMENT = process.env.NODE_ENV;

if (!BOT_TOKEN) {
  throw new Error("BOT_TOKEN is not set");
}

const bot = new Telegraf(BOT_TOKEN);

bot.use(chatMode);
bot.use(inlineMode);

// Production Mode
//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  const path = req.url;

  if (path === "/api/register") {
    const didUpdate = await registerWebhook(
      bot,
      `https://${process.env.VERCEL_URL}/api`
    );

    return res.send(didUpdate ? "Webhook set." : "Webhook already exists.");
  }

  return production(req, res, bot);
};

// Dev Mode
if (ENVIRONMENT !== "production") {
  development(bot);
}
