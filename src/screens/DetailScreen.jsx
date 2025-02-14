import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { getUserLocation, isWithinRange } from "../utils/locationUtils";
import { useQuery } from '@tanstack/react-query';
import { unlockHome } from "../api/apiService";
import { getAddressFromCoords } from '../api/apiService';


const DetailScreen = ({ route }) => {
  const { home } = route.params
  const { data: address, isLoading } = useQuery({
    queryKey: ['address', home.latitude, home.longitude],
    queryFn: () => getAddressFromCoords(home.latitude, home.longitude),
    enabled: !!home.latitude && !!home.longitude
  });

  const [isNearby, setIsNearby] = useState(false);

  useEffect(() => {
    (async () => {
      const userCoords = await getUserLocation();
      if (userCoords) {
        setIsNearby(
          isWithinRange(userCoords, {
            latitude: home.latitude,
            longitude: home.longitude,
          })
        );
      }
    })();
  }, []);

  const handleUnlock = async () => {
    try {
      await unlockHome(home.id);
      Alert.alert("Success", "Home unlocked successfully!");
    } catch (error) {
      Alert.alert("Error", error.message || "Failed to unlock home.");
    }
  };

  return (
    <View style={{ margin: 20 }}>
      <Image
        source={{ uri: home.imagerUrl }}
        style={{ width: "90%", height: 200, marginLeft: 15, marginTop: 10 }}
      />
      <Text style={{color: 'black'}}>{address}</Text>
      <Text style={{color: 'gray'}}>{home.description}</Text>
      <TouchableOpacity onPress={handleUnlock}>
        <Text
          style={{ color: isNearby ? "green" : "red", textAlign: "center" }}
        >
          {isNearby
            ? "You are near home location."
            : "You are far away from home location."}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetailScreen;
