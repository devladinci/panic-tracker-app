import {getTime} from 'date-fns';
import {generateData} from './utils';

describe(generateData.name, () => {
  it('returns all zeros if no PAs', () => {
    const result = generateData([]);

    expect(result).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  });

  it('parses the data', () => {
    const firstPA: IPanicAttack = {
      id: '1',
      scale: 1,
      startedAt: getTime(new Date()),
      endedAt: getTime(new Date()),
      physicalSymptoms: null,
      psychologicalSymptoms: null,
      bpm: null,
      location: null,
      additionalNotes: null,
      userUid: '1',
    };

    const secondPA: IPanicAttack = {
      id: '2',
      scale: 5,
      startedAt: getTime(new Date()),
      endedAt: getTime(new Date()),
      physicalSymptoms: null,
      psychologicalSymptoms: null,
      bpm: null,
      location: null,
      additionalNotes: null,
      userUid: '1',
    };

    const thirdPA: IPanicAttack = {
      id: '3',
      scale: 7,
      startedAt: getTime(new Date()),
      endedAt: getTime(new Date()),
      physicalSymptoms: null,
      psychologicalSymptoms: null,
      bpm: null,
      location: null,
      additionalNotes: null,
      userUid: '1',
    };

    const fourthPA: IPanicAttack = {
      id: '4',
      scale: 9,
      startedAt: getTime(new Date()),
      endedAt: getTime(new Date()),
      physicalSymptoms: null,
      psychologicalSymptoms: null,
      bpm: null,
      location: null,
      additionalNotes: null,
      userUid: '1',
    };

    const result = generateData([firstPA, secondPA, thirdPA, fourthPA]);

    expect(result).toEqual([1, 0, 0, 0, 1, 0, 1, 0, 1, 0]);
  });
});
