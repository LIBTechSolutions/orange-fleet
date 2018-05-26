'use strict'

import React from 'react'
import classnames from 'classnames'

export default class IndexPage extends React.Component {
  constructor (props) {
    super(props)
    this.authenticate = this.authenticate.bind(this)
  }

  authenticate (event) {
    event.preventDefault()
    let elements = event.target.elements
    let username = elements.namedItem('email').value
    let password = elements.namedItem('password').value

    this.setState({loginAlertDeactivated: false})

    this.props.checkLogin(username, password)
  }

  render () {
    let {loginErrorVisible} = this.props
    let emailChangeHandlers = {}
    let loginAlert = ''

    if (loginErrorVisible) {
      let alertClasses = classnames('login-alert', 'alert-danger', {
        active: !this.state.loginAlertDeactivated
      })
      loginAlert = <span className={alertClasses}>Invalid Credentials:</span>
      emailChangeHandlers.onChange = () => {
        this.setState({loginAlertDeactivated: true})
      }
    }

    return (
      <div className='home'>
        <form action='' onSubmit={this.authenticate}>
          <div className='logo'>
            <h1>Orange Fleet</h1>
          </div>
          <div className='login'>
            {this.props.busy &&
              <i className="fas fa-spinner fa-pulse fa-5x" style={{ position: 'relative' }}></i>
            }
            <div className='login-form'>
              {loginErrorVisible && loginAlert}
              <div className='login-inputs'>
                <div className='input'>
                  <label>E-mail</label>
                  <input
                    {...emailChangeHandlers}
                    name='email' type='text'
                    placeholder='E-mail address'
                    autoFocus
                    required
                    disabled={this.props.busy}
                    className='space-after'
                  />
                </div>
                <div className='input'>
                  <label>Password</label>
                  <input
                    name='password' type='password'
                    placeholder='Password'
                    required
                    disabled={this.props.busy}
                  />
                </div>
              </div>
            </div>

            <button
              type='submit'
              className='btn'
              disabled={this.props.busy}>
                Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const styles = {
  style: {
    margin: 15
  },
  loginStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
 
 };
