import styled from 'styled-components';

import { Row, Column } from 'common/styles/layout';

export const StyledTransaction = styled(Row)`
  width: 100%;
  padding: 8px 16px;

  background-color: ${({ theme }) => theme.palette.background.light};
  align-items: center;
  border-radius: 8px;

  .description {
    margin-right: 12px;
  }
`;

export const BadgeIcon = styled.span`
  background-color: ${({ theme }) => theme.palette.hover};

  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-right: 12px;
`;

export const AmountBox = styled(Column)`
  margin-left: auto;
  text-align: right;
`;
