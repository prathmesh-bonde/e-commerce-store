import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import SearchBar from './components/SearchBar';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import Popup from './components/Popup';

const App = () => {
  // all items
  const [items, setItems] = useState([]);

  // to update in cart
  const [cartItems, setCartItems] = useState([]);

  // to display searched items
  const [searchedItems, setSearchedItems] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  // popup message box
  const [popupMessage, setPopupMessage] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  const handleSearch = (data) => {
    setSearchedItems(data);
    setCurrentPage(0);
  };

  const handleAddToCart = (item) => {
    // Check if the item is already in the cart
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If the item is already in the cart, update its quantity
      setCartItems((prevCartItems) =>
        prevCartItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      );
      setPopupMessage('Product added to cart successfully.');
      setShowPopup(true);
    } else {
      // If the item is not in the cart, add it with a cartId and quantity of 1
      setCartItems((prevCartItems) => [...prevCartItems, { ...item, cartId: Date.now(), quantity: 1 }]);
      setPopupMessage('Product added to cart successfully.');
      setShowPopup(true);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    console.log('removing from cart', itemId)
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
    setPopupMessage('Product removed from cart successfully.');
    setShowPopup(true);
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  // to fetch all products
  useEffect(() => {
    fetchItemsOnSale();
  }, []);

  const fetchItemsOnSale = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  // to handle closing popup
  useEffect( () => {
    if (showPopup) {
      setTimeout(() => {
        setShowPopup(false)
      }, 1000);
    }
  }, [showPopup])

  return (
    <Router>
      <div className="App">
        <header>
          <Link to="/" className='home-link'>
            <h1>E-Commerce Store</h1>
          </Link>
          <div className="search-bar">
            <SearchBar 
              onSearch={handleSearch}
              fetchItemsOnSale={fetchItemsOnSale}
              setSearchedItems={setSearchedItems}
              setCurrentPage={setCurrentPage}
              setItems={setItems}
            />
          </div>
          <Link to="/cart" className="cart-link">
            <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
            Cart
            {/* updating badge no. equal to items in cart */}
            {cartItems.length > 0 && <span className="cart-badge">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>}
          </Link>
        </header>

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                items={items}
                totalItems={items.length}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onAddToCart={handleAddToCart}
                searchedItems={searchedItems}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                onRemoveFromCart={handleRemoveFromCart}
                setCartItems={setCartItems}
                setPopupMessage={setPopupMessage}
                setShowPopup={setShowPopup}
              />
            }
          />
        </Routes>
        {showPopup && <Popup message={popupMessage} />}
      </div>
    </Router>
  );
};

export default App;
