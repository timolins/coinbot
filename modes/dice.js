import Chance from 'chance'

const chance = new Chance()

export default () => ({
  title: 'Roll a dice',
  enabled: true,
  message: `Dice rolled: *${chance.d6()}*`,
  icon: 'dice.png'
})
