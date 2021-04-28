import React, { useContext } from 'react';
import MoonIcon from 'remixicon-react/MoonFillIcon';

import { ThemeContext, IThemeContext } from 'contexts/Theme';
import Modal from 'common/components/Modal';
import Typography from 'common/components/Typography';
import Toggle from 'common/components/Toggle';
import { Theme } from 'common/types/theme';
import { Wrapper, DarkThemeLabel, DarkThemeBadge } from './styled';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal = ({ isOpen, onClose }: IProps) => {
  const { theme, toggleTheme } = useContext<IThemeContext>(ThemeContext);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <Typography variant="h1">Settings</Typography>

        <Toggle
          label={
            <DarkThemeLabel>
              <DarkThemeBadge>
                <MoonIcon />
              </DarkThemeBadge>
              <Typography>Dark Theme</Typography>
            </DarkThemeLabel>
          }
          checked={theme.type === Theme.Dark}
          onChange={toggleTheme}
          id="theme"
        />
      </Wrapper>
    </Modal>
  );
};

export default SettingsModal;
