import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  h2 {
    font-size: 2.25rem;
  }
  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    font-size: 1.25rem;
    box-shadow: 0.125rem 0.125rem 0.25rem 0rem black;
    h3 {
      font-size: 1.5rem;
    }
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      li {
        list-style: none;
      }
    }
  }
`;

export default function Cart(props) {
  const { cartItems } = props;

  return (
    <Container>
      <h2>{cartItems.length > 0 && "Congrats! Your order is on its way!"}</h2>
      {cartItems.map((item, index) => {
        return (
          <section className="card" key={`${index}${item.name}`}>
            <h3>Orderer: {item.name}</h3>
            <p>Address: {item.address}</p>
            <p>Size: {item.pizzaSize}"</p>
            <p>Toppings:</p>
            <ul>
              {Object.keys(item.toppings).map((topping) => {
                if (item.toppings[topping]) {
                  return (
                    <li key={`topping${index}${item.name}${topping}`}>
                      {topping}
                    </li>
                  );
                } else {
                  return null;
                }
              })}
            </ul>
            <p>Additional Instructions: {item.specialInstructions}</p>
          </section>
        );
      })}
    </Container>
  );
}

Cart.propTypes = {
  cartItems: propTypes.arrayOf(propTypes.object),
};
