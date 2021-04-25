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
  color?: 'primary' | 'secondary' | 'text';
  shade?: 'main' | 'light';
  className?: string;
  children: React.ReactNode;
}

const Typography = ({
  variant = 'body',
  color = 'text',
  shade = 'main',
  className = '',
  children,
  ...props
}: IProps) => {
  const tag = VarianMappings[variant] ? VarianMappings[variant] : 'p';
  const classes = clsx(className, variant, `color-${color}`, `shade-${shade}`);

  return (
    <T className={classes} as={tag} color={color} shade={shade} {...props}>
      {children}
    </T>
  );
};

export default Typography;
