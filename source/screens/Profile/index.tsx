import * as React from 'react';
import {FlatList} from 'react-native';
import CloseButton from '~/components/CloseButton';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import Item from './Item';
import usePanicAttacks from '~/hooks/usePanicAttacks';
import CalendarHeatmap from 'react-native-calendar-heatmap';
import {forHeatmap} from '~/utils/date';
import Layout from '~/components/Layout';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import {differenceInDays} from 'date-fns';
import SettingsButton from './SettingsButton';
import auth from '@react-native-firebase/auth';
import {useColor} from '~/styles/theme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import variables from '~/styles/variables';
import Button from '~/components/Button';
import routes, {useNavigate} from '~/routes';

export default function ProfileScreen() {
  const panicAttacks = usePanicAttacks();
  const insets = useSafeAreaInsets();

  useNavigationOptions(
    () => ({
      headerRight: () => <SettingsButton />,
      headerLeft: () => <CloseButton />,
      headerTitle: () => <></>,
      headerTransparent: true,
    }),
    [],
  );

  const renderItem = React.useCallback(
    ({item}) => <Item panicAttack={item} />,
    [],
  );

  return (
    <Layout>
      <FlatList
        ListEmptyComponent={<EmptyComponent />}
        contentContainerStyle={{marginHorizontal: variables.spacing.m}}
        contentInset={{bottom: insets.bottom}}
        ListHeaderComponent={<Header panicAttacks={panicAttacks} />}
        data={panicAttacks}
        renderItem={renderItem}
      />
    </Layout>
  );
}

function Header({panicAttacks}: {panicAttacks: IPanicAttack[]}) {
  const navigate = useNavigate();
  const past30Days = panicAttacks.filter(
    attack => differenceInDays(new Date(), new Date(attack.startedAt)) < 30,
  );

  const values = panicAttacks.map(attack => {
    return {
      date: forHeatmap(attack.startedAt),
    };
  });

  const currentUser = auth().currentUser;
  const monthLabelsColor = useColor('black');
  const matrixColors = [
    useColor('white'),
    useColor('lightGreen'),
    useColor('green'),
    '#44a340',
    '#1e6823',
  ];

  function onManualPanicAttack() {
    const path = routes.manualCreate();
    navigate(path);
  }

  return (
    <Flex.Column>
      <Text bold={true} size="xxl" marginBottom="m">
        Hi, {currentUser?.displayName || 'again'}!
      </Text>
      <Flex.Row flex={1} justify="space-evenly" width="100%" marginVertical="l">
        <Flex.Column justify="center" align="center">
          <Text bold={true} uppercase={true}>
            Total
          </Text>
          <Text size="xxxl" color="lightGreen" bold={true}>
            {panicAttacks.length === 0 ? 'N/A' : panicAttacks.length}
          </Text>
        </Flex.Column>

        <Flex.Column justify="center" align="center">
          <Text bold={true} uppercase={true}>
            Past 30 Days
          </Text>
          <Text size="xxxl" color="lightGreen" bold={true}>
            {past30Days.length === 0 ? 'N/A' : past30Days.length}
          </Text>
        </Flex.Column>
      </Flex.Row>

      {values.length > 0 && (
        <Flex flex={1} justify="center" align="center" marginBottom="l">
          <CalendarHeatmap
            endDate={new Date()}
            numDays={100}
            values={values}
            monthLabelsColor={monthLabelsColor}
            colorArray={matrixColors}
          />
        </Flex>
      )}

      <Button.Solid
        marginBottom="l"
        label="Manually add panic attack"
        onPress={onManualPanicAttack}
      />
    </Flex.Column>
  );
}

function EmptyComponent() {
  return (
    <Flex flex={1} justify="center" align="center" height={200}>
      <Text center={true} bold={true} size="l">
        No registered panic attacks yet.
      </Text>
    </Flex>
  );
}
