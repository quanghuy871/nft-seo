/* abbreviation the number function */

const SI_SYMBOL = ['', 'K', 'M', 'G', 'T', 'P', 'E'];

function onUnitCheck(number) {
  // what tier? (determines SI symbol)
  const tier = Math.log10(Math.abs(number)) / 3 | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return number;

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = Math.pow(10, tier * 3);

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  const newScaled = scaled.toFixed(1) + suffix;
  const zeroScaled = newScaled.toString().split('');

  if (zeroScaled[zeroScaled.length - 2] === '0') {
    return scaled.toFixed(0) + suffix;
  }

  return newScaled;
}

export default onUnitCheck;