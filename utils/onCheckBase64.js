export default function onCheckBase64(str) {
  if (str.startsWith('data:') || str === '' || str.trim() === '') {
    return str;
  }

  return str + '?size=medium';
}