import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import * as React from 'react';
import {forOwn, orderBy} from 'lodash';

export default function usePanicAttacks() {
  const user = auth().currentUser;
  const [exports, setExports] = React.useState<IPanicAttack[]>([]);

  React.useEffect(() => {
    if (!user) {
      return;
    }

    const onValueChange = database()
      .ref('panicAttacks')
      .orderByChild('userUid')
      .equalTo(user.uid)
      .on('value', snapshot => {
        const snapshotExports: IPanicAttack[] = [];

        if (!snapshot) {
          return;
        }

        forOwn(snapshot.val() || {}, (value, key) => {
          snapshotExports.push({...value, id: key});
        });

        setExports(orderBy(snapshotExports, ['startedAt'], ['desc']));
      });

    return () =>
      database()
        .ref('panicAttacks')
        .orderByChild('userUid')
        .equalTo(user.uid)
        .off('value', onValueChange);
  }, [user]);

  return exports;
}
