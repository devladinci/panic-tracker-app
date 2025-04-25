import * as React from 'react';
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {StyleSheet} from 'react-native';

export default function AppleLoginButton() {
  async function onPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned';
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential);
  }

  return (
    <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.DEFAULT}
      style={styles.button}
      onPress={onPress}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    width: '80%',
    height: 60,
  },
});
