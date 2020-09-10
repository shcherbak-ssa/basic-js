const CustomError = require("../extensions/custom-error");

const actions = ['--discard-prev', '--discard-next', '--double-prev', '--double-next'];
const DONE_ACTION = '--done-action';

module.exports = function transform(arr) {
  if (arr.length === 0) return [];
  if (!Array.isArray(arr)) throw new Error();

  const copyArray = [...arr];
  transformArray(copyArray);
  return cleanResultArray(copyArray);
};

function transformArray(arr) {
  let position = null;
  const actionName = arr.find((item, index) => {
    position = index;
    return actions.includes(item)
  });

  if (!actionName) return;
  doAction(actionName, position, arr);
  transformArray(arr);
}

function cleanResultArray(arr) {
  return arr.filter((item) => item !== DONE_ACTION);
}

function doAction(actionName, posision, arr) {
  switch (actionName) {
    case '--discard-prev': return discardPrev(posision, arr);
    case '--discard-next': return discardNext(posision, arr);
    case '--double-prev': return doublePrev(posision, arr);
    case '--double-next': return doubleNext(posision, arr);
  }
}

/** actions */
function discardPrev(position, arr) {
  if (position === 0) return setDoneAction(arr, position);
  const prevPosition = position - 1;
  arr.splice(prevPosition, 2, DONE_ACTION);
}

function discardNext(position, arr) {
  if (position + 1 === arr.length) return setDoneAction(arr, position);
  arr.splice(position, 2, DONE_ACTION);
}

function doublePrev(position, arr) {
  if (position === 0) return setDoneAction(arr, position);
  const doubleNumber = arr[position - 1];
  arr.splice(position, 1, doubleNumber, DONE_ACTION);
}

function doubleNext(position, arr) {
  if (position + 1 === arr.length) return setDoneAction(arr, position);
  const doubleNumber = arr[position + 1];
  arr.splice(position, 1, DONE_ACTION, doubleNumber);
}

function setDoneAction(arr, position) {
  arr.splice(position, 1, DONE_ACTION);
}
