import * as React from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import Layout from '~/components/Layout';
import {formatDate, formatTime} from '~/utils/date';
import Text from '~/components/Text';
import Carousel from 'react-native-snap-carousel';
import Flex from '~/components/Flex';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import BPMChart from './BPMChart';
import Map from '~/components/Map';
import Duration from '~/components/Duration';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '~/components/Button';
import {deletePanicAttack} from '~/utils/api';
import {nextPanicAttack, previousPanicAttack} from './utils';
import EditButton from './EditButton';
import usePanicAttacks from '~/hooks/usePanicAttacks';
import GestureRecognizer from 'react-native-swipe-detect';
import variables from '~/styles/variables';

interface IProps {
  route: any;
  navigation: any;
}

export default function PreviewScreen({route}: IProps) {
  const {id}: {id: string} = route.params;

  const panicAttacks = usePanicAttacks();

  const [selected, setSelected] = React.useState<
    IPanicAttack | null | undefined
  >(null);

  const isComponentMounted = React.useRef(false);

  React.useEffect(() => {
    if (panicAttacks.length === 0 || isComponentMounted.current) {
      return;
    }
    isComponentMounted.current = true;
    setSelected(panicAttacks.find(attack => attack.id === id));
  }, [panicAttacks, id]);

  useNavigationOptions(
    () => ({
      headerTransparent: true,
      headerTitle: () => <></>,
      headerRight: () => (
        <Flex.Row>
          <EditButton
            panicAttack={selected}
            disabled={panicAttacks.length === 0}
          />
          <Button.Icon
            disabled={panicAttacks.length === 0}
            icon="Delete"
            size={25}
            onPress={() => {
              Alert.alert('Are you sure?', 'This action can not be undone.', [
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => {
                    if (!selected) {
                      return;
                    }

                    deletePanicAttack(selected, () => {
                      const nextPanicAttackItem = nextPanicAttack(
                        panicAttacks,
                        selected,
                      );
                      setSelected(nextPanicAttackItem);
                    });
                  },
                },
              ]);
            }}
          />
        </Flex.Row>
      ),
    }),

    [selected],
  );

  const insets = useSafeAreaInsets();

  if (!selected) {
    return (
      <Layout>
        <Flex.Column justify="center" align="center" flex={1}>
          <Text center={true}>Nothing here yet!</Text>
        </Flex.Column>
      </Layout>
    );
  }

  function onNext() {
    setSelected(nextPanicAttack(panicAttacks, selected));
  }

  function onPrevious() {
    setSelected(previousPanicAttack(panicAttacks, selected));
  }

  return (
    <Layout>
      <DateTicker
        panicAttacks={panicAttacks}
        onSelect={setSelected}
        initialIndex={selected ? panicAttacks.indexOf(selected) : -1}
      />
      <GestureRecognizer
        config={{
          enableSwipeUp: false,
          enableSwipeDown: false,
        }}
        onSwipeLeft={onNext}
        onSwipeRight={onPrevious}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: insets.bottom + variables.spacing.m,
          }}
          contentInset={{bottom: insets.bottom}}>
          <BPMChart panicAttack={selected} />
          <Flex paddingHorizontal="m" marginTop="l">
            <Map location={selected.location} height={220} />
          </Flex>
          <Flex.Row height={140} justify="space-evenly" marginTop="l">
            <Flex.Column flex={1} justify="center" align="center">
              <Text bold={true} color="black" size="xl">
                Duration
              </Text>
              <Duration
                interval={(selected?.endedAt || 0) - selected.startedAt}
              />
            </Flex.Column>
            <Flex.Column flex={1} justify="flex-start" align="center">
              <Text bold={true} color="black" size="xl">
                Intensity
              </Text>
              <Text
                size="xxxl"
                bold={true}
                color="lightGreen"
                marginVertical="l">
                {selected.scale || 'N/A'}
              </Text>
            </Flex.Column>
          </Flex.Row>
          <PhysicalSymptoms panicAttack={selected} />
          <PsychologicalSymptoms panicAttack={selected} />
          <Notes panicAttack={selected} />
        </ScrollView>
      </GestureRecognizer>
    </Layout>
  );
}

function PhysicalSymptoms({panicAttack}: {panicAttack: IPanicAttack}) {
  const hasSymptoms =
    panicAttack.physicalSymptoms && panicAttack.physicalSymptoms.length > 0;

  return (
    <Flex.Column marginTop="l" marginHorizontal="m">
      <Text bold={true} size="l">
        Physical Symptoms:
      </Text>
      <Text marginTop="s" color={hasSymptoms ? 'black' : 'grey'}>
        {hasSymptoms ? panicAttack.physicalSymptoms?.join(', ') : 'No data'}
      </Text>
    </Flex.Column>
  );
}

function PsychologicalSymptoms({panicAttack}: {panicAttack: IPanicAttack}) {
  const hasSymptoms =
    panicAttack.psychologicalSymptoms &&
    panicAttack.psychologicalSymptoms.length > 0;

  return (
    <Flex.Column marginTop="l" marginHorizontal="m">
      <Text bold={true} size="l">
        Phycological Symptoms:
      </Text>
      <Text marginTop="s" color={hasSymptoms ? 'black' : 'grey'}>
        {hasSymptoms
          ? panicAttack.psychologicalSymptoms?.join(', ')
          : 'No data'}
      </Text>
    </Flex.Column>
  );
}

function Notes({panicAttack}: {panicAttack: IPanicAttack}) {
  const hasNote = panicAttack.additionalNotes;
  return (
    <Flex.Column marginTop="l" marginHorizontal="m">
      <Text bold={true} size="l">
        Notes:
      </Text>
      <Text marginTop="s" color={hasNote ? 'black' : 'grey'}>
        {hasNote ? panicAttack.additionalNotes : 'No notes'}
      </Text>
    </Flex.Column>
  );
}

function DateTicker({
  panicAttacks,
  initialIndex,
  onSelect,
}: {
  panicAttacks: IPanicAttack[];
  initialIndex: number;
  onSelect: (panicAttack: IPanicAttack) => void;
}) {
  const dimentions = useWindowDimensions();
  const ref = React.useRef<any | null>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }

    ref.current.snapToItem(initialIndex);
  }, [initialIndex]);

  const renderItem = React.useCallback(
    ({item, index}) => (
      <Pressable
        onPress={() => {
          ref.current.snapToItem(index);
        }}>
        <Flex.Column justify="center" align="center">
          <Text bold={true} center={true}>
            {formatDate(item.startedAt)}
          </Text>
          <Text color="grey" size="s">
            {formatTime(item.startedAt)}
          </Text>
        </Flex.Column>
      </Pressable>
    ),
    [],
  );

  return (
    <View>
      <Carousel
        ref={ref}
        initialScrollIndex={initialIndex}
        data={panicAttacks}
        renderItem={renderItem}
        sliderWidth={dimentions.width}
        itemWidth={dimentions.width * 0.4}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.2}
        onSnapToItem={index => onSelect(panicAttacks[index])}
      />
    </View>
  );
}
