import {useColorScheme} from 'react-native';

const colors = {
  whiteLight: '#fff',
  whiteDark: '#000',

  blackLight: '#000',
  blackDark: '#fff',

  greyLight: '#909090',
  greyDark: '#909090',

  darkGreyLight: '#464646',
  darkGreyDark: '#909090',

  lightGreyLight: '#e7e7e7',
  lightGreyDark: '#e7e7e7',

  lightGreenLight: '#5FC0CA',
  lightGreenDark: '#5FC0CA',

  greenLight: '#80C8BC',
  greenDark: '#80C8BC',

  orangeLight: '#ce8f5a',
  orangeDark: '#ce8f5a',

  lightOrangeLight: '#EED299',
  lightOrangeDark: '#EED299',

  blueLight: '#6287a2',
  blueDark: '#6287a2',
};

export type IThemeColors =
  | 'white'
  | 'black'
  | 'lightGrey'
  | 'grey'
  | 'darkGrey'
  | 'green'
  | 'lightGreen'
  | 'orange'
  | 'lightOrange'
  | 'blue';

export function useColor(color: IThemeColors, withTheme: boolean = true) {
  const isDark = useColorScheme() === 'dark' && withTheme;

  return colors[`${color}${isDark ? 'Dark' : 'Light'}`];
}
