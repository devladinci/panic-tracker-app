import * as React from 'react';
import Text from '~/components/Text';
import pluralize from 'pluralize';
import {useCountOnline} from '~/hooks/useOnline';

function OnlineUsers() {
  const onlineCount = useCountOnline();

  return (
    <Text size="m" bold={true} center={true}>
      Calm down, take a deep breath. {onlineCount} other{' '}
      {pluralize('person', onlineCount)} is experiencing similar symptoms at
      this moment.
    </Text>
  );
}

export default React.memo(OnlineUsers);
