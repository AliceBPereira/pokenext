import Image from "next/image";

import Card from "../components/Card";
import styles from "../styles/Home.module.css";

export default function Home({ pokemons }) {
  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>
          Poke<span>Next</span>
        </h1>
        <Image
          src="/images/pokeball.png"
          width="50"
          height="50"
          alt="PokeNext"
        />
      </div>
      <div className={styles.pokemon_container}>
        {pokemons.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </>
  );
}
