import Chance from 'chance'

const chance = new Chance()

export default () => ({
  title: 'Flip a coin',
  enabled: true,
  message: `Coin flipped: *${chance.pick(['Heads', 'Tails'])}*`,
  description: 'Heads or Tails',
  thumb: 'coin.png'
})
