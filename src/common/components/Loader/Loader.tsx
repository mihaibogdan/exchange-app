import React from 'react';

import { Center, LoaderWrapper } from './styled';

interface IProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loader = ({ isLoading, children }: IProps) => {
  if (isLoading) {
    const size = 80;

    return (
      <Center>
        <LoaderWrapper
          role="progressbar"
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <svg viewBox="22 22 44 44">
            <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="2.6" />
          </svg>
        </LoaderWrapper>
      </Center>
    );
  }

  if (typeof children === 'function') {
    return children();
  }

  return children;
};

export default Loader;
