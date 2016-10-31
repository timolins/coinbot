import Chance from 'chance'

const chance = new Chance()

const queryToArray = query => (
  query
  .split(/,|\n/)
  .map(item => item.trim())
  .filter(item => item !== '')
)

export default query => {
  if (!query) {
    return
  }

  const items = queryToArray(query)

  return {
    title: 'Item from list',
    enabled: items.length > 1,
    message: `List: _${items.join(', ')}_\n\nI choose: *${chance.pick(items)}*`,
    description: `Random item`,
    icon: 'list.png'
  }
}
