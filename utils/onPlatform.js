/* Check for OS function */

import React from 'react';

function onPlatform() {
  let platform = 'na';

  const navigatorPlatform = window.navigator.platform.toLowerCase();

  if (-1 !== navigatorPlatform.indexOf('win')) {
    platform = 'windows';
  } else if (-1 !== navigatorPlatform.indexOf('mac')) {
    platform = 'macos';
  } else if (-1 !== navigatorPlatform.indexOf('linux')) {
    platform = 'linux';
  }

  return platform;
}

export default onPlatform;