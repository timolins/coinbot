import React from 'react'
import {style, merge} from 'next/css'


const styles = {
  command: {
    padding: 10,
    borderBottom: '1px solid #eee',
    fontWeight: 400,
    cursor: 'default !important'
  },

  text: {
    display: 'inline-block',
    verticalAlign: 'middle',
    marginLeft: 10
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 3,
    display: 'inline-block',
    verticalAlign: 'middle'
  },
  title: {
    fontWeight: 500
  },
  desc: {
    opacity: 0.5
  }
}

export default class extends React.Component {
  onHover = () => {
    this.props.onHover(this.props.command.parameter)
  }
  render() {
    const {title, description, thumb} = this.props.command

    return (
      <div className={style(styles.command)} onMouseOver={this.onHover}>
        <div className={style(styles.thumb)}>
          <img className={style(styles.thumb)} src={`static/thumbs/${thumb}`} alt={title}/>
        </div>
        <div className={style(styles.text)}>
          <div className={style(styles.title)}>{title}</div>
          <div className={style(styles.desc)}>{description}</div>
        </div>
      </div>
    )
  }
}
