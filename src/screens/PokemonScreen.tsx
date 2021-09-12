import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParams} from '../navigation/StackNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FadeInImage} from '../components/FadeInImage';
import {usePokemon} from '../hooks/usePokemon';
import PokemonDetails from '../components/PokemonDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> {}

const PokemonScreen = ({navigation, route}: Props) => {
  const {simplePokemon, color} = route.params;
  const {top} = useSafeAreaInsets();
  const {pokemon, isLoading} = usePokemon(simplePokemon.id);

  return (
    <View style={{flex: 1}}>
      <View style={{...styles.haderContainer, backgroundColor: color}}>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.8}
          style={{
            ...styles.backButton,
            top: top + 10,
          }}>
          <Icon name="arrow-back-outline" size={40} color="white" />
        </TouchableOpacity>

        <Text style={{...styles.pokemonName, top: top + 45}}>
          {simplePokemon.name + '\n#'}
          {simplePokemon.id}
        </Text>

        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={styles.pokebola}
        />

        {/* Imagen del Pokemon */}
        <FadeInImage
          uri={simplePokemon.picture}
          loadingIndicatorColor="white"
          style={styles.pokemonImage}
        />
      </View>

      {/* Detalles y Loading */}

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={color} size={60} />
        </View>
      ) : (
        <PokemonDetails pokemon={pokemon} />
      )}
    </View>
  );
};

export default PokemonScreen;

const styles = StyleSheet.create({
  haderContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 250,
    borderBottomLeftRadius: 250,
  },
  backButton: {
    position: 'absolute',
    left: 10,
  },

  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    marginHorizontal: 20,
  },

  pokebola: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7,
  },

  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15,
  },

  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
