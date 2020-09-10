const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(direct = true) {
    this._direct = direct;
  }

  /** public mehtods */
  encrypt(message, key) {
    if (this._isAdsenceParams(message, key)) throw new Error();
    
    return this._transformResult(result);
  }    
  decrypt(encryptedMessage, key) {
    if (this._isAdsenceParams(encryptedMessage, key)) throw new Error();
    
    return this._transformResult(result);
  }

  /** private methods */
  _isAdsenceParams(message, key) {
    return message === undefined || key === undefined;
  }
  _isValidChar(char) {
    return (char >= 65 && char <= 90) || (char >= 97 && char <= 122);
  }
  _transformResult(result) {
    if (!this._direct) result = result.reverse();
    return result.join('').toUpperCase()
  }
}

module.exports = VigenereCipheringMachine;
