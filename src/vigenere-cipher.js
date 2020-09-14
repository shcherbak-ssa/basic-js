const CustomError = require("../extensions/custom-error");

class VigenereCipheringMachine {
  constructor(direct = true) {
    this._direct = direct;
  }

  /** public mehtods */
  encrypt(message, key) {
    if (this._isAdsenceParams(message, key)) throw new Error();
    
    const encryptMessage = this._doCrypt(message, key, 'encrypt');;
    return this._transformResult(encryptMessage);
  }    
  decrypt(encryptedMessage, key) {
    if (this._isAdsenceParams(encryptedMessage, key)) throw new Error();

    const decryptMessage = this._doCrypt(encryptedMessage, key, 'decrypt');
    return this._transformResult(decryptMessage);
  }

  /** private methods */
  _isAdsenceParams(message, key) {
    return message === undefined || key === undefined;
  }

  _doCrypt(message, key, action) {
    const actionFormula = this._getActionFormule(action);
    const [messageCodes, keywordCodes] = this._transformParams(message, key);
    const messageLen = message.length;
    const cryptMessage = [];

    let j = 0, i = 0, code = 0;
    for (; i < messageLen; i += 1) {
      const messageCodeItem = messageCodes[i];
      if (this._isLetterCode(messageCodeItem)) {
        code = (actionFormula(messageCodeItem, keywordCodes[i - j]) % 26) + 65;
      } else {
        code = messageCodeItem;
        j += 1;
      }
      
      const char = String.fromCharCode(code);
      cryptMessage.push(char);
    }

    return cryptMessage;
  }
  _getActionFormule(action) {
    switch (action) {
      case 'encrypt': return (messageCodeItem, keywordCodeItem) => {
        return messageCodeItem + keywordCodeItem
      };
      case 'decrypt': return (messageCodeItem, keywordCodeItem) => {
        return messageCodeItem - keywordCodeItem + 26
      };
    }
  }
  _isLetterCode(code) {
    return code >= 65 && code <= 90
  }

  _transformParams(message, key) {
    const keyword = this._transformKeyword(message, key);
    const messageCodes = this._transformCharToCode(message);
    const keywordCodes = this._transformCharToCode(keyword);
    return [messageCodes, keywordCodes];
  }
  _transformKeyword(message, key) {
    const keyLen = key.length; 
    const keyword = [];
    for (let i = 0; ; i += 1) {
      if (keyLen === i) i = 0;
      if (keyword.length === message.length) break; 
      keyword.push(key[i]);
    } 
    return keyword.join('');
  }
  _transformCharToCode(str) {
    return str.toUpperCase().split('').map((item) => item.charCodeAt(0));
  }

  _transformResult(result) {
    if (!this._direct) result = result.reverse();
    return result.join('').toUpperCase()
  }
}

module.exports = VigenereCipheringMachine;
