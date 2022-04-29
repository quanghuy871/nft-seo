let SI_SYMBOL = ['', 'K', 'M', 'G', 'T', 'P', 'E'];

export function onUnitCheck(number) {
  // what tier? (determines SI symbol)
  let tier = Math.log10(Math.abs(number)) / 3 | 0;

  // if zero, we don't need a suffix
  if (tier == 0) return number;

  // get suffix and determine scale
  let suffix = SI_SYMBOL[tier];
  let scale = Math.pow(10, tier * 3);

  // scale the number
  let scaled = number / scale;

  // format number and add suffix
  let newScaled = scaled.toFixed(1) + suffix;
  let zeroScaled = newScaled.toString().split('');

  if (zeroScaled[zeroScaled.length - 2] === '0') {
    return scaled.toFixed(0) + suffix;
  }

  return newScaled;
}