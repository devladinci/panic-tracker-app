import * as React from 'react';
import Flex from '~/components/Flex';
import Icon from '~/components/Icon';
import Layout from '~/components/Layout';
import useNavigationOptions from '~/hooks/useNavigationOptions';
import AppleLoginButton from './AppleLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import {Image, StyleSheet} from 'react-native';
import {View as AnimatedView} from 'react-native-animatable';

export default function ProfileScreen() {
  useNavigationOptions(
    () => ({
      headerTransparent: true,
      headerShown: false,
    }),
    [],
  );

  return (
    <Layout>
      <Image
        source={require('./LaunchScreen.png')}
        style={StyleSheet.absoluteFill}
      />
      <Flex.Column>
        <Flex.Column justify="center" align="center" height="50%">
          <AnimatedView
            animation="zoomIn"
            delay={150}
            duration={300}
            useNativeDriver={true}>
            <Icon icon="Logo" width={120} height={120} />
          </AnimatedView>
        </Flex.Column>
        <Flex.Column justify="center" align="center" height="50%">
          <AppleLoginButton />
          <GoogleLoginButton />
        </Flex.Column>
      </Flex.Column>
    </Layout>
  );
}
