import clsx from 'clsx';
import React from 'react';

const PlayIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox='0 0 12 13'
      width='12'
      height='12'
      fill='currentColor'
      className={clsx('text-white', className)}
    >
      <g fillRule='evenodd' transform='translate(-450 -1073)'>
        <g>
          <path
            d='m104.658 920.28-6.256-4.021a.26.26 0 0 0-.402.22v8.042a.26.26 0 0 0 .402.22l6.256-4.021a.261.261 0 0 0 0-.44'
            transform='translate(355.5 159)'
          ></path>
          <path
            fillRule='nonzero'
            d='m104.929 919.86-6.256-4.022a.76.76 0 0 0-1.173.64v8.043a.76.76 0 0 0 1.173.64l6.256-4.02a.761.761 0 0 0 .06-1.238l-.06-.043zm-6.429 4.224v-7.168l5.575 3.584-5.575 3.584z'
            transform='translate(355.5 159)'
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default PlayIcon;
