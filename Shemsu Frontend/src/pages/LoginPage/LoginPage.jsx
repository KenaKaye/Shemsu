import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./LoginPageStyle.module.css";
import Cookies from "js-cookie";
import NavBar from "../../NavBar/Navbar";
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";
import MessageHandler from "../../MessageHandler/MessageHandler";

let csrfToken;

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [messageIcon, setMessageIcon] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${apiUrl}/auth/${isSignup ? "signup" : "login"}`;
    const body = isSignup
      ? {
          name,
          username,
          email,
          password,
          location,
          phone,
          BankAccount: accountNumber,
        }
      : { username, password };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (response.ok && isSignup) {
      setMessage("Signup Successful. Please verify account to continue.");
      setMessageIcon("Success");
      sessionStorage.setItem("Email", email);
      setTimeout(() => {
        navigate("/verify");
      }, 3000);
    } else if (response.ok && !isSignup) {
      const responseBody = await response.json();
      Cookies.set("role", responseBody.role);
      csrfToken = response.headers.get("csrfToken");
      navigate("/");
    } else {
      setMessage("Login Failed");
      setMessageIcon("Error");
    }
  };

  useEffect(() => {
    setRole(Cookies.get("role") || "user");
  }, []);

  return (
    <div className={styles.loginPage}>
      <NavBar />
      <div className={styles.mainContent}>
        <ThemeSwitch />
        <h1>{isSignup ? "Sign Up" : "Login"}</h1>
        <form onSubmit={handleSubmit} className={styles.loginForm}>
          {isSignup && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <sub>
                *Should be the same name as in your CBE Account. Otherwise You
                cannot receive payments
              </sub>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="text"
                placeholder="CBE Bank Account Number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              />
            </>
          )}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </button>
      </div>
      {message && (
        <MessageHandler
          message={message}
          redirect=""
          setMessage={setMessage}
          messageIcon={messageIcon}
        />
      )}
    </div>
  );
}
export { csrfToken };

export default LoginPage;
