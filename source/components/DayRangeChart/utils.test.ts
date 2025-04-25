import {getTime} from 'date-fns';
import {generateData, getMostCommonDaytime} from './utils';

describe(generateData.name, () => {
  it('returns all zeros if no PAs', () => {
    const result = generateData([]);

    expect(result).toEqual([0, 0, 0]);
  });

  it('parses the data', () => {
    const firstPA: IPanicAttack = {
      id: '1',
      scale: 1,
      startedAt: getTime(new Date(2021, 9, 10, 10, 10)),
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
      startedAt: getTime(new Date(2021, 9, 10, 14, 10)),
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
      startedAt: getTime(new Date(2021, 9, 15, 21, 10)),
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
      startedAt: getTime(new Date(2021, 9, 12, 17, 10)),
      endedAt: getTime(new Date()),
      physicalSymptoms: null,
      psychologicalSymptoms: null,
      bpm: null,
      location: null,
      additionalNotes: null,
      userUid: '1',
    };

    const result = generateData([firstPA, secondPA, thirdPA, fourthPA]);

    expect(result).toEqual([1, 2, 1]);
  });
});

describe(getMostCommonDaytime.name, () => {
  it('returns morning if most common', () => {
    const result = getMostCommonDaytime([5, 1, 2]);

    expect(result).toEqual('morning');
  });

  it('returns noon if most common', () => {
    const result = getMostCommonDaytime([1, 5, 2]);

    expect(result).toEqual('noon');
  });

  it('returns evening if most common', () => {
    const result = getMostCommonDaytime([1, 1, 2]);

    expect(result).toEqual('evening');
  });
});
