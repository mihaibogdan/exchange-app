import React, { useState } from 'react';
import SettingsIcon from 'remixicon-react/Settings2LineIcon';

import SettingsModal from 'common/components/SettingsModal';
import { StyledButton } from './styled';

const Settings = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <StyledButton variant="icon" onClick={() => setIsOpen(true)}>
        <SettingsIcon />
      </StyledButton>
      <SettingsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default Settings;
