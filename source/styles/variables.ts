import {StyleSheet} from 'react-native';

export default {
  radius: 8,
  buttonRadius: 25,

  twitter: '#00aced',
  facebook: '#4267b2',
  google: '#4285F4',

  gradients: {
    light: ['#FFFFFF', '#F5F5F5'],
    dark: ['#252525', '#151515'],
    button: ['#5FC0CA', '#80C8BC'],
  },

  spacing: {
    xs: 5,
    s: 10,
    m: 15,
    l: 20,
    xl: 30,
    xxl: 40,
  },

  font: {
    xxs: [11, 16],
    xs: [12, 18],
    s: [14, 22],
    m: [16, 25],
    l: [20, 30],
    xl: [22, 35],
    xxl: [28, 40],
    xxxl: [42, 50],
  },

  layout: {
    buttonHeight: 44,
  },

  shadow: {
    shadowColor: 'rgba(0, 0, 0, 0.7)',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {width: 2, height: 4},
    elevation: 8,
  },

  border: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E7E7E7',
  },

  borderLight: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#E7E7E7',
  },

  borderDark: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#2e2e2e',
  },
};
