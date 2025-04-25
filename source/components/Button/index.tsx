import * as React from 'react';
import {Pressable, ViewStyle, StyleSheet, View} from 'react-native';
import {createAnimatableComponent} from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {Omit} from 'utility-types';
import Icon, {IIcon} from '~/components/Icon';
import Text from '~/components/Text';
import {IFontSize} from '~/styles/fonts';
import {ISpacingProps, spacingStyle} from '~/styles/spacing';
import {IThemeColors, useColor} from '~/styles/theme';
import variables from '~/styles/variables';

const AnimatedPressable = createAnimatableComponent(Pressable);

interface IProps extends ISpacingProps {
  style?: ViewStyle | ViewStyle[];
  onPress: () => void;
  onLongPress?: () => void;
  label: React.ReactNode | string;
  disabled?: boolean;
  color?: IThemeColors;
  size?: IFontSize;
}

interface IState {
  isLoading: boolean;
}

export default class Button extends React.Component<IProps, IState> {
  static Solid: React.FC<ISolidProps>;
  static Icon: React.FC<IIconProps>;
  static Gradient: React.FC<IGradientProps>;

  touchableRef: any;
  handleTouchableRef = (ref: any) => (this.touchableRef = ref);

  state = {
    isLoading: false,
  };

  isStillMounted = false;

  componentDidMount() {
    this.isStillMounted = true;
  }

  componentWillUnmount() {
    this.isStillMounted = false;
  }

  render() {
    const opacity = this.props.disabled ? 0.3 : 1;

    return (
      <AnimatedPressable
        ref={this.handleTouchableRef}
        useNativeDriver={true}
        disabled={this.props.disabled || false}
        onPress={this.handlePress}
        onLongPress={this.props.onLongPress}
        style={[
          this.props.style,
          spacingStyle(this.props),
          {padding: variables.spacing.xs, opacity},
        ]}>
        {typeof this.props.label === 'string' ? (
          <Text
            color={this.props.color || 'black'}
            bold={true}
            center={true}
            size={this.props.size || 'm'}>
            {this.props.label}
          </Text>
        ) : (
          this.props.label
        )}
      </AnimatedPressable>
    );
  }

  handlePress = () => {
    this.touchableRef.pulse(500);

    if (this.state.isLoading) {
      return;
    }

    this.setState({isLoading: true});

    this.props.onPress();

    if (this.isStillMounted) {
      this.setState({isLoading: false});
    }
  };
}

type IVariantProps = Omit<IProps, 'label' | 'size'>;

type ISolidProps = IVariantProps & {
  color?: IThemeColors;
  textColor?: IThemeColors;
  label: string | React.ReactNode;
};

Button.Solid = ({
  label,
  color = 'white',
  textColor = 'black',
  ...props
}: ISolidProps) => {
  /* eslint-disable react-hooks/rules-of-hooks */
  const backgroundColor = useColor(color);
  /* eslint-enable react-hooks/rules-of-hooks */

  return buildButton(
    props,
    <Text size="m" bold={true} color={textColor} uppercase={false}>
      {label}
    </Text>,
    {...styles.default, backgroundColor},
  );
};

type IIconProps = IVariantProps & {
  icon: IIcon;
  size: number;
  color?: IThemeColors;
  withTheme?: boolean;
};

Button.Icon = ({
  icon,
  size,
  color = 'black',
  disabled,
  ...props
}: IIconProps) => {
  return buildButton(
    props,
    <Icon
      icon={icon}
      width={size}
      height={size}
      color={color}
      opacity={disabled ? 0.3 : 1}
    />,
  );
};

type IGradientProps = IVariantProps & {
  label: string;
};

Button.Gradient = ({label, ...props}: IGradientProps) => {
  return buildButton(
    props,
    <View style={styles.gradientWrap}>
      <LinearGradient
        style={styles.gradient}
        colors={variables.gradients.button}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}>
        <Text color="white" bold={true} size="l">
          {label}
        </Text>
      </LinearGradient>
    </View>,
  );
};

function buildButton(
  props: IVariantProps,
  label: React.ReactNode,
  extraStyle?: ViewStyle,
) {
  return (
    <Button
      {...props}
      style={props.style ? {...extraStyle, ...props.style} : extraStyle}
      label={label}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    paddingHorizontal: variables.spacing.l,
    paddingVertical: variables.spacing.s,
    borderRadius: variables.buttonRadius,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    ...variables.shadow,
  },
  gradientWrap: {
    borderRadius: variables.buttonRadius,
    ...variables.shadow,
  },
  gradient: {
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: variables.spacing.xl,
    borderRadius: variables.buttonRadius,
  },
});
