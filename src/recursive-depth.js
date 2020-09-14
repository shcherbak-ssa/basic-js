const CustomError = require("../extensions/custom-error");

module.exports = class DepthCalculator {
  _depth = new Set();
  _countDepth = 0;

  calculateDepth(arr) {
    this._incrementCountDepth();
    for (const item of arr) {
      if (Array.isArray(item)) this._parseNestArray(item);
    }
    return this._returnCountDepth();
  }

  _parseNestArray(arr) {
    const depth = this.calculateDepth(arr);
    this._depth.add(depth);
    this._decrementCountDepth();
  }

  _returnCountDepth() {
    return this._countDepth === 1
      ? this._getMaxDepthCount() : this._countDepth;
  }

  _getMaxDepthCount() {
    let maxValue = 1;
    this._depth.forEach((value) => {
      if (value > maxValue) maxValue = value;
    });
    this._clearWorkingData();
    return maxValue;
  }

  _incrementCountDepth() {
    this._countDepth += 1;
  }
  _decrementCountDepth() {
    this._countDepth -= 1;
  }

  _clearWorkingData() {
    this._depth.clear();
    this._countDepth = 0;
  }
};