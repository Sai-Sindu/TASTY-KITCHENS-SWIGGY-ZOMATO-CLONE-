/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {MdOutlineSort} from 'react-icons/md'
import {BiChevronLeftSquare, BiChevronRightSquare} from 'react-icons/bi'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import RestaurantCard from '../RestaurantCard'
import Footer from '../Footer'
import HomeCarousel from '../HomeCarousel'

import './index.css'

const Limit = 9

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const apiStatusConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const totalPages = 4
class Home extends Component {
  state = {
    restaurantsList: [],
    apiStatus: apiStatusConst.initial,
    selectedSortByValue: sortByOptions[1].value,
    activePage: 1,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurantsList()
  }

  // Fetching Restaurants List
  getRestaurantsList = async () => {
    const {selectedSortByValue, activePage, searchInput} = this.state
    const offset = (activePage - 1) * Limit
    console.log(selectedSortByValue)
    this.setState({apiStatus: apiStatusConst.inProgress})
    const restaurantsListApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${Limit}&sort_by_rating=${selectedSortByValue}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(restaurantsListApiUrl, options)
    if (response.ok) {
      const restaurantsListData = await response.json()
      const updatedData = restaurantsListData.restaurants.map(
        eachRestaurant => ({
          name: eachRestaurant.name,
          imageUrl: eachRestaurant.image_url,
          cuisine: eachRestaurant.cuisine,
          id: eachRestaurant.id,
          rating: eachRestaurant.user_rating.rating,
          ratingColor: eachRestaurant.user_rating.rating_color,
          ratingText: eachRestaurant.user_rating.rating_text,
          totalReviews: eachRestaurant.user_rating.total_reviews,
        }),
      )
      this.setState({
        apiStatus: apiStatusConst.success,
        restaurantsList: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  onSortOptions = event => {
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getRestaurantsList,
    )
  }

  onMoveToNextPage = () => {
    const {activePage} = this.state
    if (activePage < totalPages) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getRestaurantsList,
      )
    }
  }

  onMoveToBeforePage = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getRestaurantsList,
      )
    }
  }

  onClickRetry = () => {
    this.getRestaurantsList()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  getSearchedRestaurant = () => {
    this.getRestaurantsList()
  }

  renderSearchBar = () => {
    const {searchInput} = this.state

    return (
      <div className="search-container">
        <input
          type="search"
          onChange={this.onChangeSearchInput}
          value={searchInput}
          placeholder="Search Restaurant"
          className="search-card"
        />
        <button
          className="search-button"
          type="button"
          onClick={this.getSearchedRestaurant}
        >
          <BsSearch />
        </button>
      </div>
    )
  }

  // Loading View
  renderRestaurantListLoadingView = () => (
    // eslint-disable-next-line react/no-unknown-property
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="TailSpin" color="#F7931E" height="53" width="53" />
    </div>
  )

  // Restaurant Lists View
  renderRestaurantListSuccessView = () => {
    const {restaurantsList, selectedSortByValue, activePage} = this.state

    return (
      <div className="popular-restaurant-container">
        <h1 className="popular-restaurants-title">Popular Restaurants</h1>
        <div className="description-sort-by-card">
          <p className="description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort-by-card">
            <MdOutlineSort color="#475569" height={24} width={24} />
            <p className="sort-by-text">Sort by</p>
            <select
              id="sortBy"
              className="sort-options"
              onChange={this.onSortOptions}
              value={selectedSortByValue}
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id}>{eachOption.displayText}</option>
              ))}
            </select>
          </div>
        </div>

        {this.renderSearchBar()}
        <hr className="separator" />
        <ul className="restaurant-list-container">
          {restaurantsList.map(eachRestaurant => (
            <RestaurantCard
              key={eachRestaurant.id}
              restaurantCards={eachRestaurant}
            />
          ))}
        </ul>
        <div className="pagination-container">
          <button
            className="pagination-button"
            type="button"
            onClick={this.onMoveToBeforePage}
            testid="pagination-left-button"
          >
            <BiChevronLeftSquare size={32} color="#334155" />
          </button>
          <p className="pagination-value">
            <span testid="active-page-number">{activePage}</span>of {totalPages}
          </p>
          <button
            className="pagination-button"
            type="button"
            onClick={this.onMoveToNextPage}
            testid="pagination-right-button"
          >
            <BiChevronRightSquare size={32} color="#334155" />
          </button>
        </div>
      </div>
    )
  }

  // Restaurants Failure View
  renderRestaurantListFailureView = () => (
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

  // Restaurants display different Views
  renderPopularRestaurantsViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConst.inProgress:
        return this.renderRestaurantListLoadingView()
      case apiStatusConst.success:
        return this.renderRestaurantListSuccessView()
      case apiStatusConst.failure:
        return this.renderRestaurantListFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="home-container">
          <HomeCarousel />
          {this.renderPopularRestaurantsViews()}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
