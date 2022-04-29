import React, {useEffect} from 'react';
import {Tooltip} from 'primereact/tooltip';
import pixlLogo from '../../assets/images/pixl-icon-black.svg';
import pixlLogoBW from '../../assets/images/pixl-icon-bw.svg';
import {useSelector} from 'react-redux';
import arrow from '../../assets/images/arrow-up.svg';
import fullscreenIcon from '../../assets/images/fullscreen-icon.svg';
import {Button} from 'primereact/button';

function Buttons(props) {
  const mode = useSelector(state => state.theme.themeMode);
  const type = props.type;

  return (
    <>
      {
        type === 'Select' &&
        <Button tooltip={props.tooltip} data-pr-tooltip={props.tooltip} onClick={props.onClick} className="controls__btn select__btn position-absolute">
          <img className="img-fluid" src={pixlLogo} alt={props.name}/>
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
        <Button tooltip={props.tooltip} onClick={props.onClick} className="controls__btn select__btn arrow__btn position-absolute">
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