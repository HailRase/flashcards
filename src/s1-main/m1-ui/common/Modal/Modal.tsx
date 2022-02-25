import {FC, MouseEvent} from "react";

import s from "./modal.module.css"

interface Props {
  active: boolean;
  onClose: () => void;
}

const Modal: FC<Props> = ({active, onClose, children}) => {

  let modalClassNames = s.modal;
  modalClassNames += active ? ` ${s.active}` : ``;

  const handleClose = () => {
    onClose();
  }

  const handlePropagation = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }

  return <div className={modalClassNames} onClick={handleClose}>
    <div className={s.content} onClick={handlePropagation}>
      {children}
    </div>
  </div>
}

export default Modal;