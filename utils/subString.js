export function subString(str) {
  str = String(str);

  if (str.length > 15 && str.split(' ').length === 1) {
    return str.substr(0, 14) + ' ...';
  }

  if (str.length <= 22) {
    return str;
  }

  return str.substr(0, 19) + '...';
}