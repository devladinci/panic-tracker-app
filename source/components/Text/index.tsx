import * as React from 'react';
import {StyleSheet, Text as RNText, TextStyle} from 'react-native';
import {ISpacingProps, spacingStyle} from '~/styles/spacing';
import {IThemeColors, useColor} from '~/styles/theme';
import variables from '~/styles/variables';

type IFontSize = keyof typeof variables.font;

interface IProps extends ISpacingProps {
  bold?: boolean;
  center?: boolean;
  children: any;
  color?: IThemeColors;
  numberOfLines?: number;
  size?: IFontSize;
  style?: TextStyle | TextStyle[];
  testID?: string;
  uppercase?: boolean;
  withTheme?: boolean;
}

export default function Text({
  bold,
  center,
  children,
  color,
  numberOfLines,
  size = 'm',
  style,
  testID,
  uppercase,
  withTheme = true,
  ...props
}: IProps) {
  const themedColor = useColor(color || 'black', withTheme);

  return (
    <RNText
      style={[
        styles[size],
        bold ? styles.bold : styles.normal,
        uppercase ? styles.uppercase : {},
        center ? styles.center : {},
        spacingStyle(props),
        {color: themedColor},
        style,
      ]}
      testID={testID}
      numberOfLines={numberOfLines}>
      {children}
    </RNText>
  );
}

export const styles = StyleSheet.create({
  bold: {
    fontWeight: '700',
  },
  normal: {
    fontWeight: '400',
  },
  uppercase: {
    textTransform: 'uppercase',
  },
  center: {
    textAlign: 'center',
  },
  xxs: {
    fontSize: variables.font.xxs[0],
    lineHeight: variables.font.xxs[1],
  },
  xs: {
    fontSize: variables.font.xs[0],
    lineHeight: variables.font.xs[1],
  },
  s: {
    fontSize: variables.font.s[0],
    lineHeight: variables.font.s[1],
  },
  m: {
    fontSize: variables.font.m[0],
    lineHeight: variables.font.m[1],
  },
  l: {
    fontSize: variables.font.l[0],
    lineHeight: variables.font.l[1],
  },
  xl: {
    fontSize: variables.font.xl[0],
    lineHeight: variables.font.xl[1],
  },
  xxl: {
    fontSize: variables.font.xxl[0],
    lineHeight: variables.font.xxl[1],
  },
  xxxl: {
    fontSize: variables.font.xxxl[0],
    lineHeight: variables.font.xxxl[1],
  },
});
