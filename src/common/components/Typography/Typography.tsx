import React from 'react';
import clsx from 'clsx';

import T from './styled';

enum VarianMappings {
  h1 = 'h1',
  body = 'p',
  caption = 'span',
}

export interface IProps {
  variant?: keyof typeof VarianMappings;
  color?: 'primary' | 'secondary' | 'text' | 'error';
  className?: string;
  children: React.ReactNode;
}

const Typography = ({
  variant = 'body',
  color = 'text',
  className = '',
  children,
  ...props
}: IProps) => {
  const tag = VarianMappings[variant] ? VarianMappings[variant] : 'p';
  const classes = clsx(className, variant, `color-${color}`);

  return (
    <T className={classes} as={tag} color={color} {...props}>
      {children}
    </T>
  );
};

export default Typography;
