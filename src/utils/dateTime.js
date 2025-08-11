const TZ = 'Europe/Kyiv';

export function getNowDateTime(locale = 'uk-UA') {
  const now = new Date();
  const date = now.toLocaleDateString(locale, { timeZone: TZ, year: 'numeric', month: 'long', day: 'numeric' });
  const time = now.toLocaleTimeString(locale, { timeZone: TZ, hour: '2-digit', minute: '2-digit' });
  return { date, time, tz: TZ };
}

export function getCurrentDateTimeForPrompt(locale = 'uk-UA') {
  const { date, time, tz } = getNowDateTime(locale);
  return `CURRENT DATE/TIME: ${date}, ${time} (${tz}). If the user asks about date/time, answer using this value.`;
}

export function isDateOrTimeQuestion(text) {
  if (!text || typeof text !== 'string') return false;
  const t = text.trim().toLowerCase();
  const patterns = [
    /яка\s+сьогодні\s+дата|сьогоднішн(є|я)\s+(число|дата)/i,
    /(яка|яке|який)\s+(дата|число)\b/i,
    /(котра|яка)\s+година|скільки\s+зараз\s+часу/i,
    /what\s+is\s+the\s+date|today'?s\s+date|current\s+date/i,
    /what\s+time\s+is\s+it|current\s+time/i,
  ];
  return patterns.some((re) => re.test(t));
}

export function formatDateTimeReply(locale = 'uk-UA') {
  const { date, time } = getNowDateTime(locale);
  return `Сьогодні ${date}. Зараз ${time}.`;
}

