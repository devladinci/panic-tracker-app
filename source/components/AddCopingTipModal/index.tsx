import * as React from 'react';
import {
  Keyboard,
  Modal,
  StyleSheet,
  TextInput,
  useColorScheme,
} from 'react-native';
import Button from '~/components/Button';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import {useColor} from '~/styles/theme';
import variables from '~/styles/variables';
import auth from '@react-native-firebase/auth';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {debounce} from 'lodash';
import {createCopingTip} from '~/utils/api';

interface IProps {
  visible: boolean;
  onDismiss: () => void;
}

export default function AddCopingSuggestionModal({visible, onDismiss}: IProps) {
  const backgroundColor = useColor('white');
  const [tip, setTip] = React.useState('');

  function onAddPress() {
    Keyboard.dismiss();
    createCopingTip(tip);
    setTimeout(onDismiss, 300);
  }

  function onCancelPress() {
    Keyboard.dismiss();
    setTimeout(onDismiss, 300);
  }

  return (
    <Modal visible={visible} transparent={true} animationType="fade">
      <Flex style={styles.background} flex={1} justify="center" align="center">
        <Flex.Column
          justify="center"
          padding="m"
          style={[
            styles.container,
            {
              backgroundColor: backgroundColor,
              borderRadius: variables.radius,
            },
          ]}>
          <Text bold={true} center={true} size="l">
            Add a coping tip
          </Text>
          <Text color="grey" center={true} marginVertical="s" size="s">
            Share with the community ways to cope with the panic attacks. What
            helps you to get through?
          </Text>

          <UsernameInput />
          <CopingTip onTextChange={setTip} />

          <Flex.Row justify="space-between">
            <Button.Solid label="Cancel" onPress={onCancelPress} />
            <Button.Solid
              color="black"
              textColor="white"
              label="Add"
              onPress={onAddPress}
              disabled={tip.length === 0}
            />
          </Flex.Row>
        </Flex.Column>
        <KeyboardSpacer />
      </Flex>
    </Modal>
  );
}

function UsernameInput() {
  const backgroundColor = useColor('white');
  const isDark = useColorScheme() === 'dark';
  const border = isDark ? variables.borderDark : variables.borderLight;
  const currentUser = auth().currentUser;

  if (currentUser?.displayName) {
    return null;
  }

  const onChangeText = debounce(text => {
    if (text.length === 0) {
      return;
    }

    currentUser?.updateProfile({
      displayName: text,
    });
  }, 1000);

  return (
    <Flex.Column marginBottom="l">
      <Text
        color="grey"
        uppercase={true}
        bold={true}
        size="xs"
        marginBottom="s">
        Username
      </Text>
      <TextInput
        style={[styles.input, {backgroundColor, ...border}]}
        placeholder="Add username"
        defaultValue={currentUser?.displayName || undefined}
        onChangeText={onChangeText}
      />
    </Flex.Column>
  );
}

function CopingTip({onTextChange}: {onTextChange: (text: string) => void}) {
  const backgroundColor = useColor('white');
  const isDark = useColorScheme() === 'dark';
  const border = isDark ? variables.borderDark : variables.borderLight;

  const handleChangeText = debounce(text => onTextChange(text), 300);

  return (
    <Flex.Column marginBottom="l">
      <Text
        color="grey"
        uppercase={true}
        bold={true}
        size="xs"
        marginBottom="s">
        Coping Tip:
      </Text>
      <TextInput
        style={[styles.textInput, {backgroundColor, ...border}]}
        focusable={false}
        multiline={true}
        placeholder="What is your best tip?"
        onChangeText={handleChangeText}
      />
    </Flex.Column>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  container: {
    width: '90%',
    minHeight: 300,
  },
  input: {
    height: 40,
    paddingHorizontal: variables.spacing.s,
    borderRadius: variables.radius,
  },
  textInput: {
    width: '100%',
    minHeight: 100,
    padding: variables.spacing.s,
    borderRadius: variables.radius,
  },
});
