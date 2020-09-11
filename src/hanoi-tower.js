const CustomError = require("../extensions/custom-error");

module.exports = function calculateHanoi(disksNumber, turnsSpeed) {
  const turns = calculateTurns(disksNumber);
  const seconds = calculateSeconds(turns, turnsSpeed);
  return {turns, seconds};
};

function calculateTurns(disksNumber) {
  return Math.pow(2, disksNumber) - 1;
}
function calculateSeconds(turns, turnsSpeed) {
  return Math.floor(turns / (turnsSpeed / 3600));
} 
