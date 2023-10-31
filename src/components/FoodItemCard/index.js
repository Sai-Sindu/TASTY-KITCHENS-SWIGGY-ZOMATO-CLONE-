/* eslint-disable react/no-unknown-property */
import {Component} from 'react'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

class FoodItemCard extends Component {
  state = {quantity: 0, isAddClicked: false}

  checkForCartItemInCartData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props

    const cartItem = cartData.filter(
      eachItem => eachItem.id === foodItemDetails.id,
    )

    if (cartItem.length !== 0) {
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isAddClicked: true})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isAddClicked: false})
      }
    }
  }

  // Decrease FoodItem Quantity
  onDecrement = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItemDetails.id) {
        if (eachItem.quantity > 1) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.checkForCartItemInCartData()
  }

  // Increase FoodItem Quantity
  onIncrement = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItemDetails.id) {
        // console.log('found')
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.checkForCartItemInCartData()
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItemDetails} = this.props

    const updatedData = cartData.filter(
      eachItem => eachItem.id === foodItemDetails.id,
    )

    localStorage.setItem('cartData', JSON.stringify(updatedData))
    this.checkForCartItemInCartData()
  }

  // Add Food Item to Cart
  onAddFood = () => {
    // cartData was not previously defined, so initialized with empty array []
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItemDetails} = this.props

    // filtering the cartData that is equal to filterItem
    // If filteredItem is not available add it to the cart
    // If filteredItem is available in cartData not adding it again to cart and then setting the state of isAddClicked to true and updating quantity  with filteredItem quantity
    const filterItem = cartData.filter(
      eachItem => eachItem.id === foodItemDetails.id,
    )

    if (filterItem.length === 0) {
      const cartItem = {...foodItemDetails, quantity: 1}
      cartData.push(cartItem)
      localStorage.setItem('cartData', JSON.stringify(cartData))
      this.checkForCartItemInCartData()
      this.setState({isAddClicked: true})
    } else {
      const filteredItemQuantity = filterItem[0].quantity
      this.setState({isAddClicked: true, quantity: filteredItemQuantity})
    }
  }

  render() {
    const {quantity, isAddClicked} = this.state
    const {foodItemDetails} = this.props
    const {name, rating, imageUrl, cost} = foodItemDetails

    console.log(isAddClicked)

    return (
      <li className="food-item-card" testid="foodItem">
        <img src={imageUrl} alt="" className="food-item-img" />
        <div className="food-item-description-card">
          <h1 className="food-item-name">{name}</h1>
          <p className="food-item-cost">{cost}</p>
          <div className="food-item-rating-card">
            <AiFillStar size={12} color="#FFCC00" />
            <p className="food-item-rating">{rating}</p>
          </div>
          {isAddClicked ? (
            <div className="food-quantity-card">
              <button
                type="button"
                onClick={this.onDecrement}
                className="quantity-button"
                testid="decrement-count"
              >
                -
              </button>
              <div className="quantity" testid="active-count">
                {quantity}
              </div>
              <button
                type="button"
                onClick={this.onIncrement}
                className="quantity-button"
                testid="increment-count"
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="add-button"
              type="button"
              onClick={this.onAddFood}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItemCard
