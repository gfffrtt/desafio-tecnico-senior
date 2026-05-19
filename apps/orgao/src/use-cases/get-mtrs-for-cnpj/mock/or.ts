export const or = <T>(value: T, orValue: T, probability: number): T => {
  if (Math.random() < probability) {
    return orValue;
  }
  return value;
};
