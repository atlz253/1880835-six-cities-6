export function tryStringify(value: unknown) {
  try {
    return JSON.stringify(value);
  } catch {
    return undefined;
  }
}
