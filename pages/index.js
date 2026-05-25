import HomeContainer, { getStaticProps } from "../containers/Home";

export { getStaticProps };

export default function Home(props) {
  return <HomeContainer {...props} />;
}
