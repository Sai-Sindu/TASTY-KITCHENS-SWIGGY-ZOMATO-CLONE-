import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'

import './index.css'

class HomeCarousel extends Component {
  state = {carouselImgList: [], isLoading: true}

  componentDidMount() {
    this.getCarouselImageList()
  }

  //  Fetching Carousel Images Data
  getCarouselImageList = async () => {
    const carouselApiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(carouselApiUrl, options)
    if (response.ok) {
      const carouselImgData = await response.json()
      const updatedCarouselData = carouselImgData.offers.map(eachCarousel => ({
        id: eachCarousel.id,
        imageUrl: eachCarousel.image_url,
      }))
      this.setState({carouselImgList: updatedCarouselData, isLoading: false})
    }
  }

  // Loading View
  renderCarouselLoadingView = () => (
    <div
      className="loader-carousel-container"
      // eslint-disable-next-line react/no-unknown-property
      testid="restaurants-offers-loader"
    >
      <Loader type="TailSpin" color="#F7931E" height="53" width="53" />
    </div>
  )

  // Display Carousels Success View
  renderCarouselsView = () => {
    const {carouselImgList} = this.state
    const settings = {
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <Slider {...settings}>
        {carouselImgList.map(eachImg => (
          <img
            src={eachImg.imageUrl}
            alt="offer"
            className="carousel-img"
            key={eachImg.id}
          />
        ))}
      </Slider>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        {isLoading
          ? this.renderCarouselLoadingView()
          : this.renderCarouselsView()}
      </div>
    )
  }
}

export default HomeCarousel
