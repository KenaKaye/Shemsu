import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./HomePageStyle.module.css";
import Cookies from "js-cookie";
import setGlobalTheme from "../../setGlobalTheme";
import NavBar from "../../NavBar/Navbar";
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";
import emailjs from "emailjs-com";

function HomePage() {
  const apiUrl = import.meta.env.VITE_API;
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    const response = await fetch(`${apiUrl}/search/product/${query}`);
    const data = await response.json();

    sessionStorage.setItem("searchResults", JSON.stringify(data.products));
    navigate("/search");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.homePage}>
      <NavBar />
      <div className={styles.mainContent}>
        <ThemeSwitch />
        <h1 className={styles.Greeting}>Welcome to Shemsu</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products..."
            onKeyDown={handleKeyPress}
          />
          <button className={styles.searchButton} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
