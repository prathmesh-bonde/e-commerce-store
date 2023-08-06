
// import { useState } from "react";

const Cart = ({ cartItems, onRemoveFromCart, setCartItems, setPopupMessage, setShowPopup}) => {
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // remove item whose cartId is clicked
  const handleRemoveFromCart = (cartId) => {
    // keep only those items in cart, whose id is not clicked to remove
    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.cartId !== cartId));
    setPopupMessage('Product removed from cart successfully.');
    setShowPopup(true);
  };

  const handleIncrementQuantity = (cartId) => {
    setCartItems((prevCartItems) =>
      // increase quantity 
      prevCartItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrementQuantity = (cartId) => {
    setCartItems((prevCartItems) =>
      // decrease quantity
      prevCartItems.map((item) =>
        item.cartId === cartId ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      ).filter(item => item.quantity > 0)  // to remove the item from the cart if its quant reaches 0
    );
  };

  return (
    <div className="cart">
      <h2>My Cart</h2>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          <ul className="product-list">
            {cartItems.map((item) => (
              <li key={item.cartId}>
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => handleDecrementQuantity(item.cartId)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrementQuantity(item.cartId)}>+</button>
                </div>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => handleRemoveFromCart(item.cartId)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="total">
            <h3 id="cart-total-txt">Cart Total: ${getTotalPrice().toFixed(2)}</h3>
            <button id="totalButton" onClick={() => {
              setPopupMessage("Checkout in Progress...");
              setShowPopup(true);

              setTimeout( () => {
                setPopupMessage("Checkout successfull!");
                setShowPopup(true)
              }, 1200);
            }}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
