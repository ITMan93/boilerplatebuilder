import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logIn } from 'api/modules/auth'
import './styles.scss'

class LogIn extends Component {
  static propTypes = {
    logIn: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      staySignedIn: false,
    }
  }

  handleChange = (field, evt) => {
    const { target: { type, checked, value } } = evt
    this.setState({
      [field]: type === 'checkbox' ? checked : value,
    })
  }

  handleSubmit = evt => {
    evt.preventDefault()
    const { logIn } = this.props
    logIn({ body: { ...this.state } })
  }

  render() {
    const { email, password, staySignedIn } = this.state

    return (
      <div className="loginPage">
        <div className="wrapper">
          <div className="loginForm">
            <div className="loginForm__title">
              <img src="https://d1xvn5mjulg4qv.cloudfront.net/3.0.0/images/logo@3x.png" alt="" />
            </div>

            <div className="loginForm__content">
              <form onSubmit={this.handleSubmit}>
                <div>
                  <input className="field" placeholder="Email" type="email" onChange={evt => this.handleChange('email', evt)} value={email} required autoFocus />
                </div>
                <div>
                  <input className="field" placeholder="Password" type="password" onChange={evt => this.handleChange('password', evt)} value={password} required />
                </div>
                <div>
                  <button className="large form button">Sign in</button>
                </div>
                <div className="checkbox">
                  <input id="stay-signed-in" type="checkbox" checked={staySignedIn} onChange={evt => this.handleChange('staySignedIn', evt)} />
                  <div id="stay-signed-in-replacer" className={staySignedIn ? 'checked' : 'unchecked'} />
                  <label id="stay-signed-in-label">Stay signed in</label>
                </div>
                <div>
                  <span>Create account</span>
                  <span>|</span>
                  <span>Reset password</span>
                </div>
              </form>
            </div>
          </div>
          <p className="contactUs">
            <a href="mailto:support@boilerplatebuilder.com">Contact us</a>
          </p>
          <p className="copyRight">© Breck Inc. 2018, All Rights Reserved</p>
        </div>
        <button className="general-help-button">?</button>
      </div>
    )
  }
}

const actions = {
  logIn,
}

export default connect(null, actions)(LogIn)
