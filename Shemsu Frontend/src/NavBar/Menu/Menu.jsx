import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background: var(--brownish-color);
  height: 100vh;
  width: 44%;
  padding: 6rem 1rem;
  padding-right: 0;

  position: fixed;
  top: 0;
  right: 0;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0%)" : "translateX(100%)")};
  z-index: 5;

  a,
  button {
    font-size: 1.4rem;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    color: #000;
    text-decoration: none;
    transition: color 0.3s linear;
    background: none;
    border: none;
    text-align: left;

    &:hover {
      color: #343078;
    }
  }
`;

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link to="/ProductManagement">Product Management</Link>
      <Link to="/login">Login</Link>
      <Link to="/account">Account</Link>
      <Link to="/orders">Orders</Link>
      <Link to="/contact">Contact Us</Link>
    </StyledMenu>
  );
};

export default Menu;
