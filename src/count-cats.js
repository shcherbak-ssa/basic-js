const CustomError = require("../extensions/custom-error");

const CAT_EARS = '^^';

module.exports = function countCats(matrix) {
  const flatMatrix = matrix.flat();
  const cats = flatMatrix.filter((item) => item === CAT_EARS);
  return cats.length;
};
