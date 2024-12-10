import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./SearchPageStyle.module.css";
import Cookies from "js-cookie";
import setGlobalTheme from "../../setGlobalTheme";
import NavBar from "../../NavBar/Navbar";
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";

function SearchPage() {
  const apiUrl = import.meta.env.VITE_API;
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const response = await fetch(`${apiUrl}/search/product/${query}`);
    const data = await response.json();

    sessionStorage.setItem("searchResults", JSON.stringify(data.products));
    setSearchResults(data.products);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  useEffect(() => {
    const results = JSON.parse(sessionStorage.getItem("searchResults")) || [];
    setSearchResults(results);
  }, []);

  const handleProductClick = async (product) => {
    const response = await fetch(`${apiUrl}/search/owner/${product.owner}`);
    const data = await response.json();
    sessionStorage.setItem("product", JSON.stringify(product));
    sessionStorage.setItem("owner", JSON.stringify(data.owner));
    navigate(`/product/${product._id}`);
  };

  return (
    <div className={`${styles.searchPage}`}>
      <NavBar />

      <div className={`${styles.mainContent}`}>
        <ThemeSwitch />
        <div className={`${styles.searchBar}`}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            onKeyDown={handleKeyPress}
            className={`${styles.searchInput}`}
          />
          <button className={`${styles.searchButton}`} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>

      <div className={`${styles.productCatalog}`}>
        {searchResults.length > 0 ? (
          searchResults.map((product) => (
            <div
              className={`${styles.productCard}`}
              key={product._id}
              onClick={() => handleProductClick(product)}
            >
              <img
                src={product.ProductImageURL}
                alt={product.ProductName}
                className={`${styles.productImage}`}
              />
              <div className={`${styles.productDetails}`}>
                <h2 className={`${styles.productProductName}`}>
                  {product.ProductName}
                </h2>

                <p className={`${styles.productCategory}`}>
                  Categories: {product.Category.join(", ")}
                </p>
                <p className={`${styles.productQuantity}`}>
                  {product.Quantity} in stock
                </p>
                <p className={`${styles.productPrice}`}>
                  {`Birr ${product.Price.toFixed(2)}`}
                </p>
              </div>
            </div>
          ))
        ) : (
          <h2>No results found</h2>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
