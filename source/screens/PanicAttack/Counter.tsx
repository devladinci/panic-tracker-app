import * as React from 'react';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import {timeFormat} from '~/utils/timeFormatter';

interface IProps {
  panicAttack: IPanicAttack | null;
}
export default function Counter({panicAttack}: IProps) {
  const timeAgo = useTimeAgo(panicAttack?.startedAt);

  if (!timeAgo) {
    return null;
  }

  return (
    <Flex.Column>
      <Text uppercase={true} size="xs" center={true}>
        started
      </Text>
      <Text center={true} size="s" bold={true}>
        {timeAgo}
      </Text>
    </Flex.Column>
  );
}

function useTimeAgo(milliseconds?: number | null) {
  const [difference, setDifference] = React.useState('0s');

  React.useEffect(() => {
    const startDate = new Date(milliseconds ?? 0);

    const interval = setInterval(() => {
      const now = new Date();
      const distance = (now.getTime() - startDate.getTime()) / 1000;

      setDifference(timeFormat(distance, true));
    }, 1000);

    return () => clearInterval(interval);
  }, [milliseconds]);

  return milliseconds ? difference : null;
}
