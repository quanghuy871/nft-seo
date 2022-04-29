import '../assets/scss/global.scss';
import {Provider} from 'react-redux';
import store from '../store/reducer';
import Layout from '../components/Layout/Layout';

function MyApp({Component, pageProps}) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;