import "../styles/globals.css";

import AppContainer from "../containers/App";

function MyApp({ Component, pageProps }) {
  return <AppContainer Component={Component} pageProps={pageProps} />;
}

export default MyApp;
