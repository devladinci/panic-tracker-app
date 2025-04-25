import auth from '@react-native-firebase/auth';
import * as React from 'react';
import Button from '~/components/Button';
import Layout from '~/components/Layout';
import Text from '~/components/Text';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import DeviceInfo from 'react-native-device-info';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import variables from '~/styles/variables';
import Flex from '~/components/Flex';
import Icon from '~/components/Icon';
import AppleHealthKit from 'react-native-health';
import notifee from '@notifee/react-native';
import {useColor} from '~/styles/theme';
import {check, PERMISSIONS, RESULTS} from 'react-native-permissions';

const DISCLAIMER =
  'Panic Tracker is not a medical device and is not intended to be used as such. \n Panic Tracker should not be used to diagnose, treat or prevent any disorder or medical condition. \n Always seek the advice of qualified medical staff.';

export default function SettingsScreen() {
  useNavigationOptions(
    () => ({
      headerTransparent: true,
    }),
    [],
  );

  function handleSignOut() {
    auth().signOut();
  }

  const SETTINGS = [
    {
      title: 'Permissions',
      items: [
        {
          title: 'Apple Health',
          subtitle: 'Required in order to sync BPM',
          icon: 'AppleHealth',
          permission: 'AppleHealth',
        },
        {
          title: 'Push Notifications',
          subtitle: 'To remind you to close current panic attack',
          icon: 'PushNotification',
          permission: 'PushNotification',
        },
        {
          title: 'Location',
          subtitle: 'Keeping track where panic attacks occurs',
          icon: 'Location',
          permission: 'Location',
        },
      ],
    },
  ];

  return (
    <Layout safeArea={true}>
      <ScrollView contentContainerStyle={styles.container}>
        {SETTINGS.map(section => (
          <View key={section.title}>
            <Text bold={true} color="grey" marginVertical="l">
              {section.title}
            </Text>
            {section.items.map(item => (
              <Cell key={item.title} item={item} />
            ))}
          </View>
        ))}

        <Text
          bold={true}
          size="l"
          center={true}
          marginBottom="s"
          marginTop="xxl">
          Disclaimer
        </Text>
        <Text center={true}>{DISCLAIMER}</Text>
        <Button.Solid marginTop="l" label="Sign Out" onPress={handleSignOut} />
        <Text center={true} bold={true} color="grey" marginTop="l">
          Panic Tracker
        </Text>
        <Text center={true} color="grey">
          Version: {DeviceInfo.getReadableVersion()}
        </Text>
      </ScrollView>
    </Layout>
  );
}

function Cell({item}: {item: any}) {
  const enabled = usePermissionStatus(item.permission);
  const borderBottomColor = useColor('lightGrey');
  const trackColor = useColor('green');

  return (
    <Pressable onPress={item.onPress}>
      <Flex.Row
        justify="space-between"
        align="center"
        marginBottom="m"
        paddingBottom="m"
        style={{
          marginBottom: variables.spacing.m,
          borderBottomColor,
          borderBottomWidth: 1,
        }}>
        <Flex.Row align="center">
          {item.icon && <Icon icon={item.icon as any} width={38} height={38} />}
          <Flex.Column marginHorizontal="xs">
            <Text bold={true}>{item.title}</Text>
            {item.subtitle && (
              <Text size="xs" color="grey">
                {item.subtitle}
              </Text>
            )}
          </Flex.Column>
        </Flex.Row>
        {item.permission && (
          <Switch
            value={enabled}
            onValueChange={() => {
              if (enabled) {
                return;
              }
              Linking.openSettings();
            }}
            trackColor={{true: trackColor}}
          />
        )}
        {item.onPress && (
          <Icon icon="Next" width={18} height={18} color="black" />
        )}
      </Flex.Row>
    </Pressable>
  );
}

function usePermissionStatus(feature?: string | null) {
  const [granted, setGranted] = React.useState(false);

  if (!feature) {
    return;
  }

  if (feature === 'AppleHealth') {
    AppleHealthKit.isAvailable((err: Object, available: boolean) => {
      if (err) {
        console.log('error initializing Healthkit: ', err);
        return;
      }

      setGranted(available);
    });
  } else if (feature === 'PushNotification') {
    notifee.requestPermission().then(settings => {
      setGranted(settings.alert === 1);
    });
  } else if (feature === 'Location') {
    check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(result => {
        console.log(result);
        if (result === RESULTS.GRANTED) {
          setGranted(true);
        } else {
          check(PERMISSIONS.IOS.LOCATION_ALWAYS)
            .then(secondResult => {
              if (secondResult === RESULTS.GRANTED) {
                setGranted(true);
              }
            })
            .catch(secondError => console.warn(secondError));
        }
      })
      .catch(error => console.warn(error));
  }

  return granted;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: variables.spacing.m,
  },
});
