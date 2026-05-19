export const orNull = <T>(value: T | null, probability: number): T | null => {
  if (Math.random() < probability) {
    return null;
  }
  return value;
};
