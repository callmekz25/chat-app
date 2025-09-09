import React from 'react';
import { useInView } from 'react-intersection-observer';

const InfiniteScrollContainer = ({
  className,
  onTopReached,
  children,
}: {
  className?: string;
  onTopReached: () => void;
  children: React.ReactNode;
}) => {
  const { ref } = useInView({
    rootMargin: '0px 0px -50px 0px',
    onChange(inview) {
      if (inview) {
        onTopReached();
      }
    },
  });
  return (
    <div className={className}>
      <div ref={ref}></div>
      {children}
    </div>
  );
};

export default InfiniteScrollContainer;
