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
    cy.get("[data-cy=cvc]")
      .click()
      .should("have.attr", "type", "number") // Keep the "number" type assertion
      .should("exist")
      .should("have.css", "padding", "0.5rem");

    cy.get("[data-cy=cvc]").blur().should("have.class", "border-red-500");
    // This assumes that the CVC field is intentionally a number input, and the assertions should align with that expectation.

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
    cy.get("[data-cy=cvc]").type("654");

    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Assert that the success message appears
    cy.contains("Order placed successfully").should("exist");
  });
});

// *********************************

// Additional Negative Scenarios:
// Invalid Email:

// Test attempting to place an order with an invalid email.
// For example, use an email without the '@' symbol.
// Incomplete Credit Card Details:

// Test attempting to place an order with incomplete credit card details.
// For example, leave out the CVC or expiration date.
// Handling Loading and Non-Loading States:
// Loading State:
// Test scenarios where the loading state is triggered (e.g., clicking the checkout button).
// Ensure that elements indicative of loading are visible.
// Non-Loading State:
// Test scenarios where the loading state should disappear.
// Ensure that elements indicative of loading are not visible.
// Testing Asynchronous Behavior:
// Waiting for Elements:
// Test scenarios where you need to wait for certain elements to appear or disappear.
// For example, wait for the success message to appear after a successful order placement.
// Checking for Absence of Success Message:
// Order Not Placed Successfully:
// Test scenarios where the order is not placed successfully.
// Ensure that the success message is not present or is replaced by an error message.

describe("Additional Test Scenarios", () => {
  // vallid email test scenario
  it("Should handle invalid email during checkout", () => {
    // Fill in the necessary details with an invalid email
    cy.get("[data-cy=email]").type("ethan_test@gmail.c" || "hamzagmail.com");

    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Ensure an appropriate error message is displayed
    cy.contains("Invalid email").should("exist");
  });
  // vallid email test scenario
  it("Should handle valid email during checkout", () => {
    // Fill in the necessary details with an invalid email
    cy.get("[data-cy=email]").type("ethan_444@gmail.com");

    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Ensure an appropriate error message is displayed
    cy.contains("valid email").should("exist");
  });

  // invallid cvc scenario
  it("Should handle invalid CVC during checkout", () => {
    // Fill in the necessary details with incomplete credit card details
    cy.get("[data-cy=cvc]").type("12"); // Incomplete CVC

    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Ensure an appropriate error message is displayed
    cy.contains("CVC must be 3 digits long").should("exist");
  });

  // vallid cvc scenario
  it("Should handle valid CVC during checkout", () => {
    // Fill in the necessary details with incomplete credit card details
    cy.get("[data-cy=cvc]").type("450"); // Incomplete CVC

    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Ensure an appropriate error message is displayed
    cy.contains("CVC is valid").should("exist");
  });

  // invallid CN scenario
  it("Should handle invalid credit card number during checkout", () => {
    // Fill in the necessary details with incomplete credit card details
    cy.get("[data-cy=creditcard]").type("122101215487444");
    // cy.get("[data-cy=creditcard]").type("02154444");

    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Ensure an appropriate error message is displayed
    cy.contains("Credit card number is not valid.").should("exist");
    cy.contains("Credit card number must be 16 digits.").should("exist");
  });

  it("Should handle loading and non-loading states during checkout", () => {
    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Ensure loading state is visible
    cy.get("[data-cy=loading]").should("be.visible");

    // Wait for loading state to disappear
    cy.get("[data-cy=not-loading]").should("not.exist");
  });

  it("Should wait for success message after successful order placement", () => {
    // Fill in valid details
    cy.get("[data-cy=email]").type("ilias9541@gmail.com");
    cy.get("[data-cy=name]").type("ilias hafidi");
    cy.get("[data-cy=address]").type("37 RUE BARTEL CASA MAROC");
    cy.get("[data-cy=creditcard]").type("4456 5300 0000 1005");
    cy.get("[data-cy=cvc]").type("025");
    cy.get("[data-cy=cy-month]").type("5");
    cy.get("[data-cy=cy-year]").type("2029");

    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Wait for success message to appear
    cy.contains("Order placed successfully").should("exist");
    cy.get("[data-cy=success-modal]").should("be.visible");
    // Click the close button
    cy.get("[data-cy=modal-close-btn]").click();
    cy.get("[data-cy=success-modal]").should("not.exist");
  });

  it("Should handle scenarios where the order is not placed successfully", () => {
    // Simulate a scenario where the order fails (e.g., mock server response)
    cy.get("[data-cy=email]").type("ilias9541@gmail.f");
    cy.get("[data-cy=name]").type("ilias hafidi");
    cy.get("[data-cy=address]").type("37 RUE BARTEL CASA MAROC");
    cy.get("[data-cy=creditcard]").type("4456 5300 0000 ");
    cy.get("[data-cy=cvc]").type("025");
    cy.get("[data-cy=cy-month]").type("5");
    cy.get("[data-cy=cy-year]").type("");

    // Click the checkout button
    cy.get("[data-cy=checkout-btn]").click();

    // Ensure the absence of the success message
    cy.contains("Order placed successfully").should("not.exist");

    // Ensure an appropriate error message is displayed
    cy.contains("Failed to place order").should("exist");
    cy.get("[data-cy=success-modal]").should("not.exist");
    // This approach makes sense, as I want to verify that when the order fails to be placed, the success modal is not present. It aligns with the expected behavior that the success modal should only appear when the order is successfully placed.
  });
});
// Feel free to adapt these test cases based on the actual behavior of your application and how error messages are handled.
