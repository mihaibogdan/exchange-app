import React from 'react';
import SearchIcon from 'remixicon-react/SearchLineIcon';
import clsx from 'clsx';

import { Wrapper, StyledInput } from './styled';

interface IProps extends React.ButtonHTMLAttributes<HTMLInputElement> {
  value: string;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange, ...props }: IProps) => {
  return (
    <Wrapper {...props}>
      <SearchIcon className={clsx('search-icon', value === '' && 'empty')} />
      <StyledInput value={value} onChange={onChange} placeholder="Search" />
    </Wrapper>
  );
};

export default SearchInput;
