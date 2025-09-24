import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { Button } from './Button';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  description,
  children,
  primaryAction,
  secondaryAction,
}) => (
  <Transition appear show={open} as={Fragment}>
    <Dialog as="div" className="relative z-30" onClose={onClose}>
      <Transition.Child
        as={Fragment}
        enter="ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black/30" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-semibold text-primary">
                {title}
              </Dialog.Title>
              {description && <p className="mt-2 text-sm text-neutral-500">{description}</p>}

              <div className="mt-6 space-y-4">{children}</div>

              {(primaryAction || secondaryAction) && (
                <div className="mt-8 flex items-center justify-end gap-3">
                  {secondaryAction && (
                    <Button variant="ghost" onClick={secondaryAction.onClick}>
                      {secondaryAction.label}
                    </Button>
                  )}
                  {primaryAction && (
                    <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
                  )}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
);
