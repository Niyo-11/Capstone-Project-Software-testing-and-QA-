// Handles Login page actions and elements

class LoginPage {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  get usernameInput() {
    return cy.get(
      ":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input"
    );
  }

  get passwordInput() {
    return cy.get(
      ":nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input"
    );
  }

  get loginButton() {
    return cy.get(".oxd-button");
  }

  get errorMessage() {
    return cy.get(".oxd-alert-content");
  }

  get requiredMessageUsername() {
    return cy.get(":nth-child(2) > .oxd-input-group > .oxd-text");
  }
  get requiredMessagePassword() {
    return cy.get(':nth-child(3) > .oxd-input-group > .oxd-text');
  }

  enterUsername(username) {
    this.usernameInput.clear().type(username);
  }

  enterPassword(password) {
    this.passwordInput.clear().type(password);
  }

  emptyUsername() {
    this.usernameInput.clear();
  }

  emptyPassword() {
    this.passwordInput.clear();
  }

  submit() {
    this.loginButton.click();
  }
}

export default new LoginPage();
