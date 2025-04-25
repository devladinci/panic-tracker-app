import * as React from 'react';
import {FlexStyle, RegisteredStyle, View, ViewStyle} from 'react-native';
import {ISpacingProps, spacingStyle} from '~/styles/spacing';

export interface IProps extends ISpacingProps {
  style?: ViewStyle | ViewStyle[] | RegisteredStyle<any>;
  children: React.ReactNode;
  direction?: FlexStyle['flexDirection'];
  justify?: FlexStyle['justifyContent'];
  align?: FlexStyle['alignItems'];
  wrap?: FlexStyle['flexWrap'];
  flex?: FlexStyle['flex'];
  height?: FlexStyle['height'];
  width?: FlexStyle['width'];
  grow?: FlexStyle['flexGrow'];
  ignoreTouches?: boolean;
}

// RN Flex info: https://facebook.github.io/react-native/docs/flexbox
export default function Flex({
  style,
  children,
  direction,
  justify,
  align,
  wrap,
  flex,
  height,
  width,
  grow,
  ignoreTouches = false,
  ...props
}: IProps) {
  return (
    <View
      style={[
        spacingStyle(props, {
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          flexWrap: wrap,
          flex,
          height,
          width,
          flexGrow: grow,
        }),
        style,
      ]}
      pointerEvents={ignoreTouches ? 'box-none' : 'auto'}>
      {children}
    </View>
  );
}

Flex.Row = (props: IProps) => <Flex direction="row" {...props} />;
Flex.Column = (props: IProps) => <Flex direction="column" {...props} />;
