import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SimplePokemon} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';
import {useEffect} from 'react';
import {getImageColors} from '../helpers/getColorImage';
import {useNavigation} from '@react-navigation/core';

const windowWidth = Dimensions.get('window').width;

interface Props {
  pokemon: SimplePokemon;
}

const PokeCard = ({pokemon}: Props) => {
  const [bgColor, setBgColor] = useState('gray');
  const isMounted = useRef(true);
  const navigation = useNavigation();

  //Extraigo el color dominante de los pokemones para usarlo como background de la card
  useEffect(() => {
    (async () => {
      if (!isMounted) return;
      const [primary] = await getImageColors(pokemon.picture);

      setBgColor(primary!);
    })();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('PokemonScreen' as never, {
          simplePokemon: pokemon as never,
          color: bgColor,
        })
      }>
      <View
        style={{
          ...styles.cardContainer,
          width: windowWidth * 0.4,
          backgroundColor: bgColor,
        }}>
        <View>
          <Text style={styles.pokeName}>
            {pokemon.name} {'\n#' + pokemon.id}
          </Text>
        </View>

        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>
        <FadeInImage
          uri={pokemon.picture}
          style={styles.pokeImage}
          loadingIndicatorColor="white"
        />
      </View>
    </TouchableOpacity>
  );
};

export default PokeCard;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'grey',
    height: 120,
    width: 150,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 6,
  },

  pokeName: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 10,
    left: 10,
  },

  pokebola: {
    width: 100,
    height: 100,
    position: 'absolute',
    right: -20,
    bottom: -20,
  },

  pokeImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
  },

  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
});
