import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import Button from '~/components/Button';

interface IProps {
  panicAttack?: IPanicAttack | null;
  disabled?: boolean;
}

export default function EditButton({panicAttack, disabled}: IProps) {
  const navigation = useNavigation();

  function handleOnPress() {
    if (!panicAttack) {
      return;
    }

    navigation.navigate('Edit' as never, {id: panicAttack.id} as never);
  }

  return (
    <Button.Icon
      icon="Edit"
      size={25}
      marginRight="m"
      onPress={handleOnPress}
      disabled={disabled}
    />
  );
}
