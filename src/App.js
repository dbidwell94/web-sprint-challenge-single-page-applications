import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { SUBMIT_URL } from "./constants";
import axios from "axios";
import styled from "styled-components";
import * as yup from "yup";
import { ORDER_SCHEMA } from "./constants";
import Home from "./components/home";
import Pizza from "./components/pizza";
import Cart from "./components/cart";
import Navbar from "./components/navbar";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const initialOrder = {
  name: "",
  address: "",
  pizzaSize: 12,
  toppings: {
    sausage: false,
    ham: false,
    pineapple: false,
    pepperoni: false,
  },
  specialInstructions: "",
};
const initialOrderErrors = {
  name: "",
  address: "",
  pizzaSize: "",
  specialInstructions: "",
};

export default function App() {
  const [orderValues, setOrderValues] = useState(initialOrder);
  const [orderErrors, setOrderErrors] = useState(initialOrderErrors);
  const [allowSubmit, setAllowSubmit] = useState(false);
  const [networkError, setNetworkError] = useState('');
  const [cart, setCart] = useState([]);

  const { push } = useHistory();

  function updateValues(name, value, isCheckbox = false, checkboxTitle = "") {
    if (!isCheckbox) {
      setOrderValues({ ...orderValues, [name]: value });
      yup
        .reach(ORDER_SCHEMA, name)
        .validate(value)
        .then((val) => {
          setOrderErrors({ ...orderErrors, [name]: "" });
        })
        .catch((err) => {
          setOrderErrors({ ...orderErrors, [name]: err.errors[0] });
        });
    } else {
      setOrderValues({
        ...orderValues,
        [checkboxTitle]: { ...orderValues[checkboxTitle], [name]: value },
      });
    }
  }

  useEffect(() => {
    ORDER_SCHEMA.validate(orderValues)
      .then((res) => {
        setAllowSubmit(true);
      })
      .catch((err) => {
        setAllowSubmit(false);
      });
  }, [orderValues]);

  function handleSubmit() {
    setAllowSubmit(false);
    axios
      .post(SUBMIT_URL, orderValues)
      .then((res) => {
        setCart([res.data, ...cart]);
        setOrderValues(initialOrder);
        setOrderErrors(initialOrderErrors);
        push("/cart");
        setNetworkError('');
      })
      .catch((err) => {
        setNetworkError(err.message)
      });
  }

  return (
    <Container>
      <Navbar />
      <React.Fragment>
        <Switch>
          <Route path="/pizza">
            <Pizza
              values={orderValues}
              onUpdate={updateValues}
              errors={orderErrors}
              allowSubmit={allowSubmit}
              handleSubmit={handleSubmit}
              networkError={networkError}
            />
          </Route>
          <Route path="/cart">
            <Cart cartItems={cart} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </React.Fragment>
    </Container>
  );
}
