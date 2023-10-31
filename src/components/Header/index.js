import {Component} from 'react'

import {withRouter, Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import Cookies from 'js-cookie'

import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    activeHome: true,
    activeCart: false,
    isHamburgerClicked: false,
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onClickHomeLink = () => {
    this.setState({activeHome: true, activeCart: false})
  }

  onClickCartLink = () => {
    this.setState({activeHome: false, activeCart: true})
  }

  onClickClose = () => {
    this.setState({isHamburgerClicked: false})
  }

  onClickHamburgerMenu = () => {
    this.setState({isHamburgerClicked: true})
  }

  // Navbar Links
  renderNavBarLinksCard = () => {
    const {activeHome, activeCart} = this.state
    const activeHomeClassName = activeHome
      ? 'active-nav-link-text'
      : 'nav-link-text'
    const activeCartClassName = activeCart
      ? 'active-nav-link-text'
      : 'nav-link-text'

    return (
      <div className="nav-links-card">
        <ul className="links-list">
          <Link to="/" className="link">
            <button
              type="button"
              className={activeHomeClassName}
              onClick={this.onClickHomeLink}
            >
              Home
            </button>
          </Link>
          <Link to="/cart" className="link">
            <button
              type="button"
              className={activeCartClassName}
              onClick={this.onClickCartLink}
            >
              Cart
            </button>
          </Link>
          <button
            className="logout-button"
            type="button"
            onClick={this.onLogout}
          >
            Logout
          </button>
        </ul>
      </div>
    )
  }

  // toggle Hamburger
  renderHamburgerMobileView = () => {
    const {isHamburgerClicked} = this.state

    const hamburgerClassName = isHamburgerClicked
      ? 'active-hamburger-menu-card'
      : 'hamburger-menu-card'

    return (
      <div className={hamburgerClassName}>
        <div className="card-links-sm">{this.renderNavBarLinksCard()}</div>
        <button
          className="close-button"
          type="button"
          onClick={this.onClickClose}
        >
          <AiFillCloseCircle />
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <nav className="nav-bar-container">
          <Link to="/" className="link">
            <div className="nav-logo-card">
              <img
                src="https://res.cloudinary.com/dtsiavvsu/image/upload/v1698393508/Group_7420_fyafyj.png"
                alt="website logo"
                className="nav-logo-img"
              />
              <h1 className="nav-logo-title">Tasty Kitchens</h1>
            </div>
          </Link>
          <div className="card-links-lg">{this.renderNavBarLinksCard()}</div>
          <button
            className="icon-card"
            type="button"
            onClick={this.onClickHamburgerMenu}
          >
            <GiHamburgerMenu height={12} width={18} fill="#183B56" />
          </button>
        </nav>
        {this.renderHamburgerMobileView()}
      </>
    )
  }
}

export default withRouter(Header)
