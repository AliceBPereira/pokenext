import Layout from "../components/Layout";

export default function AppContainer({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
