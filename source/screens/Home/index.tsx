import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import ProfileButton from './ProfileButton';
import useSyncBPM from './useSyncBPM';
import Button from '~/components/Button';
import Flex from '~/components/Flex';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import variables from '~/styles/variables';
import Layout from '~/components/Layout';
import usePanicAttacks from '~/hooks/usePanicAttacks';
import Past30Days from './Past30Days';
import Widget from './Widget';
import routes, {useNavigate} from '~/routes';
import HealthKit from '~/utils/external/HealthKit';
import useOnline from '~/hooks/useOnline';
import ClosePanicAttack from './ClosePanicAttack';
import CopingTipsButton from './CopingTipsButton';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const panicAttacks = usePanicAttacks();
  const navigate = useNavigate();

  useOnline();

  HealthKit.init();

  useSyncBPM(panicAttacks);

  useNavigationOptions(
    () => ({
      headerRight: () => <ProfileButton />,
      headerTransparent: true,
      headerTitle: () => <></>,
      headerLeft: () => <CopingTipsButton />,
    }),

    [],
  );

  function handleOnPress() {
    const path = routes.create();
    navigate(path);
  }

  return (
    <Layout>
      <ClosePanicAttack panicAttacks={panicAttacks} />
      <ScrollView contentContainerStyle={{paddingBottom: insets.bottom}}>
        <Past30Days panicAttacks={panicAttacks} />
        <Widget panicAttacks={panicAttacks} />
      </ScrollView>
      <Flex.Row
        flex={1}
        style={[
          styles.buttonWrap,
          {
            bottom: insets.bottom || variables.spacing.m,
          },
        ]}
        paddingHorizontal="m">
        <Button.Gradient
          style={styles.button}
          label="I have a panic attack"
          onPress={handleOnPress}
        />
      </Flex.Row>
    </Layout>
  );
}

const styles = StyleSheet.create({
  buttonWrap: {
    position: 'absolute',
  },
  button: {
    width: '100%',
  },
});
