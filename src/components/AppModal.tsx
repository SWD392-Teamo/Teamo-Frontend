import { Modal } from 'flowbite-react';
import React, { ReactNode } from 'react';

interface AppModalProps {
  show: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
}

export default function AppModal({ show, onClose, title, children, size = 'md' }: AppModalProps) {
  return (
    <Modal
      show={show}
      onClose={onClose}
      size={size}
      theme={{
        content: {
          base: "relative h-full w-full p-4 md:h-auto",
          inner: "relative rounded-lg bg-white shadow dark:bg-gray-700 flex flex-col max-h-[90vh]"
        }
      }}
    >
      <Modal.Header className="border-b border-gray-200">
        <span className='text-primary font-beVietnam font-bold text-lg'>{title}</span>
      </Modal.Header>
      <Modal.Body className="overflow-y-auto">
        {children}
      </Modal.Body>
    </Modal>
  );
}