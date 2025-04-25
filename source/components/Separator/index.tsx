import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {useColor} from '~/styles/theme';
import variables from '~/styles/variables';

function Separator() {
  const backgroundColor = useColor('lightGrey');
  return <View style={[styles.separator, {backgroundColor}]} />;
}

export default React.memo(Separator);

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: StyleSheet.hairlineWidth,
    marginVertical: variables.spacing.m,
  },
});
