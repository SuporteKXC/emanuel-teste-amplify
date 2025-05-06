import { createPortal } from 'react-dom';
import React, { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren<{}> {}

const ModalPortal: React.FC<Props> = ({ children }) => {
  const container = document.getElementById('modal-root');

  if (!container) {
    throw new Error(`Could not find element with id modal-portal`);
  }

  return createPortal(children, container);
};

export default ModalPortal;
