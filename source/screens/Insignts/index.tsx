import * as React from 'react';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import Layout from '~/components/Layout';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import variables from '~/styles/variables';
import ScaleChart from '~/components/ScaleChart';
import usePanicAttacks from '~/hooks/usePanicAttacks';
import BPMChart from '~/components/BPMChart';
import DayRangeChart from '~/components/DayRangeChart';
import {ScrollView} from 'react-native';
import Text from '~/components/Text';
import DurationChart from '~/components/DurationChart';

export default function InsigntsScreen() {
  const panicAttacks = usePanicAttacks();

  useNavigationOptions(
    () => ({
      headerTransparent: true,
      headerTitle: () => (
        <Text bold={true} size="l">
          Insights
        </Text>
      ),
    }),
    [],
  );

  const insets = useSafeAreaInsets();

  return (
    <Layout>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: variables.spacing.m,
          paddingBottom: insets.bottom,
        }}
        showsVerticalScrollIndicator={false}>
        <ScaleChart panicAttacks={panicAttacks} />
        <BPMChart panicAttacks={panicAttacks} />
        <DayRangeChart panicAttacks={panicAttacks} />
        <DurationChart panicAttacks={panicAttacks} />
      </ScrollView>
    </Layout>
  );
}
