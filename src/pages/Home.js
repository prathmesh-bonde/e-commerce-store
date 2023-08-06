const Home = ({ items, totalItems, currentPage, itemsPerPage, onPageChange, onAddToCart, searchedItems }) => {
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = searchedItems.length > 0 ? searchedItems.slice(startIndex, endIndex) : items.slice(startIndex, endIndex);

  const totalPages = Math.ceil((searchedItems.length > 0 ? searchedItems.length : totalItems) / itemsPerPage);

  const handlePageChange = (selectedPage) => {
    onPageChange(selectedPage);
  };

  const handleAddToCart = (item) => {
    onAddToCart(item);
  };

  return (
    <div className="home">
      <h2>All Products</h2>
      <ul className="product-list">
        {displayedItems.map((item) => (
          <li key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      {totalPages > 1 && (
        <ul className="pagination">
          <li>
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0}>
              Previous
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index}>
              <button
                className={index === currentPage ? 'active' : ''}
                onClick={() => handlePageChange(index)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Home;