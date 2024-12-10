import { React, useState, useEffect } from "react";
import styled from "styled-components";
import MessageHandler from "../MessageHandler/MessageHandler.jsx";

const StyledWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--theme);
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 11;
  opacity: 1;
  border-radius: 12px;

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.7rem;
    cursor: pointer;
  }
`;

const PaymentForm = ({
  onClose,
  Price,
  ProductName,
  Owner,
  ProductId,
  Quantity,
}) => {
  const apiURL = import.meta.env.VITE_API;
  const [FName, setFName] = useState("");
  const [LName, setLName] = useState("");
  const [Phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [messageIcon, setMessageIcon] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("FirstName", FName);
    formData.append("LastName", LName);
    formData.append("Phone", Phone);
    formData.append("Quantity", quantity);
    formData.append("Price", Price);
    formData.append("ProductName", ProductName);
    formData.append("OwnerId", Owner);
    formData.append("ProductId", ProductId);
    formData.append("BuyerEmail", email);
    formData.append("ReturnURL", window.location.href);

    console.log(formData.get("FirstName"));
    const response = await fetch(`${apiURL}/order/BuyProduct`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
    if (data.checkout_url) {
      window.location.href = data.checkout_url;
    } else {
      setMessage("Payment Failed");
      setMessageIcon("Error");
    }
  };

  return (
    <StyledWrapper>
      <div className="popup">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Payment Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="FirstName">First Name</label>
          <input
            type="text"
            id="FirstName"
            placeholder="First Name"
            value={FName}
            onChange={(e) => setFName(e.target.value)}
            required
          />
          <label htmlFor="LastName">Last Name</label>
          <input
            type="text"
            id="LastName"
            placeholder="Last Name"
            value={LName}
            onChange={(e) => setLName(e.target.value)}
            required
          />
          <label htmlFor="PhoneNumber">Phone Number</label>
          <input
            type="tel"
            id="PhoneNumber"
            placeholder="Phone Number"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="Quantity">Quantity to Buy</label>
          <input
            type="number"
            id="Quantity"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            max={Quantity}
          />
          <h2>Birr {Price}</h2>
          <button type="submit">Pay</button>
        </form>
      </div>
      {message && (
        <MessageHandler
          message={message}
          redirect=""
          setMessage={setMessage}
          messageIcon={messageIcon}
        />
      )}
    </StyledWrapper>
  );
};

export default PaymentForm;
