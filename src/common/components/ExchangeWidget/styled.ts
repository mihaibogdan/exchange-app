import styled from 'styled-components';

import { Column } from 'common/styles/layout';
import Button from 'common/components/Button';

export const Wrapper = styled(Column)`
  .market-order {
    margin-top: 4px;
    margin-bottom: 60px;
  }

  .main-account {
    margin-bottom: 16px;
  }

  .exchange-button {
    margin-top: 40px;
  }
`;

export const InputsArea = styled.div`
  position: relative;
`;

export const DirectionButton = styled(Button)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  && {
    border: solid 7px ${({ theme }) => theme.palette.background.main};
  }

  &&:hover {
    background-color: ${({ theme }) => theme.palette.background.light};
  }
`;
