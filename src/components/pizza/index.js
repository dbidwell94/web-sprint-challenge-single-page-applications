import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import { allowedPizzaSizes } from "../../constants";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  box-shadow: 0.25rem 0.25rem 0.5rem 0rem black;
  margin-top: 2rem;
  font-size: 1.5rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    p.error {
      color: red;
      font-size: 1rem;
    }
    .toppings {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    input {
      margin-left: 2rem;
    }
    button{
        margin-top: 2rem;
        width: 100%;
    }
  }
`;

export default function Pizza(props) {
  const { values, onUpdate, errors, allowSubmit, handleSubmit } = props;

  function handleUpdate(event, propName = "") {
    if (event.target.type === "checkbox") {
      const { name, checked } = event.target;
      onUpdate(name, checked, true, propName);
    } else {
      const { name, value } = event.target;
      onUpdate(name, value);
    }
  }

  function submit(e){
    e.preventDefault();
    handleSubmit();
  }

  return (
    <Container>
      <form onSubmit={submit}>
        <p className="error">{errors.name}</p>
        <label htmlFor="name">
          Your name:
          <input
            name="name"
            id="name"
            value={values.name}
            onChange={handleUpdate}
          />
        </label>
        <p className="error">{errors.address}</p>
        <label htmlFor="address">
          Address:
          <input
            name="address"
            id="address"
            value={values.address}
            onChange={handleUpdate}
          />
        </label>
        <p className="error">{errors.pizzaSize}</p>
        <label htmlFor="pizzaSize">
          Pizza Size:
          <select
            name="pizzaSize"
            id="pizzaSize"
            value={values.pizzaSize}
            onChange={handleUpdate}
          >
            {allowedPizzaSizes.map((size) => {
              return <option key={`pizzaSizeAt${size}`}>{size}</option>;
            })}
          </select>
        </label>
        <label htmlFor="toppings" className="toppings">
          Toppings
          {Object.keys(values.toppings).map((topping) => {
            return (
              <label htmlFor={`toppings${topping}`} key={`toppings${topping}`}>
                {topping}
                <input
                  type="checkbox"
                  name={topping}
                  checked={values.toppings[topping]}
                  onChange={(e) => handleUpdate(e, "toppings")}
                />
              </label>
            );
          })}
        </label>
        <button type='submit' disabled={!allowSubmit}>Order</button>
      </form>
    </Container>
  );
}

Pizza.propTypes = {
  values: propTypes.object,
  onUpdate: propTypes.func,
  errors: propTypes.object,
  allowSubmit: propTypes.bool,
  handleSubmit: propTypes.func
};
