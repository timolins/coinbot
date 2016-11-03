<div style="text-align: center;"><img width="100" alt="CoinBot Logo" src="static/header.png"></div>

</br>
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)

[CoinBot](https://telegram.me/coinbot) is a tiny bot for Telegram, that helps you with random decisions. It works inline and inside the chat.

## Usage


| Name | Command | Parameter |
| --- | --- | --- |
| Flip a coin | `/coin` | - |
| Roll a dice | `/dice` | _[Sides of the dice]_ |
| Choose from list | `/list` | Item1, Item2, ... |

#### Examples

`/coin` ⇒ **Tails**

`/dice` ⇒ **5**

`/dice 26` ⇒ **24**

`/list Pizza, Sushi, Burger` ⇒ **Sushi**

_Inline:_

`@coinbot npm, yarn`  ⇒ **yarn**


## Development

CoinBot was built with extensibility in mind. That's why it is based on the following principles and technologies:

* Based on [Telegraf](https://github.com/telegraf/telegraf) – A **modern** framework for Telegram bots.
* Commands are **modular** – They are split into individual files and work inside the chat & inline on the fly.
* [Website](https://coinbot.timo.sh) **updates automatically** – It's built with [Next.js](https://github.com/zeit/next.js) and reads the same files the bot is using. If you add command to the bot, it will also be on the website.

#### Run it locally

After you cloned the repository to your computer, you can **run it** with `npm run dev`\*.

This command will start the bot itself AND the website on port 3000. It's also possible to start only one of them with either `npm run dev:bot` or `npm run dev:bot`.

_\* You have to set the environment variable `TOKEN` to your Telgram Bot Token in order for it to work. You can obtain it from the [BotFather](https://telegram.me/BotFather)._

#### Run it in production

Same rules apply as above, but for an production environment I suggest to use `npm run build` and `npm start`. `:bot` and `:web` can also be applied on those two commands.


### Writing a new command

To get started, I would suggest to take a look at the files in the `commands/` directory. Every command is described with a `function` that returns an `Object`.


#### Example

```js
export default query => ({
  title: 'Demo',
  trigger: 'demo',
  enabled: true,
  message: `This is a demo. Given query: ${query}`,
  description: `Random item`,
  parameter: 'Example',
  thumb: 'list.png'
})
```

#### Options

| Key | Type | Required | Description |
| --- | --- | --- | --- |
| `title` | `String` | YES | Title/Name of the command. |
| `trigger` | `String` | YES | The actual command to trigger it. (Without the `/`) |
| `enabled` | `Boolean` | YES | If `false` the command will be hidden from inline mode and return an error in chat mode. This is useful if your command only works with a certain `query`. |
| `message` | `String` | YES | The result of the command. This will be returned when it runs. |
| `description` | `String` | YES | Description for the website, `/start` and inline mode. |
| `parameter` | `String` | - | Example parameter. Should be in brackets if it's optional. Will be displayed on the website and if `enabled` is set to false |
| `thumb` | `String` | - | Thumbnail for inline mode and website. Image should be placed inside `static/thumbs/` |
