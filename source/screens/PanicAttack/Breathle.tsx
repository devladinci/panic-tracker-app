import React, {useRef} from 'react';
import {StyleSheet, Text, View, Dimensions, Animated} from 'react-native';
import {useColor} from '~/styles/theme';

const {width} = Dimensions.get('window');
const circleWidth = width / 2 - 50;

// Taken from: https://raw.githubusercontent.com/WJimmyCook/react-native-animated-examples/master/App.js
export default function Breathle() {
  const backgroundColor = useColor('lightGreen');
  const move = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  Animated.loop(
    Animated.sequence([
      Animated.parallel([
        Animated.timing(textOpacity, {
          toValue: 1.2,
          duration: 1000,
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
          delay: 300,
          toValue: 1,
          duration: 1000,
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
            StyleSheet.absoluteFill,
            {
              width: circleWidth,
              height: circleWidth,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: textOpacity,
            },
          ]}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Inhale
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              width: circleWidth,
              height: circleWidth,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: exhale,
            },
          ]}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Exhale
          </Text>
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
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: circleWidth + 75,
  },
  wrap: {
    display: 'flex',
    width: circleWidth,
    height: circleWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
