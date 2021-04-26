import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import CloseIcon from 'remixicon-react/CloseLineIcon';

import { ModalWithTransition, Container, CloseButton } from './styled';
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: IProps) => {
  return ReactDOM.createPortal(
    <CSSTransition in={isOpen} classNames="grow" unmountOnExit timeout={250}>
      <ModalWithTransition>
        <Container>
          {children}
          <CloseButton variant="icon" small onClick={onClose}>
            <CloseIcon />
          </CloseButton>
        </Container>
      </ModalWithTransition>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
