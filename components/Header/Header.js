import React, {useEffect, useState} from 'react';
import {InputSwitch} from 'primereact/inputswitch';
import {Sidebar} from 'primereact/sidebar';
import Logo from '../../assets/images/logo.svg';
import NanoLogo from '../../assets/images/nano-logo.svg';
import {useRouter} from 'next/router';
import {useDispatch} from 'react-redux';
import {changeThemeMode, changeView} from '../../store/reducer';
import ContentAccordions from '../ContentAccordions/ContentAccordions';
import Link from 'next/link';
import Image from 'next/image';

function Header(props) {
  const [value, setValue] = useState(false);
  const [mode, setMode] = useState(false);
  const [visibleLeft, setVisibleLeft] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  console.log(router);

  useEffect(() => {
  }, [router]);

  const changeModeHandle = () => {
    if (document.body.classList.contains('white-content')) {
      dispatch(changeThemeMode('light'));

      document.body.classList.remove('white-content');
      document.querySelector('.brightness').querySelector('.p-inputswitch').classList.add('p-inputswitch-checked');
      document.querySelector('.bright').classList.add('disabled');
      document.querySelector('.dark').classList.remove('disabled');
      setValue(false);
    } else {
      dispatch(changeThemeMode('dark'));

      document.body.classList.add('white-content');
      document.querySelector('.brightness').querySelector('.p-inputswitch').classList.remove('p-inputswitch-checked');
      document.querySelector('.bright').classList.remove('disabled');
      document.querySelector('.dark').classList.add('disabled');
      setValue(true);
    }
  };

  const viewHandle = () => {
    if (document.body.classList.contains('gallery-mode')) {
      dispatch(changeView('collector'));

      document.body.classList.remove('gallery-mode');
      document.querySelector('.viewmode').querySelector('.p-inputswitch').classList.add('p-inputswitch-checked');
      document.querySelector('.gallery').classList.remove('disabled');
      document.querySelector('.collector').classList.add('disabled');
      setMode(false);
    } else {
      dispatch(changeView('gallery'));

      document.body.classList.add('gallery-mode');
      document.querySelector('.viewmode').querySelector('.p-inputswitch').classList.remove('p-inputswitch-checked');
      document.querySelector('.gallery').classList.add('disabled');
      document.querySelector('.collector').classList.remove('disabled');
      setMode(true);
    }
  };

  return (
    <div className={`header ${router.pathname === '/' ? '' : 'flex-header'}`}>
      <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}>
        <h3>FAQ</h3>
        <ContentAccordions/>
      </Sidebar>

      <div className="container">
        <div className="header__wrapper justify-content-lg-around">
          <div className="header__wrapper-menu text-left">
            <ul className="list-unstyled">
              <li className="list-inline-item"><a target="_blank" href="https://twitter.com/pixl_page">Twitter</a></li>
              <li className="list-inline-item"><a onClick={() => setVisibleLeft(true)} href="#">FAQ</a></li>
              {
                router.pathname !== '/' &&
                <li className="list-inline-item"><a target="_blank" href="https://forms.gle/6wV1pdktKPLuNTLz9">Feedback</a></li>
              }
            </ul>
          </div>

          <div className="header__wrapper-logo text-center">
            <Link href="/">
              <a className="main__logo"><Image className="img-fluid logo" src={Logo} alt="pixl.page"/></a>
            </Link>

            {
              router.pathname !== '/' &&
              <Link href="https://www.nano-frames.com/">
                <a rel="noreferrer" target="_blank" className="side__logo">
                  <p>powered by</p>
                  <Image width="150" className="img-fluid logo" src={NanoLogo} alt="Nano"/>
                </a>
              </Link>
            }

            {router.pathname === '/' && <p>Your pixels, your page</p>}
          </div>

          <div className="header__wrapper-theme text-center text-lg-right">

            <div className="header__wrapper-theme__brightness brightness mb-1">
              <span className="dark" onClick={changeModeHandle}>Dark</span>
              <InputSwitch checked={value} onChange={changeModeHandle}/>
              <span className="bright" onClick={changeModeHandle}>Bright</span>
            </div>

            {
              router.pathname !== '/' &&
              <div className="header__wrapper-theme__viewmode viewmode">
                <span className="gallery" onClick={viewHandle}>Gallery</span>
                <InputSwitch checked={mode} onChange={viewHandle}/>
                <span className="collector" onClick={viewHandle}>Collector</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;