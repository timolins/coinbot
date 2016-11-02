import modes from '../modes'

export default app => {
  app.command('start', ctx => {
    let message = 'I can help you make decisions with the following commands:\n\n'

    modes.forEach(mode => {
      const {title, command, parameter} = mode()
      message += `*${title}* – /${command} _${parameter || ''}_\n`
    })

    ctx.reply(message, {
      parse_mode: 'Markdown'
    })
  })

  modes.forEach(mode => {
    const m = mode()
    app.command(m.command, ctx => {
      const {text} = ctx.update.message
      const index = text.trim().indexOf(' ')
      const query = index > 0 ? text.substr(index + 1) : ''

      const {message, parameterRequired, command, parameter} = mode(query)

      let parameterMessage
      if (parameterRequired && !query) {
        parameterMessage = `A parameter is required to use this command.\n\nExample: /${command} _${parameter}_`
      }

      ctx.reply(parameterMessage || message, {
        parse_mode: 'Markdown'
      })
    })
  })
}
