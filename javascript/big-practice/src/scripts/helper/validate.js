import { ERROR_MSG } from '../constants/messages';
import { REGEXP, MINIMUM_PASSWORD_LENGTH } from '../constants/regexp';
import { showElement, hideElement } from './elementHelpers';

export default class Validate {
  constructor() {
    this.errorMsgMail = document.getElementById('msg-error-email');
    this.errorMsgPass = document.getElementById('msg-error-password');
  }

  /**
   * Function check regexp of input
   * @param {String} value from input
   * @param {String} rules is regexp of each filed
   *
   * @returns {Boolean} isError
   */
  static checkRules(value, regexp) {
    let isError = false;

    if (!value.match(regexp)) {
      isError = true;
    }

    return isError;
  }

  /**
   * Function check empty of input
   *
   * @param {String} value from input
   *
   * @returns {Boolean} isError
   */
  static checkEmpty(value) {
    return value === '';
  }

  /**
   * Function check length if length of input less than 8
   *
   * @param {String} value from input
   *
   * @returns {Boolean} isError
   */
  static checkLength(value) {
    return value.length < MINIMUM_PASSWORD_LENGTH;
  }

  /**
   * Function check empty and valid of email
   * @param {*} element inout email
   * @param {*} rules rules of email
   *
   * @returns {boolean} checkEmail
   */
  validateEmail(element) {
    let checkEmail = false;
    const isRules = Validate.checkRules(element, REGEXP.REGEXP_MAIL);
    const isEmpty = Validate.checkEmpty(element);

    if (isEmpty) {
      showElement(this.errorMsgMail);
      this.errorMsgMail.innerHTML = ERROR_MSG.EMAIL_EMPTY;
    } else if (isRules) {
      showElement(this.errorMsgMail);
      this.errorMsgMail.innerHTML = ERROR_MSG.EMAIL_INVALID;
    } else {
      hideElement(this.errorMsgMail);
    }

    if (!isRules && !isEmpty) {
      checkEmail = true;
    }

    return checkEmail;
  }

  /**
   * Function check empty,valid and length of password
   * @param {*} element input password
   * @param {*} rules rules of password
   *
   * @returns {boolean} checkPass
   */
  validatePassword(element) {
    let checkPass = false;
    const isRules = Validate.checkRules(element, REGEXP.REGEXP_PASSWORD);
    const isLength = Validate.checkLength(element);
    const isEmpty = Validate.checkEmpty(element);

    if (isEmpty) {
      showElement(this.errorMsgPass);
      this.errorMsgPass.innerHTML = ERROR_MSG.PASSWORD_EMPTY;
    } else if (isRules) {
      showElement(this.errorMsgPass);
      this.errorMsgPass.innerHTML = ERROR_MSG.PASSWORD_INVALID;
    } else if (isLength) {
      showElement(this.errorMsgPass);
      this.errorMsgPass.innerHTML = ERROR_MSG.PASSWORD_LEAST;
    } else {
      hideElement(this.errorMsgPass);
    }

    if (!isRules && !isEmpty && !isLength) {
      checkPass = true;
    }

    return checkPass;
  }
}