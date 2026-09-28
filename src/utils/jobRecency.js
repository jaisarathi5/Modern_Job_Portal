/**
 * Recency helper.
 * Seed jobs store a human label ("Just now", "3 days ago") instead of a real
 * timestamp, so sorting by "Most Recent" needs to translate that label into a
 * comparable number of days. Smaller number = more recent.
 */
export function parsePostedDaysAgo(postedDate = '') {
  const text = String(postedDate).toLowerCase();

  if (text.includes('just now') || text.includes('today')) return 0;

  const dayMatch = text.match(/(\d+)\s*day/);
  if (dayMatch) return Number(dayMatch[1]);

  const weekMatch = text.match(/(\d+)\s*week/);
  if (weekMatch) return Number(weekMatch[1]) * 7;

  const monthMatch = text.match(/(\d+)\s*month/);
  if (monthMatch) return Number(monthMatch[1]) * 30;

  const yearMatch = text.match(/(\d+)\s*year/);
  if (yearMatch) return Number(yearMatch[1]) * 365;

  // Unknown labels fall to the bottom instead of jumping to the top.
  return Number.MAX_SAFE_INTEGER;
}
