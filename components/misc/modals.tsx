// ! Next and React
import { ReactNode, useEffect } from "react";

// ! Library
import { joinClasses } from "../../lib/utils";

const ESCAPE_KEY_CODE = "Escape";

type ComponentProps = {
  isOpen: boolean,
  onClose: Function,
  contentClassName?: string,
  closeButton?: boolean,
  form?: boolean,
  disableOverlayClick?: boolean,
  children: ReactNode
}

const ModalContainer = (props: ComponentProps) => {
  const {
    isOpen,
    contentClassName,
    closeButton,
    onClose,
    form,
    disableOverlayClick,
    children,
  } = props;

  const closeModal = () => {
    if (onClose) onClose();
  }

  const handleKeyDown = e => {
    if (e.code == ESCAPE_KEY_CODE) {
      closeModal();
    }
  }

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      // FIXME event listener not being removed
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen])

  return (
    <div
      className={joinClasses("top-0 left-0 fixed z-50 h-full w-screen overflow-y-auto bg-black bg-opacity-75 flex justify-center transition-all lg:min-h-screen lg:items-center", {
        "opacity-100 visible": isOpen,
        "opacity-0 invisible": !isOpen
      })}
      id="modal-overlay"
      onClick={e => {
        if (!disableOverlayClick) {
          if ((e.target as HTMLDivElement).id == "modal-overlay") closeModal();
        }
      }}
    >
      <div className={joinClasses("w-full px-6 py-8 bg-white z-60 lg:shadow lg:px-8 lg:h-auto lg:rounded-md overflow-y-auto dark:bg-gray-800", {
        [contentClassName]: contentClassName,
        "relative": closeButton,
        "lg:w-1/2": form,
        "lg:w-5/6": !form
      })}>
        {
          closeButton && (
            <span className="p-2 absolute right-2 top-2 bg-blue-500 rounded-md text-white cursor-pointer" onClick={closeModal}>
              <i className="fas fa-times mr-2" />
              Close
            </span>
          )
        }
        {children}
      </div>
    </div>
  )
}

export default ModalContainer;
