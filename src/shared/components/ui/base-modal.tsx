import React, { ReactNode, useEffect } from 'react';
type BaseModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};
const BaseModal = ({ open, onClose, children }: BaseModalProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center'
      aria-modal='true'
      role='dialog'
    >
      <div className='absolute inset-0 bg-black/50' onClick={onClose} />

      <div className='z-[100]'>{children}</div>
    </div>
  );
};

export default BaseModal;
