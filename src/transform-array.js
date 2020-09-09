const CustomError = require("../extensions/custom-error");

const actions = ['--discard-prev', '--discard-next', '--double-prev', '--double-next'];

module.exports = function transform(arr) {
  if (arr.length === 0) return [];
  if (!Array.isArray(arr)) throw new Error();

  transformArray(arr);
  // let position = null;
  // const actionName = arr.find((item, index) => {
  //   position = index;
  //   return actions.includes(item)
  // });
  // return [position, actionName];
  return cleanResultArray(arr);
};

function transformArray(arr) {
  let position = null;
  const actionName = arr.find((item, index) => {
    position = index;
    return actions.includes(item)
  });

  if (!actionName) return;
  const action = getAction(actionName, position);
  action(arr);
  return transformArray(arr);
}

function getAction(actionName, posision) {
  switch (actionName) {
    case '--discard-prev': return getDiscardPrev(posision);
    case '--discard-next': return getDiscardNext(posision);
    case '--double-prev': return getDoublePrev(posision);
    case '--double-next': return getDoubleNext(posision);
  }
}

function cleanResultArray(numberArray) {
  return numberArray.filter((item) => !actions.includes(item));
}

/** actions */
function getDiscardPrev(position) {
  return (arr) => {
    if (position === 0) return;
    const prevPosition = position - 1;
    arr.splice(prevPosition, 2);
  }
}

function getDiscardNext(position) {
  return (arr) => {
    if (position >= arr.length) return;
    arr.splice(position, 2);
  }
}

function getDoublePrev(position) {
  return (arr) => {
    if (position === 0) return;
    const prevPosition = position - 1;
    const doubleNumber = arr[prevPosition];
    arr.splice(position, 1, doubleNumber);
  }
}

function getDoubleNext(position) {
  return (arr) => {
    if (position >= arr.length) return;
    const nextPosition = position + 1;
    const doubleNumber = arr[nextPosition];
    arr.splice(position, 1, doubleNumber);
  }
}
