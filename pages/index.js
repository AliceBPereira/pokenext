import HomeContainer from "../containers/Home";

export async function getStaticProps() {
  const maxPokemons = 50;
  const api = `https://pokeapi.co/api/v2/pokemon/`;

  const res = await fetch(`${api}?limit=${maxPokemons}`);

  const data = await res.json();

  data.results.forEach((item, index) => {
    item.id = index + 1;
  });

  return {
    props: {
      pokemons: data.results,
    },
  };
}

export default function Home({ pokemons }) {
  return <HomeContainer pokemons={pokemons} />;
}
