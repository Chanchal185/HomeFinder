import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAddressFromCoords } from '../api/apiService';

const HomeCard = ({ home, onPress }) => {
  const { data: address, isLoading } = useQuery({
    queryKey: ['address', home.latitude, home.longitude], 
    queryFn: () => getAddressFromCoords(home.latitude, home.longitude),
    enabled: !!home.latitude && !!home.longitude 
  });

  return (
    <TouchableOpacity onPress={() => onPress(home)} style={styles.card}>
      <Image source={{ uri: home.imagerUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.address}>{isLoading ? "Fetching address..." : address || "Address not available"}</Text>
        <Text>{home.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { padding: 10, backgroundColor: '#fff', margin: 20, borderRadius: 5 },
  image: { width: '90%', height: 200, borderRadius: 5, marginLeft: 15, marginTop: 10 },
  details: { marginLeft: 10, justifyContent: 'center' },
  address: { fontWeight: 'bold', fontSize: 16, color: 'red' }
});

export default HomeCard;
