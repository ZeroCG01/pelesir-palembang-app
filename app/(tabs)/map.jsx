import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, Dimensions, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { useThemeStore } from '../../src/stores/themeStore';
import { router, useLocalSearchParams } from 'expo-router';
import { useDestinationStore } from '../../src/stores/destinationStore';
import { useFavoriteStore } from '../../src/stores/favoriteStore';
import { useTranslation } from 'react-i18next';
import { useLanguageStore } from '../../src/stores/languageStore';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const { width } = Dimensions.get('window');

export default function MapScreen() {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const { language } = useLanguageStore();
  const isDark = theme === 'dark';

  const { destinations, fetchDestinations } = useDestinationStore();
  
  // Origin and Destination state
  const [selectedOrigin, setSelectedOrigin] = useState(null); // null means "Your Location"
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  const [userLocation, setUserLocation] = useState(null);
  const [transportMode, setTransportMode] = useState('DRIVING');
  const [routeInfo, setRouteInfo] = useState(null);
  
  // 'ROUTING' (default form dari-ke) atau 'SEARCH' (form cari destinasi)
  const [topBarMode, setTopBarMode] = useState('ROUTING');
  // 'ORIGIN' or 'DESTINATION' to know which one we are searching for
  const [searchTarget, setSearchTarget] = useState('DESTINATION');

  const [isNavigating, setIsNavigating] = useState(false);
  const locationSubRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef(null);
  const params = useLocalSearchParams();

  // Helper to open external maps
  const openExternalMaps = () => {
    if (!selectedDestination || !activeOrigin) return;
    const origLat = activeOrigin.latitude;
    const origLng = activeOrigin.longitude;
    const destLat = selectedDestination.latitude;
    const destLng = selectedDestination.longitude;
    const modeQuery = transportMode === 'WALKING' ? 'w' : (transportMode === 'TWO_WHEELER' ? 'b' : 'd');
    
    const url = Platform.select({
      ios: `http://maps.apple.com/?saddr=${origLat},${origLng}&daddr=${destLat},${destLng}&dirflg=${modeQuery}`,
      android: `google.navigation:q=${destLat},${destLng}&mode=${modeQuery}`
    });
    Linking.openURL(url).catch(err => console.error("An error occurred", err));
  };

  const startNavigation = async () => {
    setIsNavigating(true);
    setTopBarMode('HIDDEN');

    if (selectedOrigin) {
      // User is routing from a custom location, NOT their real GPS location.
      // We can't track them physically along this route, so just animate camera to origin.
      mapRef.current?.animateCamera({
        center: { latitude: selectedOrigin.latitude, longitude: selectedOrigin.longitude },
        pitch: 60,
        heading: 0,
        altitude: 500, // iOS
        zoom: 19, // Android
      }, { duration: 1000 });
    } else {
      // Follow real user location
      locationSubRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (loc) => {
          const newCoords = {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          };
          setUserLocation(newCoords);
          
          mapRef.current?.animateCamera({
            center: newCoords,
            pitch: 60,
            heading: loc.coords.heading || 0,
            altitude: 500, // iOS
            zoom: 19, // Android
          }, { duration: 1000 });
        }
      );
    }
  };

  const stopNavigation = () => {
    setIsNavigating(false);
    setTopBarMode('ROUTING');
    if (locationSubRef.current) {
      locationSubRef.current.remove();
      locationSubRef.current = null;
    }
    // Zoom out to show route again
    const centerPoint = selectedOrigin || userLocation;
    if (centerPoint) {
      mapRef.current?.animateCamera({
        center: { latitude: centerPoint.latitude, longitude: centerPoint.longitude },
        pitch: 0,
        heading: 0,
        altitude: 5000,
        zoom: 14,
      }, { duration: 1000 });
    }
  };

  useEffect(() => {
    if (params?.destination && destinations.length > 0) {
      const destName = params.destination.toString();
      const matchedDest = destinations.find(d => d.name === destName);
      if (matchedDest) {
        setSelectedDestination(matchedDest);
        setTopBarMode('ROUTING');
      }
    }
  }, [params?.destination, destinations]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    if (destinations.length === 0) {
      fetchDestinations();
    }
  }, [destinations.length]);

  const initialRegion = {
    latitude: -2.9909,
    longitude: 104.7566,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const filteredDestinations = destinations.filter(dest => 
    dest.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectDestination = (targetResult) => {
    mapRef.current?.animateToRegion({
      latitude: targetResult.latitude,
      longitude: targetResult.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    }, 1000);
    
    if (searchTarget === 'ORIGIN') {
      setSelectedOrigin(targetResult);
    } else {
      setSelectedDestination(targetResult);
    }
    
    setTopBarMode('ROUTING');
    setSearchQuery('');
  };

  const handleSearchSubmit = async () => {
    if (!searchQuery.trim()) return;

    if (searchQuery.toLowerCase() === 'my location' || searchQuery.toLowerCase() === 'lokasi anda') {
      if (searchTarget === 'ORIGIN') setSelectedOrigin(null);
      setTopBarMode('ROUTING');
      setSearchQuery('');
      return;
    }

    let targetResult = null;

    // Google Places API (biased to Palembang region)
    try {
      const query = encodeURIComponent(searchQuery);
      // location = Palembang, radius = 50km
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=-2.9909,104.7566&radius=50000&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.status === 'OK' && data.results && data.results.length > 0) {
        const place = data.results[0];
        targetResult = {
          id: place.place_id,
          name: place.name,
          latitude: place.geometry.location.lat,
          longitude: place.geometry.location.lng,
          address: place.formatted_address,
        };
      } else if (data.status === 'REQUEST_DENIED') {
        console.error("Google Places API Denied:", data.error_message);
        Alert.alert("API Error", `Akses Google Places ditolak. Pastikan 'Places API' sudah diaktifkan di Google Cloud Console. Error: ${data.error_message}`);
        return;
      } else if (data.status !== 'ZERO_RESULTS') {
        console.error("Google Places API Error:", data.status, data.error_message);
      }
    } catch (error) {
      console.error("Google Places Network Error:", error);
    }

    if (targetResult) {
      handleSelectDestination(targetResult);
    } else {
      Alert.alert(t('error') || 'Error', language === 'en' ? 'Location not found.' : 'Lokasi tidak ditemukan.');
    }
  };

  const handleCalloutPress = (destId) => {
    setTimeout(() => {
      router.push(`/destination/${destId}`);
    }, 0);
  };

  // Route directly from callout instead of going to detail page
  const handleRouteFromCallout = (dest) => {
    setSelectedDestination(dest);
    setTopBarMode('ROUTING');
  };

  const getDescription = (dest) => {
    if (language === 'en') {
      return dest.description_en || dest.description_id || dest.description || t('map_default_desc');
    }
    return dest.description_id || dest.description || t('map_default_desc');
  };

  const activeOrigin = selectedOrigin || userLocation;

  return (
    <View style={s.flex1}>
      {/* Map View */}
      <MapView 
        ref={mapRef}
        style={s.flex1}
        initialRegion={initialRegion}
        userInterfaceStyle={isDark ? "dark" : "light"}
      >


        {/* User Location Marker */}
        {userLocation && (
          <Marker coordinate={userLocation} title={t('map_your_location')}>
            <View style={{ width: 16, height: 16, backgroundColor: '#3B82F6', borderRadius: 8, borderWidth: 2, borderColor: '#FFFFFF', elevation: 4 }} />
          </Marker>
        )}

        {/* Origin Custom Marker if different from userLocation */}
        {selectedOrigin && (
          <Marker coordinate={{ latitude: selectedOrigin.latitude, longitude: selectedOrigin.longitude }} title="Origin">
            <View style={{ width: 16, height: 16, backgroundColor: '#10B981', borderRadius: 8, borderWidth: 2, borderColor: '#FFFFFF', elevation: 4 }} />
          </Marker>
        )}

        {/* Route / Directions */}
        {selectedDestination && activeOrigin && (
          <MapViewDirections
            origin={{
              latitude: activeOrigin.latitude,
              longitude: activeOrigin.longitude
            }}
            destination={{
              latitude: selectedDestination.latitude,
              longitude: selectedDestination.longitude
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#FD6B1C"
            mode={transportMode}
            onReady={(result) => {
              setRouteInfo({
                distance: result.distance,
                duration: result.duration,
              });
              
              // Only fit coordinates if we are NOT navigating
              if (!isNavigating) {
                mapRef.current?.fitToCoordinates(result.coordinates, {
                  edgePadding: { right: 50, bottom: 300, left: 50, top: 200 },
                  animated: true,
                });
              }
            }}
            onError={(errorMessage) => {
              console.log('Directions error:', errorMessage);
              Alert.alert(
                t('error') || 'Error', 
                language === 'en' ? 'Google Maps API limit reached. Open external Maps app?' : 'Limit API Google Maps tercapai. Buka rute di aplikasi Maps bawaan?',
                [
                  { text: 'Batal', style: 'cancel' },
                  { text: 'Buka Maps', onPress: () => openExternalMaps() }
                ]
              );
            }}
          />
        )}
      </MapView>

      {/* TOP FLOATING UI */}
      {topBarMode === 'SEARCH' ? (
        <View style={[s.searchBarContainer, { flexDirection: 'column', alignItems: 'stretch' }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, width: '100%' }}>
            <View style={[s.searchInputWrapper, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF', borderColor: isDark ? '#333' : '#E5E7EB' }]}>
              <MaterialIcons name={searchTarget === 'ORIGIN' ? 'my-location' : 'search'} size={24} color={isDark ? '#AAAAAA' : '#666666'} />
              <TextInput 
                style={[s.searchInput, { color: isDark ? '#FFFFFF' : '#1A1A1A', fontFamily: 'Montserrat_400Regular' }]}
                placeholder={searchTarget === 'ORIGIN' ? (language === 'en' ? 'Search origin...' : 'Cari lokasi asal...') : t('map_search_placeholder')}
                placeholderTextColor={isDark ? '#666666' : '#AAAAAA'}
                value={searchQuery}
                onChangeText={setSearchQuery}
                returnKeyType="search"
                onSubmitEditing={handleSearchSubmit}
                autoFocus={searchTarget === 'ORIGIN'} // Auto-focus only if specifically targeting origin
              />
              {/* Button to quickly select 'Your Location' when picking origin */}
              {searchTarget === 'ORIGIN' && (
                <TouchableOpacity onPress={() => { setSelectedOrigin(null); setTopBarMode('ROUTING'); }}>
                  <MaterialIcons name="gps-fixed" size={24} color="#3B82F6" />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity 
              style={s.iconButtonOrange}
              onPress={() => {
                // Only go to ROUTING if there's an active destination, else clear it out
                if (selectedDestination) {
                  setTopBarMode('ROUTING');
                } else {
                  setSearchQuery('');
                  setTopBarMode('ROUTING');
                }
              }}
            >
              <MaterialIcons name={selectedDestination ? "directions" : "close"} size={24} color="white" />
            </TouchableOpacity>
          </View>
          
          {/* Autocomplete Dropdown */}
          {searchQuery.trim().length > 0 && (
            <View style={[s.dropdownContainer, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF', borderColor: isDark ? '#333' : '#E5E7EB' }]}>
              {filteredDestinations.slice(0, 5).map(dest => (
                <TouchableOpacity 
                  key={dest.id} 
                  style={[s.dropdownItem, { borderBottomColor: isDark ? '#333' : '#E5E7EB' }]}
                  onPress={() => handleSelectDestination(dest)}
                >
                  <MaterialIcons name="place" size={20} color={isDark ? '#AAAAAA' : '#666666'} />
                  <Text style={[s.dropdownItemText, { color: isDark ? '#FFFFFF' : '#1A1A1A' }]} numberOfLines={1}>{dest.name}</Text>
                </TouchableOpacity>
              ))}
              
              {/* Google Search Item */}
              <TouchableOpacity 
                style={s.dropdownItem}
                onPress={() => handleSearchSubmit()}
              >
                <MaterialIcons name="search" size={20} color="#3B82F6" />
                <Text style={[s.dropdownItemText, { color: '#3B82F6', fontFamily: 'Montserrat_600SemiBold' }]} numberOfLines={1}>
                  Cari "{searchQuery}" di Google Maps
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : topBarMode === 'ROUTING' ? (
        <View style={[s.routingCard, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF', borderColor: isDark ? '#333' : '#E5E7EB' }]}>
          <View style={s.routingRow}>
            {/* Form Input */}
            <View style={s.routingInputs}>
              
              {/* Dotted Line */}
              <View style={[s.dottedLine, { borderLeftColor: isDark ? '#4B5563' : '#D1D5DB' }]} />
              
              {/* Origin */}
              <View style={s.inputRow}>
                <View style={s.iconCol}>
                  <View style={[s.locationDot, { borderColor: isDark ? '#9CA3AF' : '#6B7280' }]} />
                </View>
                <TouchableOpacity 
                  style={[s.inputField, { backgroundColor: isDark ? '#1F2937' : '#F9FAFB', borderColor: isDark ? '#374151' : '#D1D5DB' }]}
                  onPress={() => {
                    setSearchTarget('ORIGIN');
                    setTopBarMode('SEARCH');
                  }}
                >
                  <Text style={[s.inputText, { color: selectedOrigin ? (isDark ? '#FFFFFF' : '#000000') : (isDark ? '#D1D5DB' : '#374151') }]} numberOfLines={1}>
                    {selectedOrigin ? selectedOrigin.name : t('map_your_location')}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Destination */}
              <View style={[s.inputRow, { marginTop: 12 }]}>
                <View style={s.iconCol}>
                  <MaterialIcons name="location-on" size={16} color="#EF4444" />
                </View>
                <TouchableOpacity 
                  style={[s.inputField, { backgroundColor: isDark ? '#1F2937' : '#FFFFFF', borderColor: isDark ? '#374151' : '#D1D5DB' }]}
                  onPress={() => {
                    setSearchTarget('DESTINATION');
                    setTopBarMode('SEARCH');
                  }}
                >
                  <Text style={[s.inputText, { color: selectedDestination ? (isDark ? '#FFFFFF' : '#000000') : '#9CA3AF' }]} numberOfLines={1}>
                    {selectedDestination ? selectedDestination.name : t('map_select_destination')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Action Buttons (Swap & Close) */}
            <View style={{ gap: 8, width: 46 }}>
              <TouchableOpacity 
                style={[s.actionButton, { flex: 1, backgroundColor: '#3B82F6' }]}
                onPress={() => {
                  const tempOrigin = selectedOrigin;
                  setSelectedOrigin(selectedDestination);
                  setSelectedDestination(tempOrigin);
                }}
              >
                <MaterialIcons name="swap-vert" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[s.actionButton, { flex: 1, backgroundColor: '#EF4444' }]}
                onPress={() => {
                  setSelectedOrigin(null);
                  setSelectedDestination(null);
                  setRouteInfo(null);
                  setSearchTarget('DESTINATION');
                }}
              >
                <MaterialIcons name="close" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Transport & Route Info */}
          {selectedDestination && (
            <View style={[s.transportSection, { borderTopColor: isDark ? '#374151' : '#E5E7EB' }]}>
              <View style={[s.transportPicker, { backgroundColor: isDark ? '#1F2937' : '#F3F4F6' }]}>
                <TouchableOpacity 
                  style={[s.transportBtn, transportMode === 'DRIVING' && (isDark ? s.transportBtnActiveDark : s.transportBtnActive)]}
                  onPress={() => setTransportMode('DRIVING')}
                >
                  <MaterialIcons name="directions-car" size={24} color={transportMode === 'DRIVING' ? '#FD6B1C' : '#666666'} />
                  <Text style={[s.transportLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}>{t('map_car')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[s.transportBtn, transportMode === 'TWO_WHEELER' && (isDark ? s.transportBtnActiveDark : s.transportBtnActive)]}
                  onPress={() => setTransportMode('TWO_WHEELER')}
                >
                  <MaterialIcons name="two-wheeler" size={24} color={transportMode === 'TWO_WHEELER' ? '#FD6B1C' : '#666666'} />
                  <Text style={[s.transportLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}>{t('map_motorcycle')}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[s.transportBtn, transportMode === 'WALKING' && (isDark ? s.transportBtnActiveDark : s.transportBtnActive)]}
                  onPress={() => setTransportMode('WALKING')}
                >
                  <MaterialIcons name="directions-walk" size={24} color={transportMode === 'WALKING' ? '#FD6B1C' : '#666666'} />
                  <Text style={[s.transportLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}>{t('map_walk')}</Text>
                </TouchableOpacity>
              </View>
              
              {routeInfo ? (
                <View style={s.routeInfoRow}>
                  <View>
                    <Text style={s.routeDuration}>
                      {Math.round(routeInfo.duration)} {t('map_minutes')}
                    </Text>
                    <Text style={[s.routeDistance, { color: isDark ? '#9CA3AF' : '#6B7280' }]}>
                      {routeInfo.distance.toFixed(1)} km
                    </Text>
                  </View>
                  <TouchableOpacity 
                    style={s.navButton}
                    onPress={startNavigation}
                  >
                    <Text style={s.navButtonText}>{t('map_start_nav')}</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={s.calculatingText}>{t('map_calculating')}</Text>
              )}
            </View>
          )}
        </View>
      ) : null}

      {/* IN-APP NAVIGATION UI */}
      {isNavigating && (
        <View style={s.navigationUiContainer}>
          <View style={[s.navTopBar, { backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <MaterialIcons name="navigation" size={24} color="#FD6B1C" style={{ marginRight: 12 }} />
              <View style={{ flex: 1, marginRight: 8 }}>
                <Text style={[s.navTopTitle, { color: isDark ? '#FFFFFF' : '#111827' }]} numberOfLines={1}>
                  {language === 'en' ? 'Navigating to' : 'Menuju ke'} {selectedDestination?.name}
                </Text>
                {routeInfo && (
                  <Text style={s.navTopSub}>
                    {Math.round(routeInfo.duration)} {t('map_minutes')} • {routeInfo.distance.toFixed(1)} km
                  </Text>
                )}
              </View>
            </View>
            
            <TouchableOpacity 
              style={{ backgroundColor: '#EF4444', padding: 10, borderRadius: 12, elevation: 2 }}
              onPress={stopNavigation}
            >
              <MaterialIcons name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  flex1: { flex: 1, backgroundColor: '#FFFFFF' },

  // Search bar
  searchBarContainer: { position: 'absolute', top: 48, left: 16, right: 16, flexDirection: 'row', alignItems: 'center', gap: 8 },
  searchInputWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 8, borderWidth: 1, elevation: 2 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14 },
  iconButtonOrange: { backgroundColor: '#FD6B1C', padding: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center', elevation: 2 },
  
  // Dropdown
  dropdownContainer: { marginTop: 8, borderRadius: 8, borderWidth: 1, elevation: 4, overflow: 'hidden' },
  dropdownItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16, borderBottomWidth: 1 },
  dropdownItemText: { fontFamily: 'Montserrat_400Regular', fontSize: 14, marginLeft: 12, flex: 1 },

  // Routing card
  routingCard: { position: 'absolute', top: 48, left: 16, right: 16, borderRadius: 16, borderWidth: 1, padding: 16, elevation: 4 },
  routingRow: { flexDirection: 'row' },
  routingInputs: { flex: 1, marginRight: 12, justifyContent: 'center', position: 'relative' },
  dottedLine: { position: 'absolute', left: 11, top: 24, bottom: 24, width: 0, borderLeftWidth: 2, borderStyle: 'dotted' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  iconCol: { width: 24, alignItems: 'center' },
  locationDot: { width: 12, height: 12, borderRadius: 6, borderWidth: 2 },
  inputField: { flex: 1, paddingHorizontal: 12, paddingVertical: 10, borderRadius: 8, borderWidth: 1 },
  inputText: { fontFamily: 'Montserrat_400Regular', fontSize: 13 },
  actionButton: { borderRadius: 12, alignItems: 'center', justifyContent: 'center', elevation: 2 },

  // Transport
  transportSection: { marginTop: 16, paddingTop: 16, borderTopWidth: 1 },
  transportPicker: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16, borderRadius: 8, padding: 4 },
  transportBtn: { flex: 1, alignItems: 'center', paddingVertical: 8, borderRadius: 6 },
  transportBtnActive: { backgroundColor: '#FFFFFF', elevation: 1 },
  transportBtnActiveDark: { backgroundColor: '#374151', elevation: 1 },
  transportLabel: { fontFamily: 'Montserrat_400Regular', fontSize: 10, marginTop: 4 },

  // Route info
  routeInfoRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8 },
  routeDuration: { fontFamily: 'Montserrat_700Bold', fontSize: 18, color: '#FD6B1C' },
  routeDistance: { fontFamily: 'Montserrat_400Regular', fontSize: 12 },
  navButton: { backgroundColor: '#FD6B1C', paddingHorizontal: 24, paddingVertical: 8, borderRadius: 999 },
  navButtonText: { fontFamily: 'Montserrat_700Bold', color: '#FFFFFF', fontSize: 14 },
  calculatingText: { fontFamily: 'Montserrat_400Regular', textAlign: 'center', color: '#6B7280' },

  // Navigation UI
  navigationUiContainer: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, pointerEvents: 'box-none', justifyContent: 'space-between', paddingBottom: 40, paddingTop: 60 },
  navTopBar: { marginHorizontal: 16, padding: 16, borderRadius: 12, elevation: 4, flexDirection: 'row', alignItems: 'center' },
  navTopTitle: { fontFamily: 'Montserrat_700Bold', fontSize: 16 },
  navTopSub: { fontFamily: 'Montserrat_400Regular', fontSize: 14, color: '#6B7280', marginTop: 4 },
  stopNavButton: { alignSelf: 'center', backgroundColor: '#EF4444', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 999, elevation: 6 },
  stopNavText: { fontFamily: 'Montserrat_700Bold', color: '#FFFFFF', fontSize: 16 },
});
