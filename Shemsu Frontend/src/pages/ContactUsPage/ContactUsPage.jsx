import React, { useState } from "react";
import styles from "./ContactUsPageStyle.module.css";
import NavBar from "../../NavBar/Navbar";
import ThemeSwitch from "../../ThemeSwitch/ThemeSwitch";
import emailjs from "emailjs-com";

function ContactUsPage() {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_de5vyf9",
        "template_7a8348k",
        {
          from_name: sender,
          Subject: subject,
          Content: content,
        },
        "ntFfdtgrx0k4xveMc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    setSubject("");
    setContent("");
    setSender("");
  };

  return (
    <div className={styles.contactUsPage}>
      <NavBar />
      <div className={styles.contactForm}>
        <ThemeSwitch />
        <h1>Contact Us</h1>
        <form onSubmit={sendEmail}>
          <input
            type="text"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="Your name"
            required
          />
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
            required
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
