import * as React from 'react';
import {BarChart, XAxis} from 'react-native-svg-charts';
import Text from '~/components/Text';
import {useColor} from '~/styles/theme';
import Card from '~/components/Card';
import {generateData} from './utils';
import {StyleSheet} from 'react-native';

interface IProps {
  panicAttacks: IPanicAttack[];
}

function ScaleChart({panicAttacks}: IProps) {
  const labelColor = useColor('grey');
  const data = generateData(panicAttacks);
  const fill = useColor('lightGreen');

  return (
    <Card.Column>
      <Text bold={true} marginBottom="xs">
        Intensity
      </Text>
      <Text size="s" color="grey" marginBottom="xs">
        {subtitle(data)}
      </Text>
      <BarChart
        style={style.barChart}
        data={stubbedDataIfNessesery(data)}
        svg={{fill, fillOpacity: hasData(data) ? 1 : 0.1}}
        animate={true}
        animationDuration={500}
        contentInset={{top: 10, bottom: 25}}
      />
      <XAxis
        data={stubbedDataIfNessesery(data)}
        formatLabel={(_value, index) => index + 1}
        contentInset={{left: 15, right: 15}}
        svg={{fontSize: 11, fill: labelColor}}
      />
    </Card.Column>
  );
}

export default React.memo(ScaleChart);

const style = StyleSheet.create({
  barChart: {
    height: 180,
  },
});

function hasData(data: number[]) {
  return Math.max(...data) > 0;
}

function subtitle(data: number[]) {
  if (!hasData(data)) {
    return 'Not enough data to generate an intensity graph.';
  }

  const max = Math.max(...data);

  return `Most of the panic attacks have an intensity of ${
    data.indexOf(max) + 1
  }`;
}

function stubbedDataIfNessesery(data: number[]) {
  if (!hasData(data)) {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  return data;
}
