import React from 'react';
import clsx from 'clsx';

import { Button as StyledButton } from './styled';
interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'empty' | 'icon';
  color?: 'primary' | 'secondary' | 'text';
  small?: boolean;
  className?: string;
  children: React.ReactNode;
}

const Button = ({
  variant = 'empty',
  color = 'text',
  small = false,
  className,
  children,
  ...props
}: IProps) => {
  const classes = clsx(variant, `color-${color}`, className, {
    small,
  });

  return (
    <StyledButton className={classes} color={color} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;
