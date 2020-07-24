import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Container = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7rem;
  width: 100%;
  background: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "whitesmoke"};
  color: ${(props) => (props.textColor ? props.textColor : "black")};
  a {
    text-decoration: none;
    color: ${(props) => (props.textColor ? props.textColor : "black")};
    padding: 2rem;
    font-size: 2rem;
    border-radius: .5rem;
    border: thin solid whitesmoke;
    margin: 0rem 2rem;
  }
`;

export default function Navbar() {
  return (
    <Container backgroundColor={"black"} textColor={"whitesmoke"}>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/pizza">Pizza</NavLink>
      <NavLink to="/cart">Cart</NavLink>
    </Container>
  );
}
