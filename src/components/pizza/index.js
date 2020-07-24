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
  }
`;

export default function Pizza(props) {
  const { values, onUpdate, errors } = props;

  function handleUpdate(event) {
    if (event.target.type === "checkbox") {
        
    } else {
      const { name, value } = event.target;
      onUpdate(name, value);
    }
  }

  return (
    <Container>
      <form>
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
      </form>
    </Container>
  );
}

Pizza.propTypes = {
  values: propTypes.object,
  onUpdate: propTypes.func,
  errors: propTypes.object,
};
