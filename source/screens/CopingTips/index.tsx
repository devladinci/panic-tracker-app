import * as React from 'react';
import Button from '~/components/Button';
import Card from '~/components/Card';
import Flex from '~/components/Flex';
import Layout from '~/components/Layout';
import Text from '~/components/Text';
import useCopingTips from '~/hooks/useCopingTips';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import AddButton from './AddButton';
import auth from '@react-native-firebase/auth';
import {deleteCopingTip, toggleTip} from '~/utils/api';
import {Alert, FlatList} from 'react-native';
import variables from '~/styles/variables';
import AddCopingSuggestionModal from '~/components/AddCopingTipModal';

export default function CopingTips() {
  useNavigationOptions(
    () => ({
      headerRight: () => <AddButton />,
      headerTransparent: true,
      headerTitle: () => <Text bold={true}>Coping tips</Text>,
    }),
    [],
  );

  const tips = useCopingTips();

  const renderItem = React.useCallback(
    ({item}) => <CopingTip tip={item} />,
    [],
  );

  return (
    <Layout>
      <FlatList
        style={{paddingHorizontal: variables.spacing.m}}
        data={tips}
        renderItem={renderItem}
        ListFooterComponent={<Footer />}
      />
    </Layout>
  );
}

interface ICopingTipProps {
  tip: ICopingTip;
}

function CopingTip({tip}: ICopingTipProps) {
  function handleUpvote() {
    toggleTip(tip);
  }

  return (
    <Card marginBottom="m">
      <Text size="l">{tip.tip}</Text>
      <Flex.Row justify="space-between" align="center" marginTop="m">
        <Button
          onPress={handleUpvote}
          label={<UpvoteTitle upvotes={tip.upvotes} />}
        />
        <Flex.Row align="center">
          <Text color="grey" uppercase={true} bold={true} size="xs">
            by {tip.username}
          </Text>
          <TipDeleteButton tip={tip} />
        </Flex.Row>
      </Flex.Row>
    </Card>
  );
}

function UpvoteTitle({upvotes}: {upvotes?: string[] | null}) {
  const votesCount = upvotes?.length || 0;

  const currentUser = auth().currentUser;

  const hasVoted = (upvotes || []).includes(currentUser!.uid);

  return (
    <Text
      color={hasVoted ? 'green' : 'darkGrey'}
      uppercase={true}
      size="s"
      bold={true}>
      Helpful ({votesCount})
    </Text>
  );
}

function TipDeleteButton({tip}: {tip: ICopingTip}) {
  const currentUser = auth().currentUser;

  if (tip.userUid !== currentUser?.uid) {
    return null;
  }

  function handleOnPress() {
    Alert.alert('Are you sure?', 'This action can not be undone.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          deleteCopingTip(tip);
        },
      },
    ]);
  }

  return (
    <Button.Icon
      icon="Delete"
      size={24}
      onPress={handleOnPress}
      marginLeft="s"
    />
  );
}

function Footer() {
  const [copingModalVisible, setCopingModalVisible] = React.useState(false);

  function handleOnPress() {
    setCopingModalVisible(true);
  }

  return (
    <Flex.Column justify="center" marginTop="m">
      <Text center={true} size="m" marginBottom="m">
        Have a tip you want to share?
      </Text>
      <Button.Solid label="Add a coping tip" onPress={handleOnPress} />
      <AddCopingSuggestionModal
        visible={copingModalVisible}
        onDismiss={() => setCopingModalVisible(false)}
      />
    </Flex.Column>
  );
}
