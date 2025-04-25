import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';

/* Permission options */
export const permissions = {
  permissions: {
    read: [AppleHealthKit.Constants.Permissions.HeartRate],
    write: [],
  },
} as HealthKitPermissions;

export default {
  init() {
    AppleHealthKit.initHealthKit(permissions, (error: string) => {
      if (error) {
        console.log('[ERROR] Cannot grant permissions!');
      }
    });
  },
};
