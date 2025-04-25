/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from '~/app';
import {name as appName} from './app.json';
import database from '@react-native-firebase/database';
import Sentry from '~/utils/external/Sentry';

database().setPersistenceEnabled(true);
database().setPersistenceCacheSizeBytes(5000000);
database().setLoggingEnabled(__DEV__);

Sentry.init();

AppRegistry.registerComponent(appName, () => App);
