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

export function parseUserPreferenceCommand(text) {
  if (!text || typeof text !== 'string') return null;
  const t = text.trim().toLowerCase();

  const nameMatch = text.match(/(?:називай мене|звертайся до мене як|call me)\s+([^.!?]+)/i);
  if (nameMatch && nameMatch[1]) {
    const name = nameMatch[1].trim().replace(/["'`]/g, '');
    if (name) return { type: 'name', value: name };
  }

  if (/(жіночому|жіночий|female|she|her)/i.test(t)) {
    return { type: 'gender', value: 'feminine' };
  }
  if (/(чоловічому|чоловічий|male|he|him)/i.test(t)) {
    return { type: 'gender', value: 'masculine' };
  }
  if (/(нейтр(альн)|без\s*гендеру|neutral|they|them)/i.test(t)) {
    return { type: 'gender', value: 'neutral' };
  }

  return null;
}
