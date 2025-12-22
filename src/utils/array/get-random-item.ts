export function getRandomItem<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error('Cannot get a random item from an empty array');
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
