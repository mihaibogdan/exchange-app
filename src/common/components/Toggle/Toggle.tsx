import React from 'react';

interface IProps {
  label: string | React.ReactNode;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  checked: boolean;
  id: string;
}

import { Wrapper } from './styled';

const Toggle = ({ label, checked, onChange, id }: IProps) => {
  return (
    <Wrapper htmlFor={id}>
      {label}
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <span className="toggleSwitch"></span>
    </Wrapper>
  );
};

export default Toggle;
