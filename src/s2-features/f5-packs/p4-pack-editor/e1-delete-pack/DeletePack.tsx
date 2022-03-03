import React from 'react';
import s from "./DeletePack.module.css";
type DeletePackPropsType = {
    packId: string
    packName: string
    deletePack: (packId: string) => void
}
const DeletePack: React.FC<DeletePackPropsType> = ({packId, packName, deletePack}) => {
    return (
        <div>
            <span className={s.deletePack}>
                Do you really want to <b>remove {packName}</b>?
                All cards will be excluded from this course.
            </span>
            <button onClick={() => deletePack(packId)} className={s.deleteButton}>Delete</button>
        </div>
    );
};

export default DeletePack;