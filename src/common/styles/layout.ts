import styled from 'styled-components';

export const Container = styled.div`
  width: 600px;
  margin: 0 auto;
  padding: 60px 0;
`;

export const Row = styled.div<{ spaceBetween: boolean }>`
  display: flex;

  ${({ spaceBetween }) => spaceBetween && `justify-content: space-between`}
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
