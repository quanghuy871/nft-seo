import React from 'react';
import SEO from '../../components/SEO/SEO';

function AssetId(props) {
  return (
    <>
      <SEO title="CARDANOBITS TEST TEST" description="CARDANOBITS TEST TEST"
           image="https://api.nano-frames.com/asset-service/media/ipfs/UW1TQVNFOG5BcnVDSDg1UmJ0ZTltR3JWNWhkWVFib212eEZtUGVUZEFaN3cxSw==?size=medium"/>
      <div className="asset__individual">
        <div className="container">
          <div className="asset__individual-wrapper">
            <div className="asset__individual-wrapper asset__inside el-asset-item">
              <div className="asset__inside-img el-asset-item__img">
                <img className="img-fluid" src="https://api.nano-frames.com/asset-service/media/ipfs/UW1TQVNFOG5BcnVDSDg1UmJ0ZTltR3JWNWhkWVFib212eEZtUGVUZEFaN3cxSw==?size=medium" alt=""/>
              </div>

              <div className="el-asset-item__data">
                <h6>TEST NAME</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

export default AssetId;