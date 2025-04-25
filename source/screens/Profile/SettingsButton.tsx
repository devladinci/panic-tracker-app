import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import Button from '~/components/Button';

function SettingsButton() {
  const navigation = useNavigation();

  function handleOnPress() {
    navigation.navigate('Settings' as never);
  }

  return <Button.Icon icon="Settings" size={28} onPress={handleOnPress} />;
}

export default React.memo(SettingsButton);
