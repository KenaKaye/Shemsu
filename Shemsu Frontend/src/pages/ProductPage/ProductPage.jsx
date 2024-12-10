import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./ProductPageStyle.module.css";
import Cookies from "js-cookie";
import setGlobalTheme from "../../setGlobalTheme";
import NavBar from "../../NavBar/Navbar";
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";
import PaymentForm from "../../PaymentForm/PaymentForm";

function ProductPage() {
  const [product, setProduct] = useState(null);
  const [owner, setOwner] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const productInfo = JSON.parse(sessionStorage.getItem("product"));
    const ownerInfo = JSON.parse(sessionStorage.getItem("owner"));
    setOwner(ownerInfo);
    setProduct(productInfo);
  }, []);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  if (!product) {
    return (
      <div className={`${styles.homePage}`}>
        <NavBar />
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className={`${styles.productPage}`}>
      <NavBar />
      <div className={`${styles.productData}`}>
        <ThemeSwitch />
        <div className={`${styles.productImageContainer}`}>
          <img
            src={product.ProductImageURL}
            alt={product.ProductName}
            className={`${styles.productImage}`}
          />
        </div>
        <div className={`${styles.productDetailsContainer}`}>
          <h1 className={`${styles.productProductName}`}>
            {product.ProductName}
          </h1>
          <p className={`${styles.productDescription}`}>
            {product.Description}
          </p>
          <p className={`${styles.productCategories}`}>
            Categories: {product.Category.join(", ")}
          </p>
          <p className={`${styles.productQuantity}`}>
            Available: {product.Quantity}
          </p>
          <p className={`${styles.productPrice}`}>
            Price: Birr {product.Price}
          </p>
          <button className={`${styles.buyButton}`} onClick={handleOpenPopup}>
            Buy Product
          </button>
          {isPopupOpen && (
            <>
              <div
                className={`${styles.overlay}`}
                onClick={handleClosePopup}
              ></div>
              <PaymentForm
                onClose={handleClosePopup}
                Price={product.Price}
                ProductName={product.ProductName}
                Owner={owner._id}
                ProductId={product._id}
                Quantity={product.Quantity}
              />
            </>
          )}

          <div className={`${styles.ownerDetails}`}>
            <h3>Seller: {owner.username}</h3>
            <p>Email: {owner.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
