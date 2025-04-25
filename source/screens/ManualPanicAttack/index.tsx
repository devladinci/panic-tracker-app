import * as React from 'react';
import {ScrollView} from 'react-native';
import AdditionalNote from '~/components/AdditionalNote';
import Severage from '~/components/Severage';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import {updatePanicAttack, createPanicAttack} from '~/utils/api';
import Layout from '~/components/Layout';
import PhysiologicalSymptoms from '~/components/PhysiologicalSymptoms';
import PhysicalSymptoms from '~/components/PhysicalSymptoms';
import useKeyboard from '~/hooks/useKeyboard';
import variables from '~/styles/variables';
import StartedAtPicker from '~/screens/ManualPanicAttack/StartedAtPicker';
import Button from '~/components/Button';
import DurationPicker from '~/components/DurationPicker';
import {useNavigation} from '@react-navigation/native';
import usePanicAttack from '~/hooks/usePanicAttack';
import {formatDateTime} from '~/utils/date';
import Text from '~/components/Text';

interface IProps {
  route: any;
  navigation: any;
}

export default function ManualPanicAttack({}: IProps) {
  const panicAttackID = useCreatePanicAttack()?.id;

  const panicAttack = usePanicAttack(panicAttackID);

  const [visible] = useKeyboard();
  const scrollViewRef = React.useRef<ScrollView | null>(null);
  const navigation = useNavigation();

  const [startedAtModalVisible, setStartedAtModalVisible] =
    React.useState(false);
  const [durationModalVisible, setDurationModalVisible] = React.useState(false);

  useNavigationOptions(
    () => ({
      headerTransparent: true,
      headerTitle: () => <Text bold={true}>Manually add panic attack</Text>,
      headerLeft: () => <></>,
      headerRight: () => <></>,
    }),

    [],
  );

  React.useEffect(() => {
    if (visible) {
      scrollViewRef?.current?.scrollToEnd();
    }
  }, [visible]);

  if (!panicAttack) {
    return null;
  }

  return (
    <Layout>
      <ScrollView
        ref={scrollViewRef}
        contentInset={{bottom: 0, top: 0}}
        contentContainerStyle={{
          marginHorizontal: variables.spacing.m,
          paddingBottom: variables.spacing.m,
        }}
        showsVerticalScrollIndicator={false}>
        <Text size="s" marginVertical="s" uppercase={true}>
          Started at: {formatDateTime(panicAttack.startedAt)}
        </Text>
        <Button.Solid
          marginBottom="l"
          label="When panic attack started?"
          onPress={() => setStartedAtModalVisible(true)}
        />
        <StartedAtPicker
          panicAttack={panicAttack}
          visible={startedAtModalVisible}
          onDismiss={() => {
            setStartedAtModalVisible(false);
          }}
        />

        <Text size="s" marginVertical="s" uppercase={true}>
          Ended at:{' '}
          {panicAttack.endedAt
            ? formatDateTime(panicAttack.endedAt)
            : 'Unknown'}
        </Text>
        <Button.Solid
          marginBottom="l"
          label={
            panicAttack.endedAt ? 'Edit duration' : 'What was the duration?'
          }
          onPress={() => setDurationModalVisible(true)}
        />
        <DurationPicker
          panicAttack={panicAttack}
          visible={durationModalVisible}
          onDismiss={() => setDurationModalVisible(false)}
        />

        <PhysicalSymptoms
          defaultValues={panicAttack.physicalSymptoms}
          symptomsDidChange={symptoms => {
            panicAttack!.physicalSymptoms = symptoms;
            updatePanicAttack(panicAttack);
          }}
        />
        <PhysiologicalSymptoms
          defaultValues={panicAttack.psychologicalSymptoms}
          symptomsDidChange={symptoms => {
            panicAttack!.psychologicalSymptoms = symptoms;
            updatePanicAttack(panicAttack);
          }}
        />
        <Severage
          value={panicAttack.scale}
          onSelect={scale => {
            panicAttack!.scale = scale as any;
            updatePanicAttack(panicAttack);
          }}
        />
        <AdditionalNote
          value={panicAttack.additionalNotes}
          onAdd={note => {
            panicAttack!.additionalNotes = note;
            updatePanicAttack(panicAttack);
          }}
        />

        <Button.Gradient
          label="I'm Done"
          onPress={() => navigation.goBack()}
          marginTop="l"
          disabled={!panicAttack.endedAt}
        />
      </ScrollView>
    </Layout>
  );
}

function useCreatePanicAttack() {
  const [panicAttack, setPanicAttack] = React.useState<IPanicAttack | null>(
    null,
  );

  React.useEffect(() => {
    setPanicAttack(createPanicAttack());
  }, [setPanicAttack]);

  return panicAttack;
}
