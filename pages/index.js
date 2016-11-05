import React from 'react'
import {insertRule, style} from 'next/css'
import Head from 'next/head'

import commands from '../commands'

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
  },
  header: {
    marginBottom: 30
  },
  footer: {
    fontSize: 12,
    margin: '5px 0 20px',
    lineHeight: 1.8,
    color: 'rgb(100,100,100)'
  },
  link: {
    color: 'white',
    textDecoration: 'none'
  },
  button: {
    background: '#54b3e6',
    display: 'inline-block',
    padding: '10px 20px',
    borderRadius: 3,
    color: 'white',
    textDecoration: 'none',
    marginTop: 20,
    ':hover': {
      background: '#0088cc'
    }
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
      commands: commands.map(command => command())
    }
  }

  render() {
    return (
      <div className={style(styles.wrapper)}>
        <Head>
          <title>CoinBot</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <link rel="icon" href="/static/favicon.ico" type="image/x-icon" />
        </Head>
        <header className={style(styles.header)}>
          <img src="static/logo.svg" alt="CoinBot Logo"/>
          <div className={style(styles.title)}>CoinBot</div>
          <div className={style(styles.subtitle)}>for Telegram</div>
          <a href="https://telegram.me/coinbot">
            <div className={style(styles.button)}>TRY IT NOW</div>
          </a>
        </header>
        <Modal commands={this.props.commands}/>
        <footer className={style(styles.footer)}>
          <div>Source available on <a className={style(styles.link)} href="https://github.com/timolins/coinbot">GitHub</a>.</div>
          <div>Built by <a className={style(styles.link)} href="https://timo.sh">Timo Lins</a>.  Hosted on <a className={style(styles.link)} href="https://zeit.co/now">now</a>.</div>
        </footer>
      </div>
    )
  }
}
