import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import Button from '~/components/Button';

export default function CloseButton() {
  const navigation = useNavigation();

  function handlePress() {
    navigation.goBack();
  }

  return (
    <Button.Icon icon="Close" size={28} color="black" onPress={handlePress} />
  );
}
