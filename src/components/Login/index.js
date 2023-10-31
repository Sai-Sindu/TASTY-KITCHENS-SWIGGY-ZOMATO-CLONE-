import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
    isChecked: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onTogglePassword = event => {
    this.setState({isChecked: event.target.checked})
  }

  renderLoginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  renderLoginFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiLoginUrl = 'https://apis.ccbp.in/login'
    const userCredentials = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userCredentials),
    }

    const response = await fetch(apiLoginUrl, options)
    const loginData = await response.json()
    if (response.ok) {
      this.renderLoginSuccess(loginData.jwt_token)
    } else {
      this.renderLoginFailure(loginData.error_msg)
    }
  }

  renderLoginFormContainer = () => {
    const {username, password, showErrorMsg, errorMsg, isChecked} = this.state

    const passwordInputType = isChecked ? 'text' : 'password'

    return (
      <div className="login-card">
        <img
          src="https://res.cloudinary.com/dtsiavvsu/image/upload/v1698393508/Group_7420_fyafyj.png"
          alt="website logo"
          className="login-logo"
        />
        <h1 className="logo-title">Tasty Kitchens</h1>
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={this.onSubmitForm}>
          <label className="label-text" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="Username"
            className="input-card"
            id="username"
            autoComplete="current-username"
            value={username}
            onChange={this.onChangeUsername}
          />
          <label className="label-text" htmlFor="password">
            PASSWORD
          </label>
          <input
            type={passwordInputType}
            placeholder="Password"
            className="input-card"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={this.onChangePassword}
          />
          <div className="checkbox-card">
            <input
              type="checkbox"
              id="check-box"
              onChange={this.onTogglePassword}
            />
            <label className="checkbox-label" htmlFor="check-box">
              Show Password
            </label>
          </div>
          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-form-container">
          {this.renderLoginFormContainer()}
        </div>
        <div className="login-img-container">
          <img
            src="https://res.cloudinary.com/dtsiavvsu/image/upload/v1698391871/Rectangle_1456_tffnfn.png"
            alt="website login"
            className="login-img-lg"
          />
          <img
            src="https://res.cloudinary.com/dtsiavvsu/image/upload/v1698405772/Rectangle_1457_ddzqoc.png"
            alt=""
            className="login-img-sm"
          />
        </div>
      </div>
    )
  }
}

export default Login
