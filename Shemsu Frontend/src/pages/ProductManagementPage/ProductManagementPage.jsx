import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ProductManagementPageStyle.module.css";
import { csrfToken } from "../LoginPage/LoginPage.jsx";
import NavBar from "../../NavBar/Navbar";
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";
import AddProductView from "./AddProductView.jsx";
import EditProductView from "./EditProductView.jsx";
import DeleteProductView from "./DeleteProductView.jsx";
import SearchProductView from "./SearchProductView.jsx";
import MessageHandler from "../../MessageHandler/MessageHandler";

function ProductManagementPage() {
  const [view, setView] = useState("addProduct");
  const [message, setMessage] = useState("");
  const [messageIcon, setMessageIcon] = useState("");
  const [redirect, setRedirect] = useState("");
  const [selected, setSelected] = useState("Add");
  const apiUrl = import.meta.env.VITE_API;

  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(`${apiUrl}/auth/check`, {
        method: "GET",
        credentials: "include",
        headers: {
          "x-csrf-token": csrfToken,
        },
      });
      if (!response.ok) {
        setMessage("No User Signed In");
        setMessageIcon("Error");
        setRedirect("login");
      }
    };
    checkAuth();
  }, [apiUrl]);

  const renderView = () => {
    switch (view) {
      case "addProduct":
        return (
          <AddProductView
            setMessage={setMessage}
            setMessageIcon={setMessageIcon}
            setRedirect={setRedirect}
          />
        );
      case "editProduct":
        return (
          <EditProductView
            setMessage={setMessage}
            setMessageIcon={setMessageIcon}
            setRedirect={setRedirect}
          />
        );
      case "deleteProduct":
        return (
          <DeleteProductView
            setMessage={setMessage}
            setMessageIcon={setMessageIcon}
            setRedirect={setRedirect}
          />
        );
      case "searchProduct":
        return (
          <SearchProductView
            setMessage={setMessage}
            setMessageIcon={setMessageIcon}
            setRedirect={setRedirect}
          />
        );
      default:
        return (
          <AddProductView
            setMessage={setMessage}
            setMessageIcon={setMessageIcon}
          />
        );
    }
  };

  return (
    <div className={styles.productManagementPage}>
      <NavBar />
      <div className={styles.mainContent}>
        <ThemeSwitch />
        <div className={styles.buttonGroup}>
          <button
            className={selected == "Add" ? styles.selected : ""}
            onClick={() => {
              setView("addProduct");
              setSelected("Add");
            }}
          >
            Add Product
          </button>
          <button
            className={selected == "Edit" ? styles.selected : ""}
            onClick={() => {
              setView("editProduct");
              setSelected("Edit");
            }}
          >
            Edit Product
          </button>
          <button
            className={selected == "Delete" ? styles.selected : ""}
            onClick={() => {
              setView("deleteProduct");
              setSelected("Delete");
            }}
          >
            Delete Product
          </button>
          <button
            className={selected == "Search" ? styles.selected : ""}
            onClick={() => {
              setView("searchProduct");
              setSelected("Search");
            }}
          >
            Search Product
          </button>
        </div>
        <div className={styles.viewContainer}>{renderView()}</div>
      </div>
      {message && (
        <MessageHandler
          message={message}
          redirect={redirect}
          setMessage={setMessage}
          messageIcon={messageIcon}
        />
      )}
    </div>
  );
}

export default ProductManagementPage;
