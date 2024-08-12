import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

const CharacterDetailScreen = () => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const route = useRoute();



  const { characterId } = route.params;

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${characterId}`);
        setCharacter(response.data);


      } catch (err) {
        setError('Failed to load character details');
        console.error('Error fetching character details:', err);
      } finally {



        setLoading(false);
      }
    };

    fetchCharacter();
  }, [characterId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00bcd4" />
        <Text>Loading character details...</Text>
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

  const renderEpisode = ({ item }) => (
    <Text style={styles.episode}>{item}</Text>
  );

  return (
    <View style={styles.container}>
      <Image source={{ uri: character.image }} style={styles.image} />
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.info}>Status: {character.status}</Text>
      <Text style={styles.info}>Species: {character.species}</Text>
      <Text style={styles.info}>Gender: {character.gender}</Text>
      <Text style={styles.info}>Origin: {character.origin.name}</Text>
      <Text style={styles.info}>Episodes:</Text>
      <FlatList
        data={character.episode}
        keyExtractor={(item) => item}
        renderItem={renderEpisode}
        contentContainerStyle={styles.episodeList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  episodeList: {
    paddingBottom: 20,
  },
  episode: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
});

export default CharacterDetailScreen;
