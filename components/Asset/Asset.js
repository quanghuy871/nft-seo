import React, {Fragment} from 'react';
import {useEffect, useState} from 'react';
import {Image} from 'primereact/image';
import Button from '../Buttons/Buttons';
import {Buffer} from 'buffer';

function Asset(props) {
  const [name, setName] = useState(null);
  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [button, setButton] = useState(false);

  useEffect(() => {
    setName(props.asset.displayName);
    if (props.asset.media.files && props.asset.media.files.length > 0) {
      if (props.asset.media.files[0].mediaType) {
        setMediaType(props.asset.media.files[0].mediaType.type);
      } else {
        setMediaType('image');
      }
      setFile(props.asset.media.files[0].url);
    } else {
      setFile(props.asset.media.poster.url);
      setMediaType('image');
    }
  }, [file, mediaType, props]);

  const fullscreenHandle = () => {
    document.querySelector('.p-sidebar__fullscreen').classList.add('p-sidebar__fullscreen-iframe');
  };

  return (
    <Fragment>
      {
        mediaType === 'image' || mediaType === 'image/jpeg' || mediaType === 'image/jpg' || mediaType === 'image/png' ||
        mediaType === 'image/gif' || mediaType === 'image/svg+xml' ?
          <Image
            template={<Button tooltip="Fullscreen view" type="Fullscreen"/>}
            imageClassName="img-fluid main__img"
            src={file}
            alt="Image"
            preview
          /> :
          mediaType === 'video/mpeg' || mediaType === 'video/mp4' ?
            <div style={{height: '100%', width: '100%', textAlign: 'center'}}>
              <Button tooltip="Fullscreen view" onClick={fullscreenHandle} type="Fullscreen"/>
              <video
                poster={file}
                src={file}
                controls
                autoPlay={true}
                muted
                loop
                playsInline={true}
                style={{height: '100%', width: '100%'}}
              >
              </video>
            </div> :
            mediaType === 'audio/mp4' || mediaType === 'audio/mp3' || mediaType === 'audio/mpeg' || mediaType === 'audio/wav' || mediaType === 'audio/ogg' ?
              <div style={{maxHeight: 'inherit', maxWidth: 'inherit'}}>
                <Image
                  template={<Button tooltip="Fullscreen view" type="Fullscreen"/>}
                  imageClassName="img-fluid main__img"
                  src={file}
                  alt="Image"
                  preview
                />
                <audio
                  controls
                  autoPlay={true}
                  loop>
                  <source src={file} type={mediaType}></source>
                </audio>
              </div> :
              Array.isArray(file) ?
                <div style={{height: '100%', width: '100%'}}>
                  <Button tooltip="Fullscreen view" onClick={fullscreenHandle} type="Fullscreen"/>
                  <iframe
                    key={props.asset.id ? props.asset.id : ''}
                    id={props.asset.id ? props.asset.id : ''}
                    title={name}
                    srcDoc={Buffer.from(file.toString().replace('data:text/html;base64,', ''), 'base64')}
                    marginWidth={0}
                    marginHeight={0}
                    style={{width: '100%', height: '500px', border: '0px', padding: '0px', margin: '0px', overflow: 'hidden'}}
                  >
                  </iframe>
                </div> :
                <div style={{height: '100%', width: '100%'}}>
                  <Button tooltip="Fullscreen view" onClick={fullscreenHandle} type="Fullscreen"/>
                  <iframe
                    key={props.asset.id ? props.asset.id : ''}
                    id={props.asset.id ? props.asset.id : ''}
                    title={name}
                    src={file}
                    marginWidth={0}
                    marginHeight={0}
                    style={{width: '100%', border: '0px', padding: '0px', margin: '0px', overflow: 'hidden'}}
                  >
                  </iframe>
                </div>
      }
    </Fragment>
  );
}

export default Asset;