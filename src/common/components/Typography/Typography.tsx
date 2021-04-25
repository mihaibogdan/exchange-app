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
  children: React.ReactNode;
}

const Typography = ({
  variant = 'body',
  color = 'text',
  shade = 'main',
  children,
  ...props
}: IProps) => {
  const tag = VarianMappings[variant] ? VarianMappings[variant] : 'p';
  const classes = clsx(variant, `color-${color}`, `shade-${shade}`);

  return (
    <T className={classes} as={tag} color={color} shade={shade} {...props}>
      {children}
    </T>
  );
};

export default Typography;
