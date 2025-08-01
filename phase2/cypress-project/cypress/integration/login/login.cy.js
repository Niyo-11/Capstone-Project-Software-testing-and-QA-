// Tests for Login Module using data-driven testing and POM
import loginPage from "../../pages/loginPage";

describe("Login Module Tests", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("Valid login should succeed", () => {
    cy.fixture("loginData.json").then((data) => {
      const valid = data.find((tc) => tc.id === "TC_Login_01");
      loginPage.enterUsername(valid.username);
      loginPage.enterPassword(valid.password);
      loginPage.submit();

      cy.url().should("include", "/dashboard"); // check successful redirect
    });
  });

  it("Invalid login shows error message", () => {
    cy.fixture("loginData.json").then((data) => {
      const invalid = data.find((tc) => tc.id === "TC_Login_02");
      loginPage.enterUsername(invalid.username);
      loginPage.enterPassword(invalid.password);
      loginPage.submit();

      loginPage.errorMessage.should("contain.text", "Invalid credentials");
      cy.url().should("include", "/auth/login"); // remain on login page
    });
  });

  it("Empty username and password shows validation", () => {
    cy.fixture("loginData.json").then((data) => {
      const empty = data.find((tc) => tc.id === "TC_Login_03");
      loginPage.emptyUsername;
      loginPage.emptyPassword;
      //   can not pass empty string to the commnad type
      //   loginPage.enterUsername(empty.username);
      //   loginPage.enterPassword(empty.password);
      loginPage.submit();

      loginPage.errorMessage.should("contain.text", "Username cannot be empty");

      //or
      //   loginPage.requiredMessageUsername.should("contain.text", "Required");
      //   loginPage.requiredMessagePassword.should("contain.text", "Required");
    });
  });

  it("Account lock after multiple failed attempts", () => {
    cy.fixture("loginData.json").then((data) => {
      const lock = data.find((tc) => tc.id === "TC_Login_04");
      for (let i = 0; i < lock.repeatAttempts; i++) {
        loginPage.enterUsername(lock.username);
        loginPage.enterPassword(lock.password);
        loginPage.submit();
        cy.wait(500); // wait between attempts
      }
      loginPage.errorMessage.should("contain.text", "Account locked");
    });
  });

  it("Password field should mask input", () => {
    cy.get(
      ":nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input"
    ).then(($input) => {
      expect($input.attr("type")).to.equal("password");
    });
  });
});
