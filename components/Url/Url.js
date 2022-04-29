import React, {Fragment} from 'react';
import onUrl from '../../utils/onUrl';

function Url(props) {
  return (
    <Fragment>
      {
        onUrl(props.value) ?
          <a style={{marginLeft: '6px'}} className="link" href={props.value} target="_blank" rel="noreferrer nofollow">{props.value}</a> :
          <span style={{marginLeft: '6px'}}>&quot;{props.value}&quot;</span>
      }
    </Fragment>
  );
}

export default Url;