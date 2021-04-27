import styled from 'styled-components';

import Button from 'common/components/Button';

export const StyledButton = styled(Button)`
  position: fixed;
  bottom: 50px;
  left: 50px;

  @media only screen and (max-device-width: 736px) {
    bottom: 30px;
    right: 30px;
    left: auto;
  }
`;
