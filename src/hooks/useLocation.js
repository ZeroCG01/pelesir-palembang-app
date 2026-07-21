import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const requestLocation = async () => {
      try {
        setIsLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          if (isMounted) setErrorMsg('Izin akses lokasi ditolak.');
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        if (isMounted) setLocation(currentLocation);
      } catch (error) {
        console.error("Error requesting location: ", error);
        if (isMounted) setErrorMsg('Gagal mendapatkan lokasi saat ini.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    requestLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return { location, errorMsg, isLoading };
};

export default useLocation;
