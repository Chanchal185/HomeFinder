import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import HomeCard from '../components/HomeCard';
import { fetchHomes } from '../api/apiService';

const HomeScreen = ({ navigation }) => {
  const { data: homes, isLoading, error } = useQuery({
    queryKey: ['homes'],
    queryFn: fetchHomes
  });
  

  if (isLoading) return <View><Text>Loading...</Text></View>;
  if (error) return <View><Text>Error loading homes</Text></View>;

  return (
    <FlatList
      data={homes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <HomeCard home={item} onPress={() => navigation.navigate('Detail', { home: item })} />}
    />
  );
};

export default HomeScreen;
