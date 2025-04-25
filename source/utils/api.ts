import database from '@react-native-firebase/database';
import {newPanicAttack} from './generator';
import auth from '@react-native-firebase/auth';
import {Omit} from 'utility-types';
import getTime from 'date-fns/getTime';
import {omit} from 'lodash';

export function createPanicAttack() {
  const currentUser = auth().currentUser;

  if (!currentUser) {
    return null;
  }

  const newReference = database().ref('/panicAttacks').push();

  const attack = newPanicAttack(currentUser);

  newReference.set(attack);

  return {...attack, id: newReference.key} as IPanicAttack;
}

export function updatePanicAttack(panicAttack: any) {
  database()
    .ref(`/panicAttacks/${panicAttack.id}`)
    .update(omit(panicAttack, ['id']));
}

export function deletePanicAttack(
  panicAttack: IPanicAttack,
  callback?: () => void,
) {
  database().ref(`/panicAttacks/${panicAttack.id}`).remove().then(callback);
}

export function createCopingTip(tip: string) {
  const currentUser = auth().currentUser;

  if (!currentUser) {
    return null;
  }

  if (tip.length === 0) {
    return null;
  }

  const newReference = database().ref('/copingTips').push();

  const model: Omit<ICopingTip, 'id'> = {
    tip,
    createdAt: getTime(new Date()),
    upvotes: [],
    userUid: currentUser.uid,
    username: currentUser.displayName || 'Unknown',
  };

  newReference.set(model);

  return {...model, id: newReference.key} as ICopingTip;
}

export function toggleTip(tip: ICopingTip) {
  const currentUser = auth().currentUser;

  if (!currentUser) {
    return;
  }

  const hasVoted = (tip.upvotes || []).includes(currentUser.uid);

  let tipToUpdate = omit(tip, ['id']);

  if (hasVoted) {
    const upvotes = tipToUpdate.upvotes.filter(
      vote => vote !== currentUser.uid,
    );
    tipToUpdate.upvotes = upvotes;
  } else {
    const upvotes = [...(tipToUpdate.upvotes || []), currentUser.uid];
    tipToUpdate.upvotes = upvotes;
  }

  database().ref(`/copingTips/${tip.id}`).update(tipToUpdate);
}

export function deleteCopingTip(tip: ICopingTip, callback?: () => void) {
  database().ref(`/copingTips/${tip.id}`).remove().then(callback);
}
