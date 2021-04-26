import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import CloseIcon from 'remixicon-react/CloseLineIcon';

import { ModalWithTransition, Container, CloseButton } from './styled';
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const TIMEOUT = 250;

const Modal = ({ isOpen, onClose, children }: IProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen !== internalIsOpen) setInternalIsOpen(isOpen);
  }, [isOpen]);

  const closeModal = () => {
    setInternalIsOpen(false);
    setTimeout(onClose, TIMEOUT);
  };

  return ReactDOM.createPortal(
    <CSSTransition
      in={internalIsOpen}
      classNames="grow"
      unmountOnExit
      timeout={TIMEOUT}
    >
      <ModalWithTransition>
        <Container>
          {children}
          <CloseButton variant="icon" small onClick={closeModal}>
            <CloseIcon />
          </CloseButton>
        </Container>
      </ModalWithTransition>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
