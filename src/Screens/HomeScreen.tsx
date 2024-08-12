import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (


    <ImageBackground
      source={require('../assets/RickyMorty.png')}
      style={styles.background}


    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CharacterList', { filter: 'all' })}



        >
          <Text style={styles.cardText}>All Characters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CharacterList', { filter: 'alive' })}
        >


          <Text style={styles.cardText}>Alive Characters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('CharacterList', { filter: 'dead' })}
        >


          <Text style={styles.cardText}>Dead Characters</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};




const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});





export default HomeScreen;
