import React from 'react';
import clsx from 'clsx';

import T from './styled';

enum VariantMappings {
  h1 = 'h1',
  h2 = 'h2',
  body = 'p',
  caption = 'span',
}

export interface IProps extends React.HTMLAttributes<HTMLElement> {
  variant?: keyof typeof VariantMappings;
  color?: 'primary' | 'secondary' | 'text' | 'error';
  shade?: 'main' | 'light';
  fontWeight?: 'normal' | 'bold';
  noWrap?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const Typography = ({
  variant = 'body',
  color = 'text',
  shade = 'main',
  fontWeight = 'normal',
  className = '',
  noWrap,
  children,
  ...props
}: IProps) => {
  const tag = VariantMappings[variant] ? VariantMappings[variant] : 'p';
  const classes = clsx(
    className,
    variant,
    `color-${color}`,
    `shade-${shade}`,
    `fontWeight-${fontWeight}`,
    { noWrap }
  );

  return (
    <T className={classes} as={tag} color={color} shade={shade} {...props}>
      {children}
    </T>
  );
};

export default Typography;
