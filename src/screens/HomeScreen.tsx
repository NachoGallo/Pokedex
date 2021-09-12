import React from 'react';
import {Image, Text, FlatList, ActivityIndicator, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {appTheme} from '../theme/appTheme';
import {usePokemonPaginated} from '../hooks/usePokemonPaginated';
import {FadeInImage} from '../components/FadeInImage';
import PokeCard from '../components/PokeCard';

const HomeScreen = () => {
  const {top} = useSafeAreaInsets();
  const {simplePokemonList, isLoading, loadPokemons} = usePokemonPaginated();

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={appTheme.pokebolaBg}
      />

      <View style={{...appTheme.globalMargin, alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
          numColumns={2}
          renderItem={({item}) => <PokeCard pokemon={item} />}
          keyExtractor={pokemon => pokemon.id}
          //Header
          ListHeaderComponent={
            <Text
              style={{
                ...appTheme.title,
                ...appTheme.globalMargin,
                marginTop: top + 20,
              }}>
              Pokédex
            </Text>
          }
          //InfiniteScroll
          onEndReached={() => loadPokemons()}
          onEndReachedThreshold={0.4}
          //Footer con spinner
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} size={30} color="gray" />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export default HomeScreen;
