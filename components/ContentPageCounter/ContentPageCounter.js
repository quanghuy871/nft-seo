import React, {useState, useEffect, Fragment} from 'react';

function PageCounter() {
  const [counter, setCounter] = useState(0);

  // Get page counter
  const handleRequest = async () => {
    try {
      const response = await fetch(`https://api.nano-frames.com/pixl-page-service/pages/count`, {
        method: 'GET',
      });

      const data = await response.json();
      setCounter(data.pageCount);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleRequest();
    const interval = setInterval(() => {
      handleRequest();
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Fragment>Already {counter ? counter : '...'} pixl.pages created</Fragment>
  );
}

export default PageCounter;