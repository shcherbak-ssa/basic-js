const CustomError = require("../extensions/custom-error");

const chainMaker = {
  _chain: [],

  /** public */
  getLength() {
    return this._chain.length;
  },
  addLink(value) {
    const transformedValue = this._transformValueToString(value);
    this._chain.push(transformedValue);
    return this;
  },
  removeLink(position) {
    if (this._isValidPosition(position)) {
      this._chain = this._chain.filter((it, index) => index+1 !== position);
      return this;
    }
    this._cleanChain();
    throw new Error();
  },
  reverseChain() {
    this._chain = this._chain.reverse();
    return this;
  },
  finishChain() {
    const result = this._chain.map((item) => `( ${item} )`).join('~~');
    this._cleanChain();
    return result;
  },

  /** private */
  _isValidPosition(position) {
    return typeof(position) === 'number' && position > 0 && position <= this._chain.length;
  },
  _transformValueToString(value) {
    return value === null ? 'null' : value.toString();
  },
  _cleanChain() {
    this._chain.length = 0;
  }
};

module.exports = chainMaker;
