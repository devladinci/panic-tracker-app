import * as React from 'react';
import {StyleSheet} from 'react-native';
import Button from '~/components/Button';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import routes, {useNavigate} from '~/routes';

interface IProps {
  panicAttacks: IPanicAttack[];
}

function Past30Days({panicAttacks}: IProps) {
  const navigate = useNavigate();

  function handleOnClick() {
    navigate(routes.preview(panicAttacks[0]));
  }

  return (
    <Flex.Column align="center" marginBottom="xl">
      <Text size="l" bold={true} center={true}>
        Past 30 Days
      </Text>
      <Text size="xxxl" color="lightGreen" bold={true} center={true}>
        {panicAttacks.length > 0 ? panicAttacks.length : 'NO'}
      </Text>
      <Text size="l" bold={true} center={true}>
        Panic Attacks
      </Text>

      {panicAttacks.length > 0 && (
        <Button.Solid
          style={styles.button}
          label="View Last"
          onPress={handleOnClick}
          marginTop="l"
        />
      )}
    </Flex.Column>
  );
}

export default React.memo(Past30Days);

const styles = StyleSheet.create({
  button: {
    width: '45%',
  },
});
