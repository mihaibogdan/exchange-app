import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import CloseIcon from 'remixicon-react/CloseLineIcon';

import { ModalWithTransition, Container, CloseButton } from './styled';
interface IProps extends React.HTMLAttributes<HTMLElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const TIMEOUT = 250;

const Modal = ({ isOpen, onClose, children, ...props }: IProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen !== internalIsOpen) setInternalIsOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keyup', onKeyUp);

    return () => document.removeEventListener('keyup', onKeyUp);
  }, []);

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
      {...props}
    >
      <ModalWithTransition role="dialog">
        <Container>
          <CloseButton
            variant="icon"
            small
            onClick={closeModal}
            aria-label="close"
          >
            <CloseIcon />
          </CloseButton>
          {children}
        </Container>
      </ModalWithTransition>
    </CSSTransition>,
    document.body
  );
};

export default Modal;
