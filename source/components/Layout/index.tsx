import * as React from 'react';
import {
  Image,
  StyleSheet,
  useColorScheme,
  ViewStyle,
  View,
  SafeAreaView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useColor} from '~/styles/theme';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Flex from '~/components/Flex';
import LinearGradient from 'react-native-linear-gradient';

interface IProps {
  style?: ViewStyle;
  children: React.ReactNode;
  safeArea?: boolean;
}

export default function Layout({children, style, safeArea = false}: IProps) {
  const backgroundColor = useColor('white');
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';

  return (
    <Flex
      flex={1}
      style={[{backgroundColor, paddingTop: insets.top + 56}, style] as any}>
      <Image
        source={
          isDark
            ? require('./BackgroundDark.png')
            : require('./BackgroundLight.png')
        }
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        style={[StyleSheet.absoluteFill, {opacity: 0.1}]}
        colors={['#5FC0CA', '#80C8BC']}
        angle={45}
      />
      <View style={{flex: 1}}>
        <SafeAreaWrap enabled={safeArea}>{children}</SafeAreaWrap>
        <KeyboardSpacer />
      </View>
    </Flex>
  );
}

function SafeAreaWrap({
  enabled,
  children,
}: {
  enabled: boolean;
  children: React.ReactNode;
}) {
  if (!enabled) {
    return <>{children}</>;
  }

  return <SafeAreaView>{children}</SafeAreaView>;
}
