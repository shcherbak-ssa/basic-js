const CustomError = require("../extensions/custom-error");

const MODERN_ACTIVITY= 15; 
const HALF_LIFE_PERIOD= 5730;
const {ceil, log} = Math;

module.exports = function dateSample(sampleActivity) {
  return isInvalidSampleActivity(sampleActivity)
    ? false : ceil(log(MODERN_ACTIVITY/parseFloat(sampleActivity)) / (0.693 / HALF_LIFE_PERIOD))
};

function isInvalidSampleActivity(sampleActivity) {
  return false
      || sampleActivity === undefined
      || typeof sampleActivity !== 'string'
      || isNaN(parseFloat(sampleActivity))
      || parseFloat(sampleActivity) < 1
      || parseFloat(sampleActivity) > MODERN_ACTIVITY
}