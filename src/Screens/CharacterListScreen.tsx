import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

const CharacterListScreen = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);




  const [error, setError] = useState(null);




  const route = useRoute();
  const navigation = useNavigation();
  const { filter } = route.params;

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {

        const url = filter === 'all'
          ? 'https://rickandmortyapi.com/api/character'
          : `https://rickandmortyapi.com/api/character/?status=${filter}`;
        const response = await axios.get(url);
        setCharacters(response.data.results);





      } catch (err) {
        setError('Failed to load characters');
        console.error('Error fetching characters:', err);
      } finally {
        setLoading(false);
      }




    };

    fetchCharacters();
  }, [filter]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00bcd4" />
        <Text>Loading characters...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const handlePress = (characterId) => {
    navigation.navigate('CharacterDetail', { characterId });
  };






  return (
    <View style={styles.container}>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => handlePress(item.id)}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};







const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 20,
  },
});






export default CharacterListScreen;
