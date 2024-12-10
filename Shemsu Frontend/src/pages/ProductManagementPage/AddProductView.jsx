import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductManagementPageStyle.module.css";
import { csrfToken } from "../LoginPage/LoginPage.jsx";
import MessageHandler from "../../MessageHandler/MessageHandler";

function AddProductView({ setMessage, setMessageIcon, setRedirect }) {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const apiUrl = import.meta.env.VITE_API;

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

    console.log(formData);

    const response = await fetch(`${apiUrl}/products/AddProduct`, {
      method: "POST",
      credentials: "include",
      body: formData,
      headers: {
        "x-csrf-token": csrfToken,
      },
    });

    if (response.ok) {
      setMessage("Product added successfully");
      setMessageIcon("Success");
      setRedirect("");
    } else {
      setMessage("Failed to add product");
      setMessageIcon("Error");
      setRedirect("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="ProductName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        required
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
        placeholder="Quantity"
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
      <button type="submit">Add Product</button>
    </form>
  );
}

export default AddProductView;
