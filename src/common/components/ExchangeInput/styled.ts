import styled from 'styled-components';
import NumberFormat from 'react-number-format';

import { Column } from 'common/styles/layout';
import Button from 'common/components/Button';

export const Wrapper = styled(Column)`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.background.light};
  padding: 4px 16px 8px 16px;
  border-radius: 8px;

  .error {
    margin-top: -6px;
  }
`;

export const AccountButton = styled(Button)`
  font-size: 40px;
  display: flex;
  align-items: center;
`;

export const BalanceButton = styled(Button)`
  font-size: 16px;
  && {
    color: ${({ theme }) => theme.palette.text.light};
    margin-top: -6px;
  }
`;

export const NumberInput = styled(NumberFormat)`
  background-color: transparent;
  text-align: right;
  border: none;
  font-size: 40px;
  color: inherit;
`;
