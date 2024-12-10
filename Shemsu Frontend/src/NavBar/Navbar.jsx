import React, { useState } from "react";
import { Link } from "react-router-dom";
import Burger from "./Burger/Burger";
import Menu from "./Menu/Menu";
import styles from "./NavBarStyles.module.css";

function NavBar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img
            src="/anbibu.png"
            alt="Shemsu Logo"
            className={`${styles.anbibuLogo}`}
            width={40}
          />
        </Link>
      </div>
      <div className={styles.navLinks}>
        <Burger open={open} setOpen={setOpen} />
        <Menu open={open} />

        <Link className={styles.bigScreen} to="/ProductManagement">
          Product Management
        </Link>
        <Link className={styles.bigScreen} to="/login">
          Login
        </Link>
        <Link className={styles.bigScreen} to="/account">
          Account
        </Link>
        <Link className={styles.bigScreen} to="/orders">
          Orders
        </Link>
        <Link className={styles.bigScreen} to="/contact">
          Contact Us
        </Link>
      </div>
    </nav>
  );
}

export default NavBar;
