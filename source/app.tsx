import * as React from 'react';
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Screens from '~/screens';
import {useColorScheme} from 'react-native';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import * as Sentry from '@sentry/react-native';

const Stack = createNativeStackNavigator();

function App() {
  const isDark = useColorScheme() === 'dark';
  const {user, initializing} = useLoggedInStatus();

  React.useEffect(() => {
    SplashScreen.hide();
  }, [initializing]);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{presentation: 'fullScreenModal'}}>
        {user ? (
          <>
            <Stack.Screen
              name="HomeStack"
              component={HomeStackScreens}
              options={NO_HEADER}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileStackScreens}
              options={NO_HEADER}
            />
            <Stack.Screen
              name="PanicAttack"
              component={Screens.PanicAttackScreen}
            />
            <Stack.Screen name="Insights" component={Screens.InsigntsScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Sentry.wrap(App);

const HomeStack = createNativeStackNavigator();

function HomeStackScreens() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Screens.HomeScreen} />
      <HomeStack.Screen name="Preview" component={Screens.PreviewScreen} />
      <HomeStack.Screen name="Insights" component={Screens.InsigntsScreen} />
      <HomeStack.Screen name="Edit" component={Screens.Edit} />
      <HomeStack.Screen name="CopingTips" component={Screens.CopingTips} />
    </HomeStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackScreens() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileScreen"
        component={Screens.ProfileScreen}
      />
      <ProfileStack.Screen name="Preview" component={Screens.PreviewScreen} />
      <ProfileStack.Screen name="Settings" component={Screens.SettingsScreen} />
      <ProfileStack.Screen name="Browser" component={Screens.Browser} />
      <ProfileStack.Screen
        name="ManualPanicAttack"
        component={Screens.ManualPanicAttack}
      />
    </ProfileStack.Navigator>
  );
}

const NO_HEADER = {headerShown: false};

function useLoggedInStatus() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  const onAuthStateChanged = React.useCallback(
    (newUser: any) => {
      setUser(newUser);

      if (initializing) {
        setInitializing(false);
      }
    },
    [initializing],
  );

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  return {initializing, user};
}
