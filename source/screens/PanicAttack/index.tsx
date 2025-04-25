import {getTime} from 'date-fns';
import {addMinutes} from 'date-fns/esm';
import * as React from 'react';
import {AppState, AppStateStatus, ScrollView, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AdditionalNote from '~/components/AdditionalNote';
import Button from '~/components/Button';
import Flex from '~/components/Flex';
import Layout from '~/components/Layout';
import PhysicalSymptoms from '~/components/PhysicalSymptoms';
import PhysiologicalSymptoms from '~/components/PhysiologicalSymptoms';
import Severage from '~/components/Severage';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import variables from '~/styles/variables';
import {createPanicAttack, updatePanicAttack} from '~/utils/api';
import useGetLocation from '~/utils/location';

import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

import Breathe from '~/components/Breathe';
import Counter from './Counter';
import OnlineUsers from './OnlineUsers';
import useKeyboard from '~/hooks/useKeyboard';

export default function DetailsScreen({navigation}: any) {
  const panicAttack = useCreatePanicAttack();
  const insets = useSafeAreaInsets();
  const [visible] = useKeyboard();

  const scrollViewRef = React.useRef<ScrollView | null>(null);

  React.useEffect(() => {
    if (visible) {
      scrollViewRef?.current?.scrollToEnd();
    }
  }, [visible]);

  useGetLocation(panicAttack);
  useOpenPANotification();

  useNavigationOptions(
    () => ({
      headerTransparent: true,
      headerShown: true,
      headerTitle: () => <Counter panicAttack={panicAttack} />,
    }),
    [panicAttack],
  );

  if (!panicAttack) {
    return null;
  }

  function onBackPress() {
    updatePanicAttack({...panicAttack, endedAt: getTime(new Date())});

    navigation.goBack();
  }

  return (
    <Layout>
      <ScrollView
        ref={scrollViewRef}
        contentInset={{bottom: 40, top: 0}}
        contentContainerStyle={{
          marginHorizontal: variables.spacing.m,
          paddingBottom: variables.spacing.m,
        }}
        showsVerticalScrollIndicator={false}>
        <OnlineUsers />
        <Breathe />
        <Severage
          onSelect={scale => {
            panicAttack!.scale = scale as any;
            updatePanicAttack(panicAttack);
          }}
        />
        <PhysicalSymptoms
          symptomsDidChange={symptoms => {
            panicAttack!.physicalSymptoms = symptoms;
            updatePanicAttack(panicAttack);
          }}
        />
        <PhysiologicalSymptoms
          symptomsDidChange={symptoms => {
            panicAttack!.psychologicalSymptoms = symptoms;
            updatePanicAttack(panicAttack);
          }}
        />
        <AdditionalNote
          onAdd={note => {
            panicAttack!.additionalNotes = note;
            updatePanicAttack(panicAttack);
          }}
        />
      </ScrollView>

      <Flex.Row
        ignoreTouches={true}
        justify="center"
        align="center"
        flex={1}
        style={[
          styles.staticContainer,
          {
            bottom: insets.bottom || variables.spacing.m,
          },
        ]}>
        <Button.Gradient label="I feel better" onPress={onBackPress} />
      </Flex.Row>
    </Layout>
  );
}

const styles = StyleSheet.create({
  staticContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

function useCreatePanicAttack() {
  const [panicAttack, setPanicAttack] = React.useState<IPanicAttack | null>(
    null,
  );

  React.useEffect(() => {
    setPanicAttack(createPanicAttack());
  }, [setPanicAttack]);

  return panicAttack;
}

function useOpenPANotification() {
  React.useEffect(() => {
    notifee.requestPermission();
  }, []);

  React.useEffect(() => {
    function handleAppStateChange(nextAppState: AppStateStatus) {
      if (nextAppState === 'inactive') {
        const date = addMinutes(new Date(), 10);

        const trigger: TimestampTrigger = {
          type: TriggerType.TIMESTAMP,
          timestamp: date.getTime(),
        };

        notifee.createTriggerNotification(
          {
            title: 'Are you feeling better?',
            body: 'It looks like your last panic attack is still open. Consider pressing "I feel better" button to end it.',
          },
          trigger,
        );

        notifee.setBadgeCount(1);
      }

      if (nextAppState === 'active') {
        notifee.cancelAllNotifications();
        notifee.setBadgeCount(0);
      }
    }

    const appState = AppState.addEventListener('change', handleAppStateChange);

    return () => appState?.remove();
  }, []);
}
