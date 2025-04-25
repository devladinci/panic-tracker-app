import debounce from 'lodash/debounce';
import * as React from 'react';
import {StyleSheet, TextInput, useColorScheme} from 'react-native';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import {useColor} from '~/styles/theme';
import variables from '~/styles/variables';

interface IProps {
  onAdd: (note: string) => void;
  value?: string | undefined | null;
}

export default function AdditionalNote({onAdd, value}: IProps) {
  /* eslint-disable react-hooks/exhaustive-deps */
  const onChangeText = React.useCallback(debounce(onAdd, 1000), []);
  /* eslint-enable react-hooks/exhaustive-deps */
  const backgroundColor = useColor('white');
  const isDark = useColorScheme() === 'dark';
  const border = isDark ? variables.borderDark : variables.borderLight;

  return (
    <Flex.Column marginTop="m" flex={1}>
      <Text bold={true} marginBottom="m">
        Notes:
      </Text>
      <TextInput
        style={[styles.textInput, {backgroundColor, ...border}]}
        focusable={true}
        multiline={true}
        placeholder="Add additional notes"
        onChangeText={onChangeText}
        value={value as any}
      />
    </Flex.Column>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    minHeight: 100,
    paddingHorizontal: variables.spacing.s,
    borderRadius: variables.radius,
  },
});
