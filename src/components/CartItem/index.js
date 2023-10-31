/* eslint-disable react/no-unknown-property */
import './index.css'

const CartItem = props => {
  const {cartItemDetails, decreaseCartQuantity, increaseCartQuantity} = props
  const {id, name, imageUrl, cost, quantity} = cartItemDetails

  const onDecreaseQuantity = () => {
    decreaseCartQuantity(id)
  }

  const onIncreaseQuantity = () => {
    increaseCartQuantity(id)
  }

  const cartItemsLgView = () => (
    <div className="card-card-lg">
      <div className="items-cards">
        <img src={imageUrl} className="cart-item-img" alt="food-img" />
        <h1 className="cart-item-name">{name}</h1>
      </div>
      <div className="quantity-card">
        <button
          type="button"
          className="quantity-button"
          onClick={onDecreaseQuantity}
          testid="decrement-quantity"
        >
          -
        </button>
        <div className="quantity" testid="item-quantity">
          {quantity}
        </div>
        <button
          type="button"
          className="quantity-button"
          onClick={onIncreaseQuantity}
          testid="increment-quantity"
        >
          +
        </button>
      </div>
      <p className="price">₹{cost * quantity}.00</p>
    </div>
  )

  const cartItemMobileView = () => (
    <div className="card-card-sm">
      <img src={imageUrl} className="cart-item-img" alt="food-img" />
      <div className="description-sm">
        <h1 className="cart-item-name">{name}</h1>
        <div className="quantity-card">
          <button type="button" className="quantity-button">
            -
          </button>
          <div className="quantity">{quantity}</div>
          <button type="button" className="quantity-button">
            +
          </button>
        </div>
        <p className="price">₹{cost * quantity}.00</p>
      </div>
    </div>
  )

  return (
    <li className="cart-item-card" testid="cartItem">
      {cartItemsLgView()}
      {cartItemMobileView()}
    </li>
  )
}

export default CartItem
