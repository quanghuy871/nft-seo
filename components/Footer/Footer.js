import React from 'react';
import NanoLogo from '../../assets/images/nano-logo.svg';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <div className="footer">
      <div className="container text-center">
        <p>powered by</p>
        <Link href="https://nano-frames.com/">
          <a target="_blank"><Image className="img-fluid logo" src={NanoLogo} alt="Nano"/></a>
        </Link>
      </div>
    </div>
  );
}

export default Footer;