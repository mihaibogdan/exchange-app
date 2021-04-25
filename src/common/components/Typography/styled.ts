import styled from 'styled-components';

import { IProps } from './Typography';

export default styled.p<IProps>`
  color: ${props => props.theme.palette[props.color][props.shade]};
  margin: 0;

  &.h1 {
    font-size: 48px;
    font-weight: 500;
  }

  &.body {
    font-size: 20px;
    font-weight: 500;
  }

  &.caption {
    font-weight: 500;
    font-size: 16px;
  }
`;
