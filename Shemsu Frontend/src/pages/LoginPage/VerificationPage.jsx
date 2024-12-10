import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./VerificationPageStyle.module.css";
import NavBar from "../../NavBar/Navbar";
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";
import MessageHandler from "../../MessageHandler/MessageHandler";

function Verify() {
  const [code, setCode] = useState(null);
  const [message, setMessage] = useState("");
  const [messageIcon, setMessageIcon] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API;

  const handleVerify = async (e) => {
    const url = `${apiUrl}/auth/verify`;
    const email = sessionStorage.getItem("Email");
    const body = { code, email };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      setMessage("Verification Successful. Please login to continue.");
      setMessageIcon("Success");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      setMessage("Verification Failed");
      setMessageIcon("Error");
    }
  };

  return (
    <div className={styles.verificationPage}>
      <NavBar />
      <div className={styles.mainContent}>
        <ThemeSwitch />
        <h1>A verification code was sent to your email</h1>
        <h1>Please enter the code to verify your account</h1>
        <input
          type="number"
          id="codeInput"
          name="codeInput"
          min="100000"
          max="999999"
          onChange={(e) => setCode(e.target.value)}
        />
        <button type="button" onClick={() => handleVerify()}>
          Verify
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

export default Verify;
