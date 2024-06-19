import React, { useRef, useEffect } from 'react';
import Router from 'next/router';
import TopLoadingBar from 'react-top-loading-bar';

const LoadingBar = () => {
  const ref = useRef<any>(null);

  useEffect(() => {
    const start = () => ref.current.continuousStart();
    const complete = () => ref.current.complete();

    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', complete);
    Router.events.on('routeChangeError', complete);

    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', complete);
      Router.events.off('routeChangeError', complete);
    };
  }, []);

  return (
    <TopLoadingBar
      ref={ref}
      color="#4caf50"
    />
  );
};

export default LoadingBar;