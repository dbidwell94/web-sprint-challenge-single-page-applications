/// <reference types='cypress' />

describe("User can enter valules", () => {
  it("Can navigate to the site", () => {
    cy.visit("localhost:3000/pizza")
      .url()
      .should("match", /localhost/);
  });
  it("Can type their name", () => {
    cy.get("#name").type("devin").should("have.value", "devin");
  });
  it("Can type their address", () => {
    cy.get('#address').type('1234 Something Ln')
      .should('have.value', '1234 Something Ln');
  })
  it("Can select toppings", () => {
    cy.get('input[name="sausage"]').check();
    cy.get('input[name="ham"]').check()
    cy.get('input[name="pineapple"]').check()
    cy.get('input[name="pepperoni"]').check()
  })
  it("Can place the order", () => {
    cy.get('button[type="submit"]').click()
  })
});
