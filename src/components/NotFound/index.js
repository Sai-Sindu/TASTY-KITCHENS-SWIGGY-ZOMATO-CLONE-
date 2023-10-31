import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dtsiavvsu/image/upload/v1698680532/Group_vbdfc2.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found. Please go back to
      the homepage
    </p>
    <Link to="/">
      <button className="home-page-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
