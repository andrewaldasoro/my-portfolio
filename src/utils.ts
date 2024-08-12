export function padZero(c: string) {
  if (c.length !== 2) {
    return c.padStart(2, '0');
  }
  return c;
}
