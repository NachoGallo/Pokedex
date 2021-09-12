import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {PokemonFull} from '../interfaces/pokemonInterfaces';
import {FadeInImage} from './FadeInImage';

interface Props {
  pokemon: PokemonFull;
}

const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        ...StyleSheet.absoluteFillObject,
      }}>
      {/* Types */}
      <View style={{...styles.container, marginTop: 370}}>
        <Text style={styles.title}>Types</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(({type}) => (
            <Text
              key={type.name}
              style={{...styles.regularText, marginRight: 10}}>
              {type.name}
            </Text>
          ))}
        </View>

        {/* Peso */}
        <Text style={styles.title}>Peso</Text>
        <Text style={styles.regularText}>{pokemon.weight}kg</Text>
      </View>

      <View style={{...styles.container, marginTop: 20}}>
        <Text style={styles.title}>Sprites</Text>
      </View>

      <ScrollView horizontal={true}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprites}
        />

        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprites}
        />

        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprites}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprites}
        />
      </ScrollView>

      {/* Habilidades */}
      <View style={styles.container}>
        <Text style={styles.title}>Habilidades Base</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.abilities.map(({ability}) => (
            <Text
              key={ability.name}
              style={{...styles.regularText, marginRight: 10}}>
              {ability.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Movimientos */}
      <View style={styles.container}>
        <Text style={styles.title}>Movimientos</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {pokemon.moves.map(({move}) => (
            <Text
              key={move.name}
              style={{...styles.regularText, marginRight: 10}}>
              {move.name}
            </Text>
          ))}
        </View>
      </View>

      {/* Stats */}
      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
        <View>
          {pokemon.stats.map((stat, i) => (
            <View style={{flexDirection: 'row'}} key={stat.stat.name + i}>
              <Text
                key={stat.base_stat}
                style={{
                  ...styles.regularText,
                  marginRight: 10,
                  width: 150,
                  fontWeight: 'bold',
                }}>
                {stat.stat.name}
              </Text>
              <Text style={{...styles.regularText, marginRight: 10}}>
                {stat.base_stat}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{height: 50}}></View>
    </ScrollView>
  );
};

export default PokemonDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },

  regularText: {
    fontSize: 20,
  },

  basicSprites: {
    width: 130,
    height: 130,
  },
});
