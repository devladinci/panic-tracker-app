import * as React from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {useColor} from '~/styles/theme';
import variables from '~/styles/variables';
import Button from '~/components/Button';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import {differenceBy} from 'lodash';
import Separator from '~/components/Separator';
import KeyboardSpacer from 'react-native-keyboard-spacer';

interface IProps {
  title: string;
  visible: boolean;
  close: () => void;
  suggestions: string[];
  symptomsDidChange: (symptoms: string[]) => void;
  defaultValues?: string[] | null;
}

export default function SymptomsModal({
  title,
  visible,
  close,
  suggestions,
  symptomsDidChange,
  defaultValues,
}: IProps) {
  const [symptoms, setSymptoms] = React.useState<string[]>(defaultValues || []);

  function handleOnAdd(symptom: string) {
    if (symptoms.indexOf(symptom) !== -1) {
      return;
    }

    setSymptoms([...symptoms, symptom]);
    symptomsDidChange([...symptoms, symptom]);
  }

  function handleOnRemove(symptom: string) {
    const tmpSymptoms = symptoms.filter(s => s !== symptom);
    setSymptoms(tmpSymptoms);
    symptomsDidChange(tmpSymptoms);
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{marginHorizontal: variables.spacing.m}}>
        <Flex.Row align="center" justify="space-between" marginVertical="m">
          <Text bold={true}>{title}</Text>
          <Button.Icon icon="Close" size={24} onPress={close} />
        </Flex.Row>

        <Flex.Row wrap="wrap" marginBottom="m">
          {symptoms.length === 0 && (
            <Text color="grey">Nothig selected yet.</Text>
          )}
          {symptoms.map(symptom => (
            <Symptom key={symptom} symptom={symptom} onPress={handleOnRemove} />
          ))}
        </Flex.Row>

        <Input onAdd={handleOnAdd} />

        <Separator />

        <Text bold={true} size="s" uppercase={true} marginBottom="xs">
          Common symptoms:
        </Text>
        <Text color="grey" uppercase={true} size="xs" marginBottom="m">
          Tap to add symptoms
        </Text>
        <Flex.Row wrap="wrap">
          {differenceBy(suggestions, symptoms).map(suggestion => (
            <Symptom
              key={suggestion}
              symptom={suggestion}
              onPress={handleOnAdd}
            />
          ))}
        </Flex.Row>
      </ScrollView>
      <KeyboardSpacer />
    </Modal>
  );
}

interface ISymptomProps {
  symptom: string;
  onPress: (symptom: string) => void;
}

function Symptom({symptom, onPress}: ISymptomProps) {
  const backgroundColor = useColor('lightGreen');
  return (
    <Pressable
      style={[styles.symptom, {backgroundColor}]}
      onPress={() => onPress(symptom)}>
      <Text size="xs" uppercase={true} bold={true} color="white">
        {symptom}
      </Text>
    </Pressable>
  );
}

function Input({onAdd}: {onAdd: (tag: string) => void}) {
  const [text, setText] = React.useState<string>('');

  return (
    <Flex.Row flex={1} marginTop="l" paddingTop="s">
      <TextInput
        style={styles.textInput}
        focusable={true}
        placeholder="Add symptom"
        value={text}
        onChangeText={setText}
      />
      <Button.Solid
        color="black"
        textColor="white"
        label="Add"
        onPress={() => {
          onAdd(text);
          setText('');
        }}
        disabled={text.length === 0}
      />
    </Flex.Row>
  );
}

const styles = StyleSheet.create({
  symptom: {
    paddingHorizontal: variables.spacing.m,
    paddingVertical: variables.spacing.s,
    borderRadius: variables.buttonRadius,
    marginRight: variables.spacing.s,
    marginBottom: variables.spacing.s,
    display: 'flex',
    flexDirection: 'row',
  },
  textInput: {
    display: 'flex',
    flex: 1,
    marginRight: variables.spacing.m,
    paddingHorizontal: variables.spacing.m,
    borderRadius: variables.buttonRadius,
  },
});
