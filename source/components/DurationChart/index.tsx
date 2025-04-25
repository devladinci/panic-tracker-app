import {meanBy} from 'lodash';
import * as React from 'react';
import Text from '~/components/Text';
import Card from '~/components/Card';
import Duration from '~/components/Duration';
import pluralize from 'pluralize';

interface IProps {
  panicAttacks: IPanicAttack[];
}

function DurationChart({panicAttacks}: IProps) {
  const duration = meanBy(panicAttacks, attack => {
    if (!attack.endedAt) {
      return 0;
    }
    return Math.abs(attack.endedAt - attack.startedAt);
  });

  const opacity = panicAttacks.length === 0 ? 0.2 : 1;

  return (
    <Card marginTop="m">
      <Text bold={true} marginBottom="xs">
        Average Duration
      </Text>
      <Text size="s" color="grey" marginBottom="xs">
        {subtitle(panicAttacks)}
      </Text>
      <Duration style={{opacity}} interval={duration > 0 ? duration : 1} />
    </Card>
  );
}

export default React.memo(DurationChart);

function subtitle(panicAttacks: IPanicAttack[]) {
  if (panicAttacks.length === 0) {
    return 'Not enough data to get the average duration.';
  }

  return `On average from ${panicAttacks.length} ${pluralize(
    'panic attacks',
    panicAttacks.length,
  )} duration is:`;
}
