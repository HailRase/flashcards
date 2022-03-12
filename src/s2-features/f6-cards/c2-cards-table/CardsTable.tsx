import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../s1-main/m2-bll/store";
import {CardState, deleteCard, fetchCards, setCardStatus} from "../../../s1-main/m2-bll/card-reducer";
import s from './CardsTable.module.css'
import CardsTableHeader from "./t1-cards-table-header/CardsTableHeader";
import {useNavigate, useParams} from "react-router-dom";
import {TableSpinner} from "../../f5-packs/p3-packs-table/PacksTable";
import deleteIcon from "../../../assets/delete_icon.svg";
import editIcon from "../../../assets/edit_icon.svg";
import {formatStr} from "../../../s3-utils/formatStrt";
import eyeIcon from "../../../assets/eye_icon.svg";
import PopUp from "../../../s1-main/m1-ui/common/c5-PopUp/PopUp";
import DeleteCard from "../c4-card-editor/e1-delete-card/DeleteCard";

const CardsTable = () => {
    const [popupVisible, setPopupVisible] = useState<boolean>(false)
    const [card, setCard] = useState({
        cardId: '',
        cardName: ''
    })
    const {status, filter, cards} = useSelector<StoreType, CardState>(state => state.card);
    const id = useSelector<StoreType, string | undefined>(state => state.auth.userData?._id) || "";
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (params.packCardsId && status === "init") {
            dispatch(fetchCards({...filter, cardsPack_id: params.packCardsId}));
        }
    }, [dispatch, filter, status, params.packCardsId])
    const onDeleteCardHandler = (cardId: string) => {
        dispatch(deleteCard(cardId || ""))
        setPopupVisible(false)
    }
    const onDeletePopupHandler = (card: { cardId: string, cardName: string }) => {
        setPopupVisible(true)
        setCard(card)
    }
    const onCardEditor = (cardId: string) => {
        navigate(`/edit/card/${cardId}`)
        dispatch(setCardStatus('init'))
    }
    const loadedCards = status === "loaded" && cards.map((c, i) =>

        <div key={c._id} className={`${s.row} ${i % 2 && s.dark}`}>
            <div className={s.col_0}>{formatStr(c.question, 140)}</div>
            <div className={s.col_1}>{formatStr(c.answer, 140)}</div>
            <div className={s.col_2}>{c.updated.substring(0, 10)}</div>
            <div className={s.col_3}>
                <div className={s.grade}>
                    <div className={s.gradeBody}>
                        <div className={s.gradeItems}>
                            <div className={s.activeGrade} style={{width: `${c.grade*20}%`}}>
                            </div>
                            <input type="radio" name={'grade'} className={s.gradeItem}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.col_4}>{c.user_id === id &&
                <>
                    <img src={deleteIcon}
                         alt="delete my pack"
                         data-id={c._id}
                         onClick={() =>onDeletePopupHandler({cardId:c._id, cardName: c.question})}
                         className={`${s.icon} ${s.icon_red}`}/>

                    <img onClick={() => onCardEditor(c._id)} src={editIcon} alt="edit my pack" className={`${s.icon} ${s.icon_blue}`}/>
                </>}
                <img src={eyeIcon}
                     alt="view cards"
                     className={`${s.icon} ${s.icon_blue}`}
                     onClick={() => {}}/>
            </div>
        </div>
    )

    if (status !== "loaded") {
        return <div className={s.table}>
            <CardsTableHeader/>
            <TableSpinner/>
        </div>
    }

    return (
        <div className={s.tableContainer}>
            <div className={s.table}>
                <CardsTableHeader/>
                <div className={s.cardsTable}>
                    {loadedCards}
                </div>
                {popupVisible && <PopUp active={popupVisible} setActive={setPopupVisible} title={'Delete card'}>
                    <DeleteCard cardId={card.cardId} cardName={card.cardName} deleteCard={onDeleteCardHandler}/>
                </PopUp>}
            </div>
        </div>
    );
};

export default CardsTable;