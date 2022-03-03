import React from 'react';
import s from './PopUp.module.css'
import PClose from './../../../../assets/closeIcon.svg'
type PopUpPropsType = {
    active: boolean
    setActive: (active: boolean) => void
    title: string
}
const PopUp: React.FC<PopUpPropsType> = ({active, setActive, children, title}) => {

    const onClosePopup = () => {
      setActive(false)
    }
    return (
        <div className={s.popupContainer}>
            <div className={s.popup}>
                <div className={s.popupHeader}>
                    <span className={s.popupTitle}>{title}</span>
                    <img onClick={onClosePopup} className={s.closeImg} src={PClose} alt="closePic"/>
                </div>
                {children}
            </div>
        </div>
    );
};

export default PopUp;