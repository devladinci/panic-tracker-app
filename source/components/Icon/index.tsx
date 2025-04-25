import * as React from 'react';
import {SvgProps, SvgXml} from 'react-native-svg';
import {useColor, IThemeColors} from '~/styles/theme';

import icons from './icons';

export type IIcon = keyof typeof icons;

interface IProps extends SvgProps {
  icon: IIcon;
  color?: IThemeColors;
}

export default function Icon({icon, color = 'black', ...props}: IProps) {
  return <SvgXml xml={icons[icon]} fill={useColor(color)} {...props} />;
}
