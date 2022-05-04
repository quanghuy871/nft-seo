/* Substring function */

function onSubString(str) {
  str = String(str);

  if (str.length > 15 && str.split(' ').length === 1) {
    return str.substr(0, 10) + '...';
  }

  return str;
}

export default onSubString;