import * as React from 'react';
import {Pressable} from 'react-native';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import {useColor} from '~/styles/theme';
import {readableDate} from '~/utils/date';
import DurationPicker from '~/components/DurationPicker';

interface IProps {
  panicAttacks: IPanicAttack[];
}

function ClosePanicAttack({panicAttacks}: IProps) {
  const backgroundColor = useColor('lightOrange');
  const [visible, setVisible] = React.useState(false);

  const openedPanicAttack = panicAttacks.find(attack => !attack.endedAt);

  if (!openedPanicAttack) {
    return null;
  }

  return (
    <>
      <Pressable onPress={() => setVisible(true)}>
        <Flex.Column
          style={{backgroundColor}}
          justify="center"
          align="center"
          paddingVertical="s"
          marginBottom="s">
          <Text bold={true} withTheme={false}>
            You have ongoing panic attack since{' '}
            {readableDate(openedPanicAttack.startedAt)}.
          </Text>
          <Text withTheme={false}>Tap to pick duration and close it</Text>
        </Flex.Column>
      </Pressable>
      <DurationPicker
        visible={visible}
        onDismiss={() => setVisible(false)}
        panicAttack={openedPanicAttack}
      />
    </>
  );
}

export default React.memo(ClosePanicAttack);
