/* eslint-disable react/no-unknown-property */
import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const RestaurantCard = props => {
  const {restaurantCards} = props
  const {name, imageUrl, cuisine, id, rating, totalReviews} = restaurantCards

  return (
    <Link
      to={`/restaurant/${id}`}
      className="link-card"
      testid="restaurant-item"
    >
      <li className="restaurant-card">
        <img src={imageUrl} className="restaurant-img" alt="restaurant" />
        <div className="restaurant-details-card">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurants-cuisine">{cuisine}</p>
          <div className="ratings-card">
            <AiFillStar fill="#FFCC00" height={12} width={12} />
            <p className="rating">{rating}</p>
            <p className="total-reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
