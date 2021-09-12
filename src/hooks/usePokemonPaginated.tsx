import {useEffect, useRef, useState} from 'react';
import {pokemonApi} from '../api/pokemonApi';
import {
  Result,
  SimplePokemon,
  PokemonPaginatedResponse,
} from '../interfaces/pokemonInterfaces';

export const usePokemonPaginated = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  );

  const nextPageUrl = useRef(
    'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20',
  );

  const loadPokemons = async () => {
    const resp = await pokemonApi.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    );

    nextPageUrl.current = resp.data.next;

    mapPokemonList(resp.data.results);
    setIsLoading(false);
  };

  const mapPokemonList = (pokemonList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemonList.map(({url, name}) => {
      const urlParts = url.split('/');
      const id = urlParts[urlParts.length - 2];
      //Capitalizo la primer letra
      name = name.charAt(0).toUpperCase() + name.slice(1);

      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

      return {id, picture, name};
    });

    setSimplePokemonList([...simplePokemonList, ...newPokemonList]);
  };

  useEffect(() => {
    loadPokemons();
  }, []);

  return {simplePokemonList, isLoading, loadPokemons};
};
