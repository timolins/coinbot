import Chance from 'chance'

const chance = new Chance()

const queryToArray = query => (
  query
  .split(/,|\n/)
  .map(item => item.trim())
  .filter(item => item !== '')
)

export default (query = '') => {
  const items = queryToArray(query)
  const enabled = items.length > 1
  const message = enabled ? `List: _${items.join(', ')}_\n\nI choose: *${chance.pick(items)}*` : ''

  return {
    title: 'Item from list',
    enabled,
    message,
    description: `Random item`,
    icon: 'list.png'
  }
}
