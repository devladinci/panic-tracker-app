import * as React from 'react';
import auth from '@react-native-firebase/auth';
import {AppState, AppStateStatus} from 'react-native';
import database from '@react-native-firebase/database';

export default function useOnline() {
  const currentUser = auth().currentUser;

  React.useEffect(() => {
    if (!currentUser) {
      return;
    }

    database().ref(`/online/${currentUser.uid}`).set(true);

    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (!currentUser) {
        return;
      }

      if (nextAppState === 'active') {
        const reference = database().ref(`/online/${currentUser.uid}`);
        reference.set(true);
      }

      if (nextAppState === 'inactive' || nextAppState === 'background') {
        database().ref(`/online/${currentUser.uid}`).remove();
      }
    }

    const appState = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      database().ref(`/online/${currentUser.uid}`).onDisconnect().remove();
      appState?.remove();
    };
  }, [currentUser]);
}

export function useCountOnline() {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const onValueChange = database()
      .ref('/online')
      .on('value', snapshot => setCount(snapshot.numChildren()));

    return () => database().ref('/online').off('value', onValueChange);
  }, []);

  return count;
}
