import { ApolloProvider } from '@apollo/client'; //With this apollo will be available in all the components
import Client from '../config/apollo';

const MyApp = ({Component, pageProps}) => {
  return (
    <ApolloProvider client={Client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default MyApp;