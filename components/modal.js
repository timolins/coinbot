import React from 'react'
import {style} from 'next/css'

import Command from './command'

const styles = {
  modal: {
    textAlign: 'left',
    background: '#FFF',
    width: '100%',
    margin: '20px 0',
    maxWidth: '600px',
    minWidth: '120px',
    borderRadius: '6px',
    color: 'black'
  },
  message: {
    padding: '30px 20px'
  },
  placeholder: {
    opacity: 0.4,
    marginLeft: '4px'
  },
  arrow: {
    width: '25px',
    float: 'right'
  },
  link: {
    color: 'inherit',
    textDecoration: 'none'
  }
}

export default class extends React.Component {
  render() {
    return (
      <div className={style(styles.modal)}>
        <div>
          {
            this.props.commands.map(command => (
              <Command key={command.title} command={command} onHover={this._onHover}/>
            ))
          }
        </div>
        <a className={style(styles.link)} href="https://telegram.me/coinbot">
          <div className={style(styles.message)}>
            <span>@coinbot</span>
            <img className={style(styles.arrow)} src="static/arrow@2x.png" alt="Send Arrow"/>
          </div>
        </a>
      </div>
    )
  }
}
