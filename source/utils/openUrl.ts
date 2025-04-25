import {Linking} from 'react-native';

export default async function openUrl(url: string) {
  const isSupported = await Linking.canOpenURL(url);
  if (!isSupported) {
    return false;
  }

  Linking.openURL(url);

  return true;
}
