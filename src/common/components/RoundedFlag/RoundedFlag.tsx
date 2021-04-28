import React, { useRef, useState, useEffect } from 'react';

import { Wrapper } from './styled';

interface IProps {
  country: string;
  size?: number;
}

const RoundedFlag = ({ country, size = 60 }: IProps) => {
  const ImportedIconRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const importFlag = async () => {
      setIsLoading(true);
      try {
        const { default: namedImport } = await import(
          `assets/flags/${country.toLowerCase()}.svg`
        );
        ImportedIconRef.current = namedImport;
        setIsLoading(false);
      } catch (err) {
        // setIsLoading(false);
      }
    };
    importFlag();
  }, [country]);

  const { current: ImportedIcon } = ImportedIconRef;
  return (
    <Wrapper size={size}>
      {!isLoading && ImportedIconRef.current ? (
        <ImportedIcon className="flag" height={size} />
      ) : null}
    </Wrapper>
  );
};

export default RoundedFlag;
