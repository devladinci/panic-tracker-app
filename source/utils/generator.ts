import getTime from 'date-fns/getTime';
import {Omit} from 'utility-types';

export function newPanicAttack(user: {uid: string}): Omit<IPanicAttack, 'id'> {
  return {
    startedAt: getTime(new Date()),
    endedAt: null,
    scale: null,
    physicalSymptoms: null,
    psychologicalSymptoms: null,
    bpm: null,
    location: null,
    additionalNotes: null,
    userUid: user.uid,
  };
}
