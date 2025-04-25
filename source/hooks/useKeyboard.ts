import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export default () => {
  const [visible, setVisible] = useState(false);
  const showEvent = 'keyboardDidShow';
  const hideEvent = 'keyboardDidHide';

  function dismiss() {
    Keyboard.dismiss();
    setVisible(false);
  }

  useEffect(() => {
    function onKeyboardShow() {
      setVisible(true);
    }

    function onKeyboardHide() {
      setVisible(false);
    }

    const showSubscription = Keyboard.addListener(showEvent, onKeyboardShow);
    const hideSubscription = Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return [visible, dismiss];
};
