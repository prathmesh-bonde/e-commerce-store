const Cart = ({ cartItems, onRemoveFromCart }) => {
    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handleRemoveFromCart = (itemId) => {
        onRemoveFromCart(itemId);
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
                            <li key={item.id}>
                                <img src={item.image} alt={item.title} />
                                <h3>{item.title}</h3>
                                <p>${item.price}</p>
                                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="total">
                        <h3>Total: ${getTotalPrice()}</h3>
                        <button onClick={() => alert('Checkout not implemented.')}>Buy</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;
