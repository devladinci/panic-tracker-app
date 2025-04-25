import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {AreaChart, YAxis} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import Text from '~/components/Text';
import Card from '~/components/Card';
import {useColor} from '~/styles/theme';
import {readableDate} from '~/utils/date';

interface IProps {
  panicAttacks: IPanicAttack[];
  graphOnly?: boolean;
}

function BPMChart({panicAttacks, graphOnly = false}: IProps) {
  const data = getMostRecentBPMData(panicAttacks);
  const stroke = useColor('lightGreen');
  const axisFill = useColor('grey');

  if (!data) {
    return null;
  }

  const contentInset = {top: 20, bottom: 20};

  return (
    <Card marginTop="m">
      {!graphOnly && (
        <>
          <Text bold={true} marginBottom="xs">
            {title(panicAttacks)}
          </Text>
          <Text size="s" color="grey" marginBottom="xs">
            {subtitle(data)}
          </Text>
        </>
      )}
      <View style={styles.container}>
        <YAxis
          style={styles.yAxis}
          data={stubbedDataIfNessesery(data)}
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
          data={stubbedDataIfNessesery(data)}
          contentInset={contentInset}
          curve={shape.curveCardinal}
          svg={{
            fill: 'rgba(190,245,222, 0.2)',
            stroke,
            strokeWidth: 1,
            strokeOpacity: hasData(data) ? 1 : 0.2,
            fillOpacity: hasData(data) ? 1 : 0.5,
          }}
        />
      </View>
    </Card>
  );
}

export default React.memo(BPMChart);

const styles = StyleSheet.create({
  container: {
    height: 180,
    flexDirection: 'row',
  },
  yAxis: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
  },
  areaChart: {
    height: 180,
    flex: 1,
  },
});

function hasData(data: number[]) {
  return data.length > 0;
}

function subtitle(data: number[]) {
  if (!hasData(data)) {
    return 'Not enough data to display the BPM chart.';
  }

  const min = Math.min(...data);
  const max = Math.max(...data);

  return `BPM ranged between ${min} and ${max}`;
}

function stubbedDataIfNessesery(data: number[]) {
  if (!hasData(data)) {
    return [70, 71, 72, 76, 80, 73, 76];
  }

  return data;
}

function title(panicAttacks: IPanicAttack[]) {
  const withBPM = panicAttacks.filter(attack => !!attack.bpm);

  if (withBPM.length === 0) {
    return 'Most recent panic attack BPM';
  }

  return readableDate(withBPM[0].startedAt) + ' panic attack BPM';
}

function getMostRecentBPMData(panicAttacks: IPanicAttack[]) {
  if (panicAttacks.length === 0) {
    return [];
  }

  const withBPM = panicAttacks.filter(attack => !!attack.bpm);

  if (withBPM.length === 0) {
    return [];
  }

  return withBPM[0].bpm?.map(bpm => bpm.value);
}
