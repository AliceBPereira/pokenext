import PokemonContainer, {
  getStaticPaths,
  getStaticProps,
} from "../../containers/Pokemon";

export { getStaticPaths, getStaticProps };

export default function Pokemon(props) {
  return <PokemonContainer {...props} />;
}
