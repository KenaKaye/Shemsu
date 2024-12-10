import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductManagementPageStyle.module.css";
import { csrfToken } from "../LoginPage/LoginPage.jsx";
import MessageHandler from "../../MessageHandler/MessageHandler";

function SearchProductView({ setMessage, setMessageIcon, setRedirect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const apiUrl = import.meta.env.VITE_API;

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/products/SearchProduct/${query}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "x-csrf-token": csrfToken,
      },
    });

    if (response.ok) {
      const data = await response.json();
      setResults(data.products);
    } else {
      setMessage("Failed to find products");
      setMessageIcon("Error");
      setRedirect("");
    }
  };

  return (
    <div className={`${styles.searchedProducts}`}>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by ProductName or Category"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>
      <div className={styles.results}>
        {results.length === 0 ? (
          <h3 className={styles.noProducts}>No Products found</h3>
        ) : (
          results.map((product) => (
            <div key={product._id} className={styles.product}>
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
        )}
      </div>
    </div>
  );
}

export default SearchProductView;
