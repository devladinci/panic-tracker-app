import * as React from 'react';
import {Modal, StyleSheet, useColorScheme} from 'react-native';
import Button from '~/components/Button';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import {useColor} from '~/styles/theme';
import DateTimePicker from '@react-native-community/datetimepicker';
import variables from '~/styles/variables';
import {updatePanicAttack} from '~/utils/api';

interface IProps {
  visible: boolean;
  onDismiss: () => void;
  panicAttack?: IPanicAttack | null;
}

export default function StartedAtPicker({
  visible,
  onDismiss,
  panicAttack,
}: IProps) {
  const isDark = useColorScheme() === 'dark';
  const backgroundColor = useColor('white');
  const [selectedTimeStamp, setSelectedTimeStamp] = React.useState<
    number | null
  >(panicAttack?.startedAt || null);

  if (!panicAttack) {
    return null;
  }

  function handleOnDismiss() {
    const newPanicAttack = {
      ...panicAttack,
      startedAt: selectedTimeStamp,
    };

    updatePanicAttack(newPanicAttack);

    onDismiss();
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
          <Text bold={true} center={true}>
            When the panic attack started?
          </Text>
          <Text size="xs" color="grey" center={true}>
            estimated
          </Text>
          <DateTimePicker
            style={styles.datePicker}
            value={new Date(selectedTimeStamp!)}
            mode={'datetime' as any}
            is24Hour={true}
            display="spinner"
            onChange={(event: any): any => {
              const timestamp = event.nativeEvent.timestamp;
              setSelectedTimeStamp(timestamp);
            }}
            themeVariant={isDark ? 'dark' : 'light'}
          />
          <Button.Gradient label="Done" onPress={handleOnDismiss} />
        </Flex.Column>
      </Flex>
    </Modal>
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
  datePicker: {height: 200},
});
