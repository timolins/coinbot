import Chance from 'chance'

const chance = new Chance()

export default query => {
  const defaultN = 6
  const n = Number(query) || defaultN

  const description = `Number between 1 and ${n}`
  let disclaimer = ''

  if (n !== defaultN) {
    disclaimer = `_${description}_\n\n`
  }

  return {
    title: 'Roll a dice',
    command: 'dice',
    enabled: true,
    message: `${disclaimer}Dice rolled: *${chance.integer({min: 1, max: n})}*`,
    description,
    parameter: '[Max. number]',
    thumb: 'dice.png'
  }
}
