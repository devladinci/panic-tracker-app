import * as React from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {StyleSheet} from 'react-native';
import variables from '~/styles/variables';
import Button from '~/components/Button';
import Flex from '~/components/Flex';
import Text from '~/components/Text';
import Icon from '~/components/Icon';

export default function GoogleLoginButton() {
  GoogleSignin.configure({
    webClientId:
      '786054007366-o4u75ksceqgsi1oke1uabouoo6285b6f.apps.googleusercontent.com',
  });

  async function handleOnPress() {
    GoogleSignin.configure();
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <Button
      style={styles.button}
      label={
        <Flex.Row justify="center" align="center" flex={1}>
          <Icon icon="Google" width={20} height={20} />
          <Text marginLeft="s" bold={true} withTheme={false} size="l">
            Sign in with Google
          </Text>
        </Flex.Row>
      }
      onPress={handleOnPress}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    width: '80%',
    height: 60,
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: variables.spacing.l,
  },
});
