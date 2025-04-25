import database from '@react-native-firebase/database';
import * as React from 'react';

export default function usePanicAttack(id?: string | null) {
  const [panicAttack, setPanicAttack] = React.useState<IPanicAttack | null>(
    null,
  );

  React.useEffect(() => {
    if (!id) {
      return;
    }

    const ref = database().ref(`panicAttacks/${id}`);

    ref.on('value', (snapshot: any) => {
      if (!snapshot) {
        return;
      }

      setPanicAttack({...snapshot.val(), id});
    });

    return () => {
      ref.off();
    };
  }, [id]);

  return panicAttack;
}
