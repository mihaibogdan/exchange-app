import React from 'react';

interface IProps {
  children: React.ReactNode;
}

function Button({ children }: IProps) {
  return <button>{children}</button>;
}

export default Button;
