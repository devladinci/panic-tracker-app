import * as React from 'react';
import {BarChart, XAxis} from 'react-native-svg-charts';
import Text from '~/components/Text';
import {useColor} from '~/styles/theme';
import Card from '~/components/Card';
import {generateData, getMostCommonDaytime} from './utils';
import {StyleSheet} from 'react-native';

interface IProps {
  panicAttacks: IPanicAttack[];
}

function DayRangeChart({panicAttacks}: IProps) {
  const fill = useColor('lightGreen');
  const axisFill = useColor('grey');
  const data = generateData(panicAttacks);

  return (
    <Card marginTop="m">
      <Text bold={true} marginBottom="xs">
        Occurrence
      </Text>
      <Text size="s" color="grey" marginBottom="xs">
        {subtitle(panicAttacks, data)}
      </Text>
      <BarChart
        style={styles.barChart}
        data={stubbedDataIfNessesery(data)}
        contentInset={{top: 10, bottom: 30}}
        svg={{fill, fillOpacity: hasData(data) ? 1 : 0.1}}
        animate={true}
        animationDuration={500}
      />
      <XAxis
        data={stubbedDataIfNessesery(data)}
        formatLabel={(_value, index) => {
          if (index === 0) {
            return 'morning';
          } else if (index === 1) {
            return 'noon';
          }

          return 'evenning';
        }}
        contentInset={{left: 60, right: 60}}
        svg={{fontSize: 14, fill: axisFill}}
      />
    </Card>
  );
}

export default React.memo(DayRangeChart);

const styles = StyleSheet.create({
  barChart: {
    height: 180,
  },
});

function hasData(data: number[]) {
  return Math.max(...data) > 0;
}

function subtitle(panicAttacks: IPanicAttack[], data: number[]) {
  if (panicAttacks.length === 0) {
    return 'Not enough data to make sensible sentiment';
  }

  return `From ${panicAttacks.length} panic attacks in total, it looks like you
        most likely experience one at ${getMostCommonDaytime(data)}`;
}

function stubbedDataIfNessesery(data: number[]) {
  if (!hasData(data)) {
    return [1, 2, 3];
  }

  return data;
}
