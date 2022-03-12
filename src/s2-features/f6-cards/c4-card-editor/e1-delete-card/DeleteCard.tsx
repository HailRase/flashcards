import React from 'react';
import s from "./DeleteCard.module.css";
type DeleteCardPropsType = {
    cardId: string
    cardName: string
    deleteCard: (cardId: string) => void
}
const DeleteCard: React.FC<DeleteCardPropsType> = ({cardId, cardName, deleteCard}) => {
    return (
        <div>
            <span className={s.deleteCard}>
                Do you really want to <b>remove "{cardName}"</b>?
            </span>
            <button onClick={() => deleteCard(cardId)} className={s.deleteButton}>Delete</button>
        </div>
    );
};

export default DeleteCard;