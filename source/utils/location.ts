import GetLocation from 'react-native-get-location';
import * as React from 'react';
import {updatePanicAttack} from './api';

export default function useGetLocation(panicAttack?: IPanicAttack | null) {
  React.useEffect(() => {
    async function getLocation() {
      if (!panicAttack) {
        return;
      }

      try {
        const geoLocation = await GetLocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 4000,
        });

        const location = {
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          altitude: geoLocation.altitude,
        };

        panicAttack.location = location;

        updatePanicAttack(panicAttack);
      } catch (error) {
        console.warn('Geolocation error: ', error);
      }
    }

    getLocation();
  }, [panicAttack]);
}
