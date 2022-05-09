import React, {useEffect} from 'react';
import '../assets/scss/global.scss';
import {Provider} from 'react-redux';
import store from '../store/reducer';
import Layout from '../components/Layout/Layout';
import {useRouter} from 'next/router';

function MyApp({Component, pageProps}) {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag('config', '[Tracking ID]', {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;