import express from "express";
import { Bot } from "grammy";
import { botToken } from "./config.js";
import { getTracks } from "./getTracks.js";

const bot = new Bot(botToken); // <-- put your bot token between the ""

bot.on("inline_query", async ctx => {
  const results = await getTracks(ctx.update.inline_query.query);
  await ctx.answerInlineQuery(results, { cache_time: 60 * 60 * 24 * 30 });
});

// Start the bot
bot.start();

const app = express();
const port = 8000;

app.get("/health", (req, res) => {
  res.send("OK");
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});
