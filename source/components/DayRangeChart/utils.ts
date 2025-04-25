import {getHours} from 'date-fns';

export function generateData(panicAttacks: IPanicAttack[]) {
  const input = [0, 0, 0];

  if (panicAttacks.length === 0) {
    return input;
  }

  return panicAttacks.reduce((acc, attack) => {
    const date = new Date(attack.startedAt);

    const hour = getHours(date);

    let index = 2;

    if (hour < 12) {
      index = 0;
    } else if (hour > 12 && hour < 18) {
      index = 1;
    }

    const count = input[index];

    input[index] = count + 1;

    return acc;
  }, input);
}

export function getMostCommonDaytime(data: number[]) {
  const number = Math.max(...data);

  const index = data.indexOf(number);

  if (index === 0) {
    return 'morning';
  }

  if (index === 1) {
    return 'noon';
  }

  return 'evening';
}
