import * as React from 'react';
import Button from '~/components/Button';
import SymptomsModal from '~/components/SymptomsModal';
import Text from '~/components/Text';
import Flex from '~/components/Flex';

const COMMON_SYMPTOM = [
  'rapid heart rate',
  'pounding heart',
  'sweating',
  'trembling',
  'shaking',
  'shortness of breath',
  'tightness in your throat',
  'chills',
  'hot flashes',
  'nausea',
  'abdominal cramping',
  'chest pain',
  'headache',
  'dizziness',
  'lightheadedness',
  'faintness',
  'numbness',
  'tingling sensation',
];

interface IProps {
  defaultValues?: string[] | null;
  symptomsDidChange: (symptoms: string[]) => void;
}

export default function PhysicalSymptoms({
  symptomsDidChange,
  defaultValues,
}: IProps) {
  const [expanded, setExpanded] = React.useState(false);
  const [symptoms, setSymptoms] = React.useState<string[]>(defaultValues || []);

  return (
    <Flex.Column marginBottom="m">
      <Text
        uppercase={true}
        size="xs"
        marginTop={symptoms.length > 0 ? 's' : undefined}
        marginBottom={symptoms.length > 0 ? 'm' : undefined}>
        {symptoms.join(', ')}
      </Text>
      <Button.Solid
        label={`${symptoms.length > 0 ? 'Change' : 'Add'} Physical Symptoms`}
        onPress={() => setExpanded(true)}
      />
      <SymptomsModal
        visible={expanded}
        close={() => setExpanded(false)}
        title="Physical Symptoms"
        suggestions={COMMON_SYMPTOM}
        symptomsDidChange={newSymptoms => {
          symptomsDidChange(newSymptoms);
          setSymptoms(newSymptoms);
        }}
        defaultValues={defaultValues}
      />
    </Flex.Column>
  );
}
