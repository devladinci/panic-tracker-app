export function nextPanicAttack(
  all: IPanicAttack[],
  current?: IPanicAttack | null,
) {
  if (!current) {
    return null;
  }

  const index = all.indexOf(current);

  if (index === -1 && all.length === 0) {
    return null;
  }

  if (index + 1 > all.length) {
    return all[0];
  }

  return all[index + 1];
}

export function previousPanicAttack(
  all: IPanicAttack[],
  current?: IPanicAttack | null,
) {
  if (!current) {
    return null;
  }

  const index = all.indexOf(current);

  if (index === -1 && all.length === 0) {
    return null;
  }

  if (index === 0) {
    return all[0];
  }

  return all[index - 1];
}
