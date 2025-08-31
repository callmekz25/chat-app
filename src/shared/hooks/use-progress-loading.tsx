import { useEffect } from 'react';
import NProgress from 'nprogress';
import { useIsFetching } from '@tanstack/react-query';
import 'nprogress/nprogress.css';

export function useNProgress() {
  const isFetching = useIsFetching();

  useEffect(() => {
    NProgress.configure({ showSpinner: false });
    if (isFetching) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching]);
}
