import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AreaChart, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import {useColor} from '~/styles/theme';
import Flex from '~/components/Flex';
import Text from '~/components/Text';

interface IProps {
  panicAttack: IPanicAttack;
}

function BPMChart({panicAttack}: IProps) {
  const data = getMostRecentBPMData(panicAttack);
  const stroke = useColor('lightGreen');
  const axisFill = useColor('grey');

  const contentInset = {top: 20, bottom: 20};

  const hasData = Math.max(...data) > 0;

  return (
    <Flex.Column>
      <View style={styles.wrapper}>
        {!hasData && (
          <View style={[StyleSheet.absoluteFill, styles.emptyState]}>
            <Text
              style={styles.emptyStateText}
              size="xxl"
              color="grey"
              uppercase={true}>
              No data
            </Text>
          </View>
        )}
        <YAxis
          style={styles.xAxis}
          data={data}
          contentInset={contentInset}
          svg={{
            fill: axisFill,
            fontSize: 11,
          }}
          numberOfTicks={3}
          formatLabel={value => `${value}`}
        />
        <AreaChart
          animate={true}
          animationDuration={500}
          style={styles.areaChart}
          data={data}
          contentInset={contentInset}
          curve={shape.curveCardinal}
          svg={{
            fill: 'rgba(190,245,222, 0.2)',
            stroke,
            strokeWidth: 1,
          }}
        />
      </View>
      <Text center={true} color="grey" size="s" marginTop="m">
        {sensableTitle(data)}
      </Text>
    </Flex.Column>
  );
}

export default React.memo(BPMChart);

const styles = StyleSheet.create({
  wrapper: {height: 180, flexDirection: 'row'},
  emptyState: {display: 'flex', justifyContent: 'center', alignItems: 'center'},
  emptyStateText: {opacity: 0.2},
  xAxis: {position: 'absolute', left: 0, top: 0, bottom: 0},
  areaChart: {height: 180, flex: 1},
});

function sensableTitle(data: number[]) {
  if (Math.max(...data) === 0) {
    return 'Not enough BPM Data.';
  }

  return `BPM ranged between ${Math.min(...data)} and ${Math.max(...data)}`;
}

function getMostRecentBPMData(panicAttack: IPanicAttack) {
  if (!panicAttack.bpm) {
    return [0, 0, 0, 0, 0];
  }

  const data = panicAttack.bpm.map(bpm => bpm.value);

  if (data.length <= 2) {
    return [...data, 0, 0, 0, 0];
  }

  return data;
}
