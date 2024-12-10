import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductManagementPageStyle.module.css";
import { csrfToken } from "../LoginPage/LoginPage.jsx";
import MessageHandler from "../../MessageHandler/MessageHandler";

function EditProductView({ setMessage, setMessageIcon, setRedirect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
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

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setProductName(product.ProductName);
    setCategory(product.Category.join(", "));
    setDescription(product.Description);
    setQuantity(product.Quantity);
    setPrice(product.Price);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ProductName", productName);
    formData.append(
      "Category",
      JSON.stringify(category.split(",").map((g) => g.trim()))
    );
    formData.append("Description", description);
    formData.append("Quantity", quantity);
    formData.append("Price", price);
    if (image) {
      formData.append("image", image);
    }

    const response = await fetch(
      `${apiUrl}/products/EditProduct/${selectedProduct._id}`,
      {
        method: "PATCH",
        credentials: "include",
        body: formData,
        headers: {
          "x-csrf-token": csrfToken,
        },
      }
    );

    if (response.ok) {
      setMessage("Product edited successfully");
      setMessageIcon("Success");
      setRedirect("");
      setSelectedProduct(null);
    } else {
      setMessage("Failed to edit product");
      setMessageIcon("Error");
      setRedirect("");
    }
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by ProductName or Category to Edit"
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
              <button onClick={() => handleEditClick(product)}>Edit</button>
            </div>
          ))
        )}
      </div>
      {selectedProduct && (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="ProductName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Category (comma separated)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Number of Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default EditProductView;
