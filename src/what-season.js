const CustomError = require("../extensions/custom-error");

const DATE_ABSENCE_ANSWER = 'Unable to determine the time of year!';

module.exports = function getSeason(date) {
  if (date === undefined) return DATE_ABSENCE_ANSWER;
  if (!(date instanceof Date) || Object.prototype.toString.call(date) !== "[object Date]") throw new Error();
  switch (date.getMonth()) {
    case 11: case 0: case 1: return 'winter';
    case 2: case 3: case 4: return 'spring';
    case 5: case 6: case 7: return 'summer';
    case 8: case 9: case 10: return 'autumn';
    default: return 'fail';
  }
};
