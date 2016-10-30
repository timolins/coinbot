import Telegraf from 'telegraf'
import Chance from 'chance'

const chance = new Chance()
const app = new Telegraf(process.env.TOKEN)

const buildQuery = (title, message) => ({
  id: title,
  title,
  type: 'article',
  input_message_content: {
    message_text: message,
    parse_mode: 'Markdown'
  }
})

app.on('inline_query', ctx => {
  const {query} = ctx.update.inline_query

  console.log(query)

  const results = [
    buildQuery('Flip a coin', `Coin flipped: *${chance.pick(['Heads', 'Tails'])}*`),
    buildQuery('Roll a dice', `Dice rolled: *${chance.d6()}*`)
  ]

  if (query.includes(',')) {
    const items = query.split(',')
    const trimmedItems = items.map(item => (item.trim()))

    const listQuery = buildQuery('Choose from list', `List: _${trimmedItems.join(', ')}_\n\nI choose: *${chance.pick(trimmedItems)}*`)
    results.push(listQuery)
  }

  ctx.answerInlineQuery(results, {
    is_personal: true,
    cache_time: 0
  })
})

app.startPolling()
