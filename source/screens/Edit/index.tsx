import * as React from 'react';
import {ScrollView} from 'react-native';
import AdditionalNote from '~/components/AdditionalNote';
import BPMChart from '~/components/BPMChart';
import Map from '~/components/Map';
import Severage from '~/components/Severage';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import {updatePanicAttack} from '~/utils/api';
import usePanicAttack from '~/hooks/usePanicAttack';
import Layout from '~/components/Layout';
import PhysiologicalSymptoms from '~/components/PhysiologicalSymptoms';
import PhysicalSymptoms from '~/components/PhysicalSymptoms';
import Flex from '~/components/Flex';
import Button from '~/components/Button';
import Icon from '~/components/Icon';
import Text from '~/components/Text';
import {syncPanicAttackBPM} from '~/utils/bpm';
import useKeyboard from '~/hooks/useKeyboard';
import variables from '~/styles/variables';

interface IProps {
  route: any;
  navigation: any;
}

export default function Edit({route}: IProps) {
  const {id}: {id: string} = route.params;

  const panicAttack = usePanicAttack(id);

  const [visible] = useKeyboard();
  const scrollViewRef = React.useRef<ScrollView | null>(null);

  React.useEffect(() => {
    if (visible) {
      scrollViewRef?.current?.scrollToEnd();
    }
  }, [visible]);

  useNavigationOptions(() => ({headerTransparent: true}), []);

  if (!panicAttack) {
    return null;
  }

  function resyncBPM() {
    if (!panicAttack) {
      return;
    }
    syncPanicAttackBPM(panicAttack);
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
        <Map location={panicAttack.location} height={220} />
        <BPMChart panicAttacks={[panicAttack]} graphOnly={true} />
        <Button.Solid
          marginVertical="m"
          label={
            <Flex.Row justify="center" align="center">
              <Icon icon="Sync" color="lightGreen" width={24} height={24} />
              <Text bold={true} marginLeft="m">
                Re-sync BPM
              </Text>
            </Flex.Row>
          }
          onPress={resyncBPM}
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
      </ScrollView>
    </Layout>
  );
}
