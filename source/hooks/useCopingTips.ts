import database from '@react-native-firebase/database';
import * as React from 'react';
import {forOwn, orderBy} from 'lodash';

export default function useCopingTips() {
  const [exports, setExports] = React.useState<ICopingTip[]>([]);

  React.useEffect(() => {
    const onValueChange = database()
      .ref('copingTips')
      .on('value', snapshot => {
        const snapshotExports: ICopingTip[] = [];

        if (!snapshot) {
          return;
        }

        forOwn(snapshot.val() || {}, (value, key) => {
          snapshotExports.push({...value, id: key});
        });

        setExports(orderBy(snapshotExports, ['createdAt'], ['desc']));
      });

    return () => database().ref('copingTips').off('value', onValueChange);
  }, []);

  return exports;
}
