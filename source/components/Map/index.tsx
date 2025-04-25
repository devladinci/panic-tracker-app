import * as React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import variables from '~/styles/variables';

interface IProps {
  location: ILocation | null;
  height?: number;
}

export default function Map({location, height = 120}: IProps) {
  const isDark = useColorScheme() === 'dark';
  if (!location) {
    return null;
  }

  return (
    <MapView
      userInterfaceStyle={isDark ? 'dark' : 'light'}
      scrollEnabled={false}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 1,
        longitudeDelta: 1,
      }}
      style={[styles.map, {height}]}
      minZoomLevel={10}
      maxZoomLevel={100}>
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    borderRadius: variables.radius,
  },
});
