import React, {Fragment, useEffect} from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import {useRouter} from 'next/router';

function Layout({children}) {
  const router = useRouter();

  useEffect(() => {
  }, [router]);

  return (
    <Fragment>
      <Header/>
      <div className="main-content">
        {children}
      </div>
      {
        router.pathname === '/' &&
        <Footer/>
      }
    </Fragment>
  );
}

export default Layout;