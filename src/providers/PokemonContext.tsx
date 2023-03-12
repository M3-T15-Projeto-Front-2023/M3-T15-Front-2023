import { createContext, useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { apiFake } from '../services/api';

export interface iPokemon {
  name: string;
  url: string;
  id: number;
  pokemon: iPokemon;
}

export interface iData {
  name: string;
  url: string;
}

export interface iInfos {
  location_area_encounters: string;
  url: string;
  types: { slot: number; type: { name: string; url: string } }[];
  name: string;
  id: number;
  order: number;
  height: number;
  weight: number;
  abilities: { slot: number; ability: { name: string; url: string } }[];
}

export interface IPokemonTeam {
  userId: string;
  pokemonTeam: iInfos;
  id: number;
}

interface iPokemonContext {
  pokemonList: iPokemon[];
  setPokemonList: React.Dispatch<React.SetStateAction<iPokemon[]>>;
  pokemonData: string | iPokemon | iData[] | undefined;
  setPokemonData: React.Dispatch<
    React.SetStateAction<string | iPokemon | iData[] | undefined>
  >;
  pokeId: string;
  setPokeId: React.Dispatch<React.SetStateAction<string>>;
  pokeModal: null | iPokemon;
  setPokeModal: React.Dispatch<React.SetStateAction<null | iPokemon>>;
  pokemonTeam: IPokemonTeam[];
  setPokemonTeam: React.Dispatch<React.SetStateAction<IPokemonTeam[]>>;
  removePokemon: (current: number) => void;
  formatPokemonId: (id: number) => string;
}

interface iPokemonContextProps {
  children: React.ReactNode;
}

export const PokemonContext = createContext({} as iPokemonContext);
const token = localStorage.getItem('@token');
const userId = localStorage.getItem('@userID');

export const formatPokemonId = (id: number) => {
  if (id < 10) return `#00${id}`;
  if (id >= 10 && id < 99) return `#0${id}`;
  return `# ${id}`;
};

export const PokemonProvider = ({ children }: iPokemonContextProps) => {
  const [pokemonList, setPokemonList] = useState<iPokemon[]>([]);
  const [pokemonData, setPokemonData] = useState<
    iData[] | string | undefined | iPokemon
  >([{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }]);
  const [pokeId, setPokeId] = useState('1');
  const [pokeModal, setPokeModal] = useState<null | iPokemon>(null);
  const [pokemonTeam, setPokemonTeam] = useState<IPokemonTeam[]>([]);

  const removePokemon = async (current: number) => {
    try {
      await apiFake.delete(`teams/${current}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    const newItens = pokemonTeam.filter((item) => item.id !== current);
    setPokemonTeam(newItens);
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemonList,
        setPokemonList,
        pokemonData,
        setPokemonData,
        pokeId,
        setPokeId,
        pokeModal,
        setPokeModal,
        pokemonTeam,
        setPokemonTeam,
        removePokemon,
        formatPokemonId,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
