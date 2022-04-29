import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import arrow from '../../assets/images/arrow-up.svg';
import fullscreenIcon from '../../assets/images/fullscreen-icon.svg';
import {Button} from 'primereact/button';
import plus from '../../assets/images/plus.svg';
import minus from '../../assets/images/minus.svg';
import Image from 'next/image';

function Buttons(props) {
  const mode = useSelector(state => state.theme.themeMode);
  const type = props.type;

  return (
    <>
      {
        type === 'Select' &&
        <Button tooltip={props.tooltip} data-pr-tooltip={props.tooltip} onClick={props.onClick} className="controls__btn select__btn position-absolute">
          <Image className="img-fluid" src={props.checked ? minus : plus} alt={props.name}/>
        </Button>
      }
      {
        type === 'Metadata' &&
        <Button tooltip={props.tooltip} onClick={props.onClick} className="controls__btn showmeta__btn position-absolute">
          <span style={{width: '100%'}}>M</span>
        </Button>
      }
      {
        type === 'Metadata Sidebar' &&
        <Button tooltip={props.tooltip} onClick={props.onClick} className="controls__btn arrow__btn position-absolute">
          <img className="img-fluid" src={arrow} alt=""/>
        </Button>
      }
      {
        type === 'Fullscreen' &&
        <Button tooltip={props.tooltip} onClick={props.onClick} className="controls__btn fullscreen__btn position-absolute">
          <img className="img-fluid" src={fullscreenIcon} alt=""/>
        </Button>
      }
    </>
  );
}

export default Buttons;