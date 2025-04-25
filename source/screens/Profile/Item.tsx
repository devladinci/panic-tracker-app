import * as React from 'react';
import Text from '~/components/Text';
import Card from '~/components/Card';
import {formatDate, formatTime} from '~/utils/date';
import {Pressable} from 'react-native';
import routes, {useNavigate} from '~/routes';
import Flex from '~/components/Flex';
import Duration from '~/components/Duration';

interface IProps {
  panicAttack: IPanicAttack;
}

function Item({panicAttack}: IProps) {
  const navigate = useNavigate();

  function handleOnPress() {
    const path = routes.preview(panicAttack);
    navigate(path);
  }

  return (
    <Pressable onPress={handleOnPress}>
      <Card.Column marginBottom="m">
        <Text center={true}>{formatDate(panicAttack.startedAt)}</Text>
        <Text center={true}>{formatTime(panicAttack.startedAt)}</Text>

        <Flex.Row height={140} justify="space-evenly" marginTop="l">
          <Flex.Column flex={1} justify="center" align="center">
            <Text bold={true} color="black" size="xl">
              Duration
            </Text>
            <Duration
              interval={(panicAttack?.endedAt || 0) - panicAttack.startedAt}
            />
          </Flex.Column>
          <Flex.Column flex={1} justify="flex-start" align="center">
            <Text bold={true} color="black" size="xl">
              Intensity
            </Text>
            <Text size="xxxl" bold={true} color="lightGreen" marginVertical="l">
              {panicAttack.scale || 'N/A'}
            </Text>
          </Flex.Column>
        </Flex.Row>

        <Text bold={true} size="l" center={true} color="grey">
          Tap to see more
        </Text>
      </Card.Column>
    </Pressable>
  );
}

export default React.memo(Item);
