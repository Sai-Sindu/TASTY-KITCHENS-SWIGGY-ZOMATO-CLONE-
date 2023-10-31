/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'

import Header from '../Header'
import Footer from '../Footer'
import FoodItemCard from '../FoodItemCard'

import './index.css'

const apiRestaurantDetailsStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RestaurantDetails extends Component {
  state = {
    restaurantDetails: {},
    foodItemsList: [],
    apiRestaurantDetailsStatus: apiRestaurantDetailsStatusConst.initial,
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  // Fetching Restaurant Details Data
  getRestaurantDetails = async () => {
    this.setState({
      apiRestaurantDetailsStatus: apiRestaurantDetailsStatusConst.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const restaurantDetailsUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantDetailsUrl, options)
    if (response.ok) {
      const restaurantDetailsData = await response.json()

      const updatedData = {
        id: restaurantDetailsData.id,
        costForTwo: restaurantDetailsData.cost_for_two,
        cuisine: restaurantDetailsData.cuisine,
        imageUrl: restaurantDetailsData.image_url,
        itemsCount: restaurantDetailsData.items_count,
        location: restaurantDetailsData.location,
        name: restaurantDetailsData.name,
        opensAt: restaurantDetailsData.opens_at,
        rating: restaurantDetailsData.rating,
        reviewsCount: restaurantDetailsData.reviews_count,
      }
      const updatedFoodItemsData = restaurantDetailsData.food_items.map(
        eachFoodItem => ({
          id: eachFoodItem.id,
          cost: eachFoodItem.cost,
          foodType: eachFoodItem.food_type,
          imageUrl: eachFoodItem.image_url,
          name: eachFoodItem.name,
          rating: eachFoodItem.rating,
        }),
      )
      this.setState({
        restaurantDetails: updatedData,
        foodItemsList: updatedFoodItemsData,
        apiRestaurantDetailsStatus: apiRestaurantDetailsStatusConst.success,
      })
    } else {
      this.setState({
        apiRestaurantDetailsStatus: apiRestaurantDetailsStatusConst.failure,
      })
    }
  }

  // Loading View
  renderRestaurantDetailsLoadingView = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="TailSpin" color="#F7931E" height="53" width="53" />
    </div>
  )

  // Restaurant Details
  renderRestaurantDetailsSuccessView = () => {
    const {restaurantDetails, foodItemsList} = this.state
    const {
      name,
      location,
      costForTwo,
      cuisine,
      imageUrl,
      rating,
      reviewsCount,
    } = restaurantDetails
    return (
      <div className="restaurant-details-container">
        <div className="restaurant-detail-card">
          <div className="image-description-container">
            <img src={imageUrl} alt="restaurant" className="image-card" />
            <div className="description-card">
              <h1 className="restaurant-title">{name}</h1>
              <p className="restaurant-cuisine">{cuisine}</p>
              <p className="restaurant-location">{location}</p>
              <div className="rating-cost-card">
                <div className="rating-card">
                  <div className="rating-card-card">
                    <AiFillStar color="#ffffff" size={12} />
                    <p className="restaurant-rating">{rating}</p>
                  </div>
                  <p className="restaurant-reviews-count">
                    {reviewsCount}+ Ratings
                  </p>
                </div>
                <hr className="rating-cost-separator" />
                <div className="cost-card">
                  <p className="cost-for-two">{costForTwo}</p>
                  <p className="cost-for-two-text">Cost For Two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list-container">
          {foodItemsList.map(eachFoodItem => (
            <FoodItemCard
              key={eachFoodItem.id}
              foodItemDetails={eachFoodItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  // Failure View
  renderRestaurantDetailsFailureView = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1 className="failure-card-title">Oops! Something Went Wrong</h1>
      <p className="failure-card-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  // Restaurant details display different views using SWITCH CASE
  renderRestaurantDetailsViews = () => {
    const {apiRestaurantDetailsStatus} = this.state
    switch (apiRestaurantDetailsStatus) {
      case apiRestaurantDetailsStatusConst.inProgress:
        return this.renderRestaurantDetailsLoadingView()
      case apiRestaurantDetailsStatusConst.success:
        return this.renderRestaurantDetailsSuccessView()
      case apiRestaurantDetailsStatusConst.failure:
        return this.renderRestaurantDetailsFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="container">{this.renderRestaurantDetailsViews()}</div>
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
