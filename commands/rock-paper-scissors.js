import Chance from 'chance'

const chance = new Chance()

export default () => ({
  title: 'Rock, paper, scissors',
  trigger: 'rps',
  enabled: true,
  message: `*${chance.pick(['Rock', 'Paper', 'Scissors'])}*`,
  description: 'Either Rock, Paper or Scissors',
  thumb: 'rock-paper-scissors.png'
})
