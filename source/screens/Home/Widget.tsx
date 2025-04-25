import * as React from 'react';
import {StyleSheet, Pressable} from 'react-native';
import BPMChart from '~/components/BPMChart';
import Button from '~/components/Button';
import DayRangeChart from '~/components/DayRangeChart';
import DurationChart from '~/components/DurationChart';
import Flex from '~/components/Flex';
import ScaleChart from '~/components/ScaleChart';
import routes, {useNavigate} from '~/routes';

interface IProps {
  panicAttacks: IPanicAttack[];
}

function HomeWidget({panicAttacks}: IProps) {
  const navigate = useNavigate();

  function handleOnPress() {
    const path = routes.insights();
    navigate(path);
  }

  const Widget = getWidget(panicAttacks);

  return (
    <Flex.Column paddingHorizontal="m">
      <Pressable
        style={{width: '100%', display: 'flex', flexDirection: 'row'}}
        onPress={handleOnPress}>
        <Widget panicAttacks={panicAttacks} />
      </Pressable>
      <Flex.Row justify="center">
        <Button.Solid
          style={styles.button}
          marginTop="l"
          label="More Insights"
          onPress={handleOnPress}
        />
      </Flex.Row>
    </Flex.Column>
  );
}

export default React.memo(HomeWidget);

const styles = StyleSheet.create({button: {width: '45%'}});

function getWidget(panicAttacks: IPanicAttack[]) {
  if (
    panicAttacks.length > 0 &&
    panicAttacks[0].bpm &&
    panicAttacks[0].bpm.length > 5
  ) {
    return BPMChart;
  }

  if (panicAttacks.length > 5) {
    const possibles = [DayRangeChart, DurationChart];
    return possibles[Math.floor(Math.random() * possibles.length)];
  }

  return ScaleChart;
}
