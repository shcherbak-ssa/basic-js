const CustomError = require("../extensions/custom-error");

const defaultOptions = {
  separator: '+',
  repeatTimes: 1,
  additionSeparator: '|',
  additionRepeatTimes: 1
};

module.exports = function repeater(str, options) {
  const repeatString = checkRepeatString(str);
  const repeatOptions = checkRepeatOptions(options);
  return repeatMainString(repeatString, repeatOptions);
};

/** check */

// check repeat string
function checkRepeatString(str) {
  return checkStringParameter(str)
}

function checkStringParameter(str) {
  if (str === null) return 'null';
  return str !== undefined ? transformToString(str) : '';
}
function transformToString(value) {
  return typeof(value) === 'string' ? value : value.toString();
}

// check repeat options
function checkRepeatOptions(options) {
  return {
    separator: setSeparator(options),
    repeatTimes: setRepeatTimes(options),
    addition: setAddition(options),
    additionSeparator: setAdditionSeparator(options),
    additionRepeatTimes: setAdditionRepeatTimes(options)
  }
}

function setSeparator({separator}) {
  return separator || '+'
}
function setRepeatTimes({repeatTimes}) {
  return checkTimesParameter(repeatTimes);
}
function setAddition({addition}) {
  return checkAdditionString(addition);
}
function setAdditionSeparator({additionSeparator}) {
  return additionSeparator || '|'
}
function setAdditionRepeatTimes({additionRepeatTimes}) {
  return checkTimesParameter(additionRepeatTimes);
}

function checkAdditionString(addition) {
  return checkStringParameter(addition);
}
function checkTimesParameter(times) {
  return !times || isNaN(times) || typeof(times) !== 'number' ? 1 : times;
}

/** repeat */
function repeatMainString(string, options) {
  const addition = repeatAddition(options);
  return repeat(string + addition, options.repeatTimes).join(options.separator);
}

function repeatAddition({addition, additionRepeatTimes, additionSeparator}) {
  return repeat(addition, additionRepeatTimes).join(additionSeparator);
}

function repeat(string, times) {
  const result = [];
  let i = 0;
  while (i < times) result[i++] = string;
  return result
}