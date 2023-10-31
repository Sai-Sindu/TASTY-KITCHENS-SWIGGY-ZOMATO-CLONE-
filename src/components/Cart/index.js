/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import CartItem from '../CartItem'

import './index.css'

const cartViewConst = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  emptyCart: 'EMPTY_CART',
  paymentSuccess: 'PAYMENT_SUCCESS',
}

class Cart extends Component {
  state = {cartView: cartViewConst.initial, cartData: []}

  componentDidMount() {
    this.getCartListData()
  }

  // Get Cart List Data
  getCartListData = () => {
    this.setState({cartView: cartViewConst.inProgress})
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []

    if (cartData.length === 0) {
      this.setState({cartView: cartViewConst.emptyCart})
    } else {
      const cartList = cartData.map(eachCartItem => ({
        id: eachCartItem.id,
        cost: eachCartItem.cost,
        name: eachCartItem.name,
        imageUrl: eachCartItem.imageUrl,
        quantity: eachCartItem.quantity,
      }))
      this.setState({cartView: cartViewConst.success, cartData: cartList})
    }
  }

  // Increase Cart Item Quantity
  increaseCartQuantity = id => {
    const {cartData} = this.state
    const updatedCartData = cartData.map(eachCartItem => {
      if (eachCartItem.id === id) {
        const updatedQuantity = eachCartItem.quantity + 1
        return {...eachCartItem, quantity: updatedQuantity}
      }
      return eachCartItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartListData()
  }

  // Decrease Cart Item  Quantity
  decreaseCartQuantity = id => {
    const {cartData} = this.state
    const updatedCartData = cartData.map(eachCartItem => {
      if (eachCartItem.id === id) {
        if (eachCartItem.quantity > 0) {
          const updatedQuantity = eachCartItem.quantity - 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
      }
      return eachCartItem
    })
    this.deleteCartItem(updatedCartData)
  }

  // Delete CartItem Quantity < 1
  deleteCartItem = updatedCartData => {
    console.log(updatedCartData)
    const updatedData = updatedCartData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )

    localStorage.setItem('cartData', JSON.stringify(updatedData))
    this.getCartListData()
  }

  placeOrder = () => {
    this.setState({cartView: cartViewConst.paymentSuccess})
    localStorage.clear('cartData')
  }

  // Cart Loading View
  renderCartLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#F7931E" height="53" width="53" />
    </div>
  )

  // Empty Cart View
  renderEmptyCartView = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dtsiavvsu/image/upload/v1698639436/OBJECTS_sfjnkb.png"
        className="empty-cart-img"
        alt="empty cart"
      />
      <h1 className="empty-cart-title">No Order Yet!</h1>
      <p className="empty-cart-description">
        Your cart is empty. Add something from the menu.
      </p>
      <Link to="/">
        <button className="empty-cart-order-now" type="button">
          Order Now
        </button>
      </Link>
    </div>
  )

  // Cart Success View
  renderCartItemSuccessView = () => {
    const {cartData} = this.state
    let total = 0
    cartData.map(eachCartItem => {
      total += eachCartItem.cost * eachCartItem.quantity
      return total
    })

    return (
      <>
        <div className="cart-background-container">
          <div className="cart-container">
            <ul className="cart-item-titles">
              <li className="item-title">Item</li>
              <li className="item-title">Quantity</li>
              <li className="item-title">Price</li>
            </ul>
            <ul className="cart-items-container">
              {cartData.map(eachCartItem => (
                <CartItem
                  key={eachCartItem.id}
                  cartItemDetails={eachCartItem}
                  increaseCartQuantity={this.increaseCartQuantity}
                  decreaseCartQuantity={this.decreaseCartQuantity}
                />
              ))}
            </ul>
            <hr className="border" />
            <div className="cart-total-cost-card">
              <h1 className="order-total-text">Order Total: </h1>
              <p className="order-total" testid="total-price">
                ₹{total}.00
              </p>
            </div>
            <div className="button-card">
              <button
                className="place-order-button"
                type="button"
                onClick={this.placeOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  // Payment Success View
  renderPaymentSuccessView = () => (
    <div className="payment-success-view-container">
      <img
        src="https://res.cloudinary.com/dtsiavvsu/image/upload/v1698642600/check-circle.1_1_b3ihdu.png"
        className="payment-success-img"
        alt=""
      />
      <h1 className="payment-success-title">Payment Successful</h1>
      <p className="payment-success-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link to="/">
        <button className="payment-success-button" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  // Cart Views
  renderCartViews = () => {
    const {cartView} = this.state

    switch (cartView) {
      case cartViewConst.inProgress:
        return this.renderCartLoadingView()
      case cartViewConst.emptyCart:
        return this.renderEmptyCartView()
      case cartViewConst.success:
        return this.renderCartItemSuccessView()
      case cartViewConst.paymentSuccess:
        return this.renderPaymentSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.renderCartViews()}</div>
      </>
    )
  }
}

export default Cart
