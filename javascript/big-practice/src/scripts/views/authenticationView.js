import { ERROR_MSG } from '../constants/messages';
import { authService } from '../helper/authService';
import Validate from '../helper/validate';
import { showElement, hideElement } from '../helper/elementHelpers';

/**
 * LOGIN FORM
 * Open and close the form
 * Form validation
 */
export default class AuthenticationView {
  constructor() {
    this.validate = new Validate();

    this.successMsg = document.getElementById('msg-success');
    this.errorMsgMail = document.getElementById('msg-error-email');
    this.errorMsgPass = document.getElementById('msg-error-password');

    this.showLoginBtn = document.getElementById('btn-show-login');
    this.logoutBtn = document.getElementById('btn-logout');

    this.loginForm = document.getElementById('login-form');
    this.btnCloseForm = document.getElementById('btn-close-form');
    this.login = document.getElementById('login');
    this.email = document.getElementById('input-email');
    this.password = document.getElementById('input-password');
  }

  /**
   * Bind open login form
   */
  bindOpenLoginForm() {
    this.showLoginBtn.addEventListener('click', () => {
      showElement(this.loginForm);
    });
  }

  /**
   * Bind close login form to close button
   */
  bindCloseLoginForm() {
    this.btnCloseForm.addEventListener('click', (event) => {
      this.closeLoginForm(event);
    });
  }

  /**
   * Function for close login form
   */
  closeLoginForm() {
    hideElement(this.loginForm);
    this.login.reset();
    this.removeMsg();
  }

  /**
   * Function remove messages when login
   */
  removeMsg() {
    hideElement(this.successMsg);
    hideElement(this.errorMsgMail);
    hideElement(this.errorMsgPass);
  }

  /**
   * Function get value from input email and password
   */
  get emailInput() {
    return this.email.value.trim();
  }

  get passwordInput() {
    return this.password.value.trim();
  }

  /**
   * Function show/hide button login/logout if have user
   */
  showHideStatus() {
    if (authService.getUser()) {
      showElement(this.logoutBtn);
      hideElement(this.showLoginBtn);
    } else {
      showElement(this.showLoginBtn);
      hideElement(this.logoutBtn);
    }
  }

  /**
   * Function to display the msg if login fail
   */
  showMessageLogin(loginMode) {
    if (!loginMode) {
      this.errorMsgPass.textContent = ERROR_MSG.PASSWORD_INCORRECT;
      showElement(this.errorMsgPass);
      this.errorMsgMail.textContent = ERROR_MSG.EMAIL_INCORRECT;
      showElement(this.errorMsgMail);
    }
  }

  /**
   * Bind login
   * @param {function} handler
   */
  async bindLogin(handler) {
    this.login.addEventListener('submit', async (event) => {
      event.preventDefault();
      this.validateForm(handler);
    });
  }

  /**
   * Function check valid of email and password
   * @param {function} handler
   */
  validateForm(handler) {
    const isEmail = this.validate.validateEmail(this.emailInput);
    const isPass = this.validate.validatePassword(this.passwordInput);

    if (isEmail && isPass) {
      handler(this.emailInput, this.passwordInput);
    }
  }

  /**
   * Bind logout
   * @param {function} handler
   */
  bindLogout(handler) {
    this.logoutBtn.addEventListener('click', () => {
      handler();
      this.showHideStatus();
    });
  }
}