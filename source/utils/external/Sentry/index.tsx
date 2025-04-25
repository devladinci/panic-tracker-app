import * as Sentry from '@sentry/react-native';

export default {
  init() {
    Sentry.init({
      dsn: 'YOUR SENTRY KEY',
      tracesSampleRate: 1.0,
    });
  },
};
