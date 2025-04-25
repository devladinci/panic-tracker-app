import * as React from 'react';
import {FlexStyle, StyleSheet, useColorScheme} from 'react-native';
import {useColor} from '~/styles/theme';
import Flex, {IProps as IFlexProps} from '~/components/Flex';
import variables from '~/styles/variables';

interface IProps extends IFlexProps {
  children: React.ReactNode;
  direction?: FlexStyle['flexDirection'];
}

export default function Card({children, direction, ...props}: IProps) {
  const backgroundColor = useColor('white');
  const isDark = useColorScheme() === 'dark';
  const border = isDark ? variables.borderDark : variables.borderLight;

  return (
    <Flex
      style={[styles.container, {backgroundColor, ...border}]}
      direction={direction}
      padding="m"
      width={'100%'}
      {...props}>
      {children}
    </Flex>
  );
}

Card.Row = (props: IProps) => <Card direction="row" {...props} />;
Card.Column = (props: IProps) => <Card direction="column" {...props} />;

const styles = StyleSheet.create({
  container: {
    borderRadius: variables.radius,
    ...variables.shadow,
  },
});
