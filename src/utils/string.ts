export function capitalize(str: string): string {
  if (typeof str !== 'string' || str.length === 0) {
    return '';
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}
