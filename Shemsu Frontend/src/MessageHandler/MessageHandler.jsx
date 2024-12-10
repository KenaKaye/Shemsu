import { React } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    z-index: 10;
  }

  main {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    z-index: 11;
    background-color: #f5f5f5;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
    padding: 20px;
    border-radius: 12px;
  }

  img {
    width: 15%;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.7rem;
    cursor: pointer;
  }

  .redirectTo {
    width: fit-content;
    padding: 10px 20px;
    background-color: var(--brownish-color);
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    text-transform: uppercase;
  }
`;

const MessageHandler = ({ message, redirect, setMessage, messageIcon }) => {
  return (
    <StyledMessage>
      <div className="overlay" onClick={() => setMessage(null)}></div>
      <main>
        <span className="close" onClick={() => setMessage(null)}>
          &times;
        </span>
        <img
          src={
            messageIcon == "Error"
              ? "Error.png"
              : messageIcon == "Success"
              ? "Success.png"
              : "Info.png"
          }
          alt="Message Icon"
        />
        <h1>{message}</h1>
        {redirect && (
          <Link
            className="redirectTo"
            to={`/${redirect != "home" ? redirect : ""}`}
          >
            {redirect}
          </Link>
        )}
      </main>
    </StyledMessage>
  );
};

export default MessageHandler;
