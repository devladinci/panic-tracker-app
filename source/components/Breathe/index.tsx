import React, {useRef} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import {useColor} from '~/styles/theme';
// import Text from '~/components/Text';

const circleWidth = 75;

// Taken from: https://raw.githubusercontent.com/WJimmyCook/react-native-animated-examples/master/App.js
export default function Breathe() {
  const backgroundColor = useColor('green');
  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  Animated.loop(
    Animated.sequence([
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(textOpacity, {
          delay: 100,
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(move, {
          delay: 1000,
          toValue: 0,
          duration: 4000,
          useNativeDriver: true,
        }),
      ]),
    ]),
  ).start();

  const translate = move.interpolate({
    inputRange: [0, 1],
    outputRange: [0, circleWidth / 6],
  });

  const exhale = textOpacity.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Animated.View
          style={[
            {
              width: circleWidth,
              height: circleWidth,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: textOpacity,
            },
            StyleSheet.absoluteFill,
          ]}>
          {/* <Text uppercase={true} bold={true} size="xs">
            Inhale
          </Text> */}
        </Animated.View>
        <Animated.View
          style={[
            {
              width: circleWidth,
              height: circleWidth,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: exhale,
            },
            StyleSheet.absoluteFill,
          ]}>
          {/* <Text uppercase={true} bold={true} size="xs">
            Exhale
          </Text> */}
        </Animated.View>
        {[0, 1, 2, 3, 4, 5, 6, 7].map(item => {
          const rotation = move.interpolate({
            inputRange: [0, 1],
            outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
          });

          return (
            <Animated.View
              key={item}
              style={[
                {
                  opacity: 0.1,
                  backgroundColor,
                  width: circleWidth,
                  height: circleWidth,
                  borderRadius: circleWidth / 2,
                  transform: [
                    {
                      rotateZ: rotation,
                    },
                    {translateX: translate},
                    {translateY: translate},
                  ],
                },
                StyleSheet.absoluteFill,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: circleWidth,
    minHeight: circleWidth + 40,
  },
  wrap: {
    display: 'flex',
    width: circleWidth,
    height: circleWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
