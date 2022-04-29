import React, {useEffect, useState} from 'react';
import {InputText} from 'primereact/inputtext';
import {Dialog} from 'primereact/dialog';
import PageCounter from '../ContentPageCounter/ContentPageCounter';
import signal from '../../assets/images/signal.png';
import {useRouter} from 'next/router';

function ContentAddressInput() {
  const [value, setValue] = useState('');
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const handlerSearch = async (e, page = 0) => {
    e.preventDefault();
    await fetch(`https://api.nano-frames.com/asset-service/wallets/${value}/collections?page=${page}&pageSize=5`).then((res) => {
      if (res.ok) {
        router.push(`/address/${value.trim()}/collections`);
      } else {
        throw new Error();
      }
    }).catch(() => setVisible(true));
  };

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, [visible]);

  return (
    <div className="el-address-input text-center">
      <div className="container">
        <h3><PageCounter/></h3>

        <form onSubmit={handlerSearch} className="el-address-input__wrapper mx-auto">
          <span className="p-input-icon-left">
            <i className="pi pi-search"/>
            <InputText value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter ADA address or ADAHandle"/>
          </span>
        </form>

        <Dialog onHide={() => setVisible(false)} visible={visible} position={'top-right'} modal
                draggable={false} resizable={false}>
          <img className="img-fluid" src={signal} alt="Not Found"/>
          <p>ADDRESS NOT FOUND</p>
        </Dialog>
      </div>
    </div>
  );
}

export default ContentAddressInput;