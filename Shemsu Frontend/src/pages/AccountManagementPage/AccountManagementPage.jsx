import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./AccountManagementPageStyle.module.css";
import { csrfToken } from "../LoginPage/LoginPage.jsx";
import Cookies from "js-cookie";
import setGlobalTheme from "../../setGlobalTheme";
import NavBar from "../../NavBar/Navbar";
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";
import MessageHandler from "../../MessageHandler/MessageHandler";

function AccountManagementPage() {
  const [name, setName] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [body, setBody] = useState({});
  const [message, setMessage] = useState("");
  const [messageIcon, setMessageIcon] = useState("");
  const apiUrl = import.meta.env.VITE_API;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await fetch(`${apiUrl}/user/GetUser`, {
        method: "GET",
        credentials: "include",
        headers: {
          "x-csrf-token": csrfToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setName(data.user.name);
        setBankAccount(data.user.BankAccount);
        setEmail(data.user.email);
        setLocation(data.user.location);
        setPhone(data.user.phone);
      } else {
        setMessage("No User Signed In");
        setMessageIcon("Error");
      }
    };
    fetchUserInfo();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/user/EditUser`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      setMessage("User info updated successfully");
      setMessageIcon("Success");
    } else {
      setMessage("Failed to update user info");
      setMessageIcon("Error");
    }
  };

  const handleDeleteAccount = async () => {
    const response = await fetch(`${apiUrl}/user/DeleteUser`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "x-csrf-token": csrfToken,
      },
    });
    if (response.ok) {
      setMessage("Account deleted successfully");
      setMessageIcon("Success");
      navigate("/login");
    } else {
      setMessage("Failed to delete account");
      setMessageIcon("Error");
    }
  };

  const handleLogout = async () => {
    const response = await fetch(`${apiUrl}/auth/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "x-csrf-token": csrfToken,
      },
    });
    if (response.ok) {
      setMessage("Logged out successfully");
      setMessageIcon("Success");
      navigate("/");
    } else {
      setMessage("Failed to log out");
      setMessageIcon("Error");
    }
  };

  return (
    <div className={styles.accountManagementPage}>
      <NavBar />
      <div className={styles.mainContent}>
        <ThemeSwitch />
        <h1>Account Management</h1>
        <form className={styles.form} onSubmit={handleEditSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setBody({ ...body, name: e.target.value });
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setBody({ ...body, email: e.target.value });
            }}
            required
          />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setBody({ ...body, location: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setBody({ ...body, phone: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="CBE Bank Account Number"
            value={bankAccount}
            onChange={(e) => {
              setBankAccount(e.target.value);
              setBody({ ...body, BankAccount: e.target.value });
            }}
            required
          />
          <button type="submit">Update Info</button>
        </form>
        <button className={styles.deleteButton} onClick={handleDeleteAccount}>
          Delete Account
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      {message && (
        <MessageHandler
          message={message}
          redirect="login"
          setMessage={setMessage}
          messageIcon={messageIcon}
        />
      )}
    </div>
  );
}

export default AccountManagementPage;
