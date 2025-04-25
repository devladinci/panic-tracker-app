export function generateData(panicAttacks: IPanicAttack[]) {
  const input = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  if (panicAttacks.length === 0) {
    return input;
  }

  return panicAttacks.reduce((acc, attack) => {
    if (!attack.scale) {
      return acc;
    }
    const index = attack.scale - 1;

    const currentCount = acc[index];

    acc[index] = currentCount + 1;

    return acc;
  }, input);
}
