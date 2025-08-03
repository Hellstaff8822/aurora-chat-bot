export const truncateText = (text, maxLength = 30) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

export const createShortDescription = (text, maxLength = 25) => {
  if (text.length <= maxLength) {
    return text;
  }
  
  const words = text.split(' ');
  let result = '';
  
  for (let word of words) {
    if ((result + ' ' + word).length <= maxLength) {
      result += (result ? ' ' : '') + word;
    } else {
      break;
    }
  }
  
  return result + (result.length < text.length ? '...' : '');
}; 