import * as React from 'react';
import {syncPanicAttackBPM} from '~/utils/bpm';

export default function useSyncBPM(panicAttacks: IPanicAttack[]) {
  React.useEffect(() => {
    panicAttacks.forEach(syncPanicAttackBPM);
  }, [panicAttacks]);
}
