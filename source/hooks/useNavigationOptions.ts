import * as React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useColor} from '~/styles/theme';

interface ScreenOptions {
  headerLeft: () => React.ReactElement;
  headerRight: () => React.ReactElement;
  headerTitle: () => React.ReactElement | string;
  animationEnabled: boolean;
  headerShown: boolean;
  headerTransparent: boolean;
  gestureEnabled: boolean;
  safeAreaInsets: Object;
}

export default function useNavigationOptions(
  setOptions: () => Partial<ScreenOptions>,
  deps: any[],
) {
  const navigation = useNavigation();
  const headerTintColor = useColor('black');

  /* eslint-disable react-hooks/exhaustive-deps */
  React.useLayoutEffect(() => {
    navigation.setOptions({
      ...setOptions(),
      headerBackTitleVisible: false,
      headerTintColor,
    });
  }, [navigation, ...deps]);
  /* eslint-enable react-hooks/exhaustive-deps */
}
