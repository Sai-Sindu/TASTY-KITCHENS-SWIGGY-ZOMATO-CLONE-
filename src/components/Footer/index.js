import {
  FaPinterestSquare,
  FaInstagram,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="logo-title-card">
        <img
          src="https://res.cloudinary.com/dtsiavvsu/image/upload/v1698498565/Group_7420_1_emct7v.png"
          alt="website-footer-logo"
          className="logo-img"
        />
        <h1 className="footer-title">Tasty Kitchens</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="icons-card">
        <FaPinterestSquare
          color="#ffffff"
          size={40}
          testid="pintrest-social-icon"
        />
        <FaInstagram color="#ffffff" size={40} testid="instagram-social-icon" />
        <FaTwitter color="#ffffff" size={40} testid="twitter-social-icon" />
        <FaFacebookSquare
          color="#ffffff"
          size={40}
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
