// checkout.spec.js

describe("Checkout Functionality", () => {
  it("Should complete the checkout process successfully", () => {
    cy.visit("http://localhost:5173"); // Replace with your app's URL

    // Interact with your application, filling in the necessary details
    cy.get("[data-cy=email]").type("abdel93@example.com");
    cy.get("[data-cy=name]").type("Abdel");
    // Now, let's add assertions

    // assertion 1
    // Check if the entered values match the typed values
    cy.get("[data-cy=email]").should("have.value", "abdel93@example.com");
    cy.get("[data-cy=name]").should("have.value", "Abdel");

    // assertion 2
    // Click on the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Check that the border of the empty input field becomes red
    cy.get("[data-cy=email-empty]").should("have.class", "border-red-500");
    cy.get("[data-cy=email-not-empty]").should("have.class", "border-gray-300");

    // *************************

    // assertion 3
    cy.get("[data-cy=product-item-0]").should("exist");

    // Check that the product name is a non-empty string
    cy.get("[data-cy=product-name]").should(($div) => {
      const text = $div.text().trim();
      expect(text).to.have.lengthOf.greaterThan(0);
    });

    // Check that the quantity is a non-negative number
    cy.get("[data-cy=product-quantity]").should(($div) => {
      const text = $div.text().trim();
      expect(text).to.match(/^Quantity: \d+$/);
    });

    // Check that the price is in the format $X.XX
    cy.get("[data-cy=product-price]").should(($div) => {
      const text = $div.text().trim();
      expect(text).to.match(/^\$ \d+\.\d{2}$/);
    });

    // assertion 4
    cy.get("[data-cy=address]")
      .click()
      .should("have.attr", "type", "text")
      .should("have.attr", "placeholder", "Type your address")
      .should("exist")
      .should("have.css", "padding", "0.5rem");
    //   This way, you can ensure that all these conditions are met in a single chain of assertions. It makes the test code more concise and easier to understand. If any of these conditions fails, the test will fail at the point of failure, providing a clearer picture of what went wrong.

    // assertion 5
    cy.get("[data-cy=cvv]")
      .click()
      .should("have.attr", "type", "number") // Keep the "number" type assertion
      .should("exist")
      .should("have.css", "padding", "0.5rem");

    cy.get("[data-cy=cvv]").blur().should("have.class", "border-red-500");
    // This assumes that the CVV field is intentionally a number input, and the assertions should align with that expectation.

    // assertion 6
    // Click the checkout button

    // Ensure the loading state is displayed
    cy.get("[data-cy=loading]").should("be.visible");
    // Wait for the loading state to disappear
    cy.get("[data-cy=not-loading]").should("not.exist");
    // cy.get("[data-cy=not-loading]").should("not.be.visible");

    // assertion 7
    // To ensure that the constructJson function has been called and the JSON object has been created, upon clicking on checkout btn ,
    //  I can use spies in Cypress. Spies allow you to intercept and observe function calls. Here's how I might do it:
    // Step 1: Add a spy to the constructJson function
    cy.window().then((win) => {
      cy.spy(win, "constructJson").as("constructJsonSpy");
    });

    // Step 2: Trigger the action (e.g., click on the checkout button)
    cy.get("[data-cy=checkout-btn]").click();

    // Step 3: Assert that the spy was called
    cy.get("@constructJsonSpy").should("have.been.calledOnce");

    // this approach requires that the function you're spying on is accessible from the global scope or the Cypress window. If it's part of a module or component, you may need to make it accessible for testing, for example, by exporting it or modifying your application's code for testing purposes.
    // Assert that the order was placed successfully
    // cy.contains("Order placed successfully").should("be.visible");

    // Fill in input fields
    cy.get("[data-cy=email]").type("test@example.com");
    cy.get("[data-cy=name]").type("John Doe");
    cy.get("[data-cy=address]").type("123 Main St");
    cy.get("[data-cy=cardNumber]").type("1234 5678 9012 3456");
    cy.get("[data-cy=expirationDate]").type("12/25");
    cy.get("[data-cy=cvv]").type("654");

    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Assert that the success message appears
    cy.contains("Order placed successfully").should("exist");
  });
});
