import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import Button from '~/components/Button';

function BackButton() {
  const navigation = useNavigation();

  function handleOnPress() {
    navigation.goBack();
  }

  return <Button.Icon icon="Back" size={28} onPress={handleOnPress} />;
}

export default React.memo(BackButton);
