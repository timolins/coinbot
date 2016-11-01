import React from 'react'
import {insertRule, style} from 'next/css'
import Head from 'next/head'

import modes from '../modes'

import Modal from '../components/modal'

const styles = {
  wrapper: {
    textAlign: 'center',
    width: '90%',
    maxWidth: '500px',
    margin: '50px auto 0'
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    margin: '18px 0 3px'
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.4,
    fontWeight: 300
  }

}

insertRule(`
  html, body {
    margin: 0;
    padding: 0;
    background: #222;
    font-family: -apple-system, BlinkMacSystemFont, system, "Segoe UI", Tahoma;
    color: white;
  }
`)

export default class extends React.Component {
  static getInitialProps() {
    return {
      modes: modes.map(mode => mode())
    }
  }

  render() {
    return (
      <div className={style(styles.wrapper)}>
        <Head>
          <title>CoinBot</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <header>
          <img src="static/logo.svg" alt="CoinBot Logo"/>
          <div className={style(styles.title)}>CoinBot</div>
          <div className={style(styles.subtitle)}>for Telegram</div>
        </header>
        <Modal modes={this.props.modes}/>
      </div>
    )
  }
}
