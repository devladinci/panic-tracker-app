import AppleHealthKit, {HealthValue} from 'react-native-health';
import {updatePanicAttack} from '~/utils/api';

export function syncPanicAttackBPM(panicAttack: IPanicAttack) {
  if (panicAttack.bpm || !panicAttack.endedAt) {
    return;
  }

  const options = {
    startDate: new Date(panicAttack.startedAt).toISOString(),
    endDate: new Date(panicAttack.endedAt).toISOString(),
  };

  AppleHealthKit.getHeartRateSamples(
    options,
    (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
      // console.log('Error', callbackError);
      // console.log('results', results);

      if (callbackError || results.length === 0) {
        return;
      }

      const bpm = results.map(result => ({
        value: result.value,
        startDate: result.startDate,
        endDate: result.endDate,
      }));

      updatePanicAttack({...panicAttack, bpm});
    },
  );
}
