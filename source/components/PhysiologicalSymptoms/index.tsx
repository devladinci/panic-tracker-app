import * as React from 'react';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import Button from '~/components/Button';
import SymptomsModal from '~/components/SymptomsModal';

const COMMON_SYMPTOM = [
  'feelings of unreality ',
  'sense of impending doom',
  'danger',
  'fear of loss of control',
  'detachment',
];

interface IProps {
  defaultValues?: string[] | null;
  symptomsDidChange: (symptoms: string[]) => void;
}

export default function PhysiologicalSymptoms({
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
        label={`${
          symptoms.length > 0 ? 'Change' : 'Add'
        } Physiological Symptoms`}
        onPress={() => setExpanded(true)}
      />
      <SymptomsModal
        visible={expanded}
        close={() => setExpanded(false)}
        title="Physiological Symptoms"
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
