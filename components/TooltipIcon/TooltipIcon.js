import React, {Fragment} from 'react';
import {Tooltip} from 'primereact/tooltip';

function TooltipIcon(props) {
  return (
    <Fragment>
      <Tooltip target={`.${props.class}`} position={props.position}/>
      <i className={`${props.class} ${props.icon}`} data-pr-tooltip={props.text} onClick={props.onClick}/>
    </Fragment>
  );
}

export default TooltipIcon;