/* Check if image is base64 function */

function onCheckBase64(str) {
  if (str.startsWith('data:') || str === '' || str.trim() === '') {
    return str;
  }

  return str + '?size=medium';
}

export default onCheckBase64;