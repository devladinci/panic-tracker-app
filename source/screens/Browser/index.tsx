import * as React from 'react';
import {StyleSheet} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';
import {WebView} from 'react-native-webview';
import Button from '~/components/Button';
import Flex from '~/components/Flex';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import {useColor} from '~/styles/theme';
import openUrl from '~/utils/openUrl';

interface IProps {
  route: any;
}

export default function Browser({route}: IProps) {
  const {url} = route.params;

  const onPress = () => {
    openUrl(url);
  };

  useNavigationOptions(
    () => ({
      headerRight: () => (
        <Button.Icon
          icon="Export"
          size={24}
          onPress={onPress}
          marginRight="m"
        />
      ),
      headerTitle: () => <></>,
    }),
    [],
  );

  const [progress, setProgress] = React.useState(0);

  return (
    <Flex.Column flex={1}>
      <ProgressView progress={progress} />
      <WebView
        style={styles.browser}
        source={{uri: url}}
        onLoadProgress={event => setProgress(event.nativeEvent.progress)}
      />
    </Flex.Column>
  );
}

function ProgressView({progress}: {progress: number}) {
  const backgroundColor = useColor('green');

  if (progress === 1) {
    return null;
  }

  return (
    <AnimatedView
      transition="width"
      style={{
        height: 3,
        backgroundColor,
        width: `${progress * 100}%`,
      }}
    />
  );
}

const styles = StyleSheet.create({
  browser: {
    flex: 1,
  },
  footer: {
    borderTopWidth: 1,
  },
});
