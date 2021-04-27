import styled from 'styled-components';

import Button from 'common/components/Button';

export const StyledButton = styled(Button)`
  position: fixed;
  bottom: 50px;
  left: 50px;
  box-shadow: 0px 2px 8px rgba(32, 33, 36, 0.24);

  @media only screen and (max-width: 736px) {
    bottom: 30px;
    right: 30px;
    left: auto;
  }
`;
