/**
 * Formats Roman numerals for Star Wars film episodes
 */
export function toRomanNumeral(num: number): string {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let result = '';
  let n = num;
  for (const [val, roman] of map) {
    while (n >= val) {
      result += roman;
      n -= val;
    }
  }
  return result || `${num}`;
}

/**
 * Format population or numeric strings with commas
 */
export function formatNumberWithCommas(val?: string | number): string {
  if (!val || val === 'unknown') return 'Unknown';
  const num = Number(val);
  if (isNaN(num)) return String(val);
  return num.toLocaleString('en-US');
}

/**
 * Format credits with Star Wars currency label
 */
export function formatCredits(val?: string | number): string {
  if (!val || val === 'unknown') return 'Unknown Cost';
  const num = Number(val);
  if (isNaN(num)) return `${val} Credits`;
  return `${num.toLocaleString('en-US')} Credits`;
}

/**
 * Capitalizes string nicely
 */
export function capitalize(str?: string): string {
  if (!str) return 'Unknown';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
