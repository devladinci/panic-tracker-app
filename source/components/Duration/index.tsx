import * as React from 'react';
import {ViewStyle} from 'react-native';
import Flex from '~/components/Flex';
import Text from '~/components/Text';

interface IProps {
  style?: ViewStyle;
  interval?: number;
}

function Duration({style, interval}: IProps) {
  if (!interval) {
    return null;
  }

  return (
    <Flex.Row
      style={style}
      align="center"
      flex={1}
      justify="center"
      marginVertical="l">
      {interval < 0 ? (
        <InvalidInterval />
      ) : (
        <MinutesSeconds interval={interval} />
      )}
    </Flex.Row>
  );
}

function InvalidInterval() {
  return (
    <Flex.Column align="center">
      <Text size="xxxl" color="lightGreen" bold={true}>
        N/A
      </Text>
    </Flex.Column>
  );
}

function MinutesSeconds({interval}: {interval: number}) {
  const minutes = Math.floor(interval / 60000);
  const seconds = ((interval % 60000) / 1000).toFixed(0);

  return (
    <>
      <Flex.Column align="center">
        <Text size="xxxl" color="lightGreen" bold={true}>
          {minutes.toString().padStart(2, '0')}
        </Text>
        <Text bold={true} color="grey">
          mins
        </Text>
      </Flex.Column>
      <Flex.Column align="center">
        <Text size="xxxl" color="lightGreen" bold={true}>
          {' '}
          :{' '}
        </Text>
        <Text> </Text>
      </Flex.Column>
      <Flex.Column align="center">
        <Text size="xxxl" color="lightGreen" bold={true}>
          {seconds.toString().padStart(2, '0')}
        </Text>
        <Text bold={true} color="grey">
          sec
        </Text>
      </Flex.Column>
    </>
  );
}

export default React.memo(Duration);
