import React, {useState, useEffect} from "react";
import propTypes from "prop-types";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Pizza from "./components/pizza";
import Cart from "./components/cart";
import Navbar from "./components/navbar";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export default function App() {
  return (
    <Container>
      <Navbar />
      <React.Fragment>
        <Switch>
          <Route path="/pizza">
            <Pizza />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </React.Fragment>
    </Container>
  );
}
