import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from './LearnPage.module.css'
import {Navigate, useParams} from "react-router-dom";
import {ICard} from "../../../s1-main/m3-dal/card";
import {StoreType} from "../../../s1-main/m2-bll/store";
import {fetchCards, gradeCard} from "../../../s1-main/m2-bll/card-reducer";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {PATH} from "../../../s1-main/m1-ui/routes/routes";
import {TableSpinner} from "../../f5-packs/p3-packs-table/PacksTable";

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: ICard[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = () => {

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const {cards, filter, status} = useSelector((state: StoreType) => state.card);
    const isAuth = useSelector<StoreType, boolean>(state => state.auth.isAuth);
    const {learnPackId} = useParams();
    console.log(learnPackId)
    const [card, setCard] = useState<ICard>({
        _id: 'fake',
        answer: '',
        __v: 0,
        answerImg: "",
        answerVideo: "",
        cardsPack_id: "",
        comments: "",
        created: "",
        grade: 0,
        more_id: "",
        question: "",
        questionImg: "",
        questionVideo: "",
        rating: 0,
        shots: 0,
        type: "",
        updated: "",
        user_id: ""

    });

    const dispatch = useDispatch();
    useEffect(() => {
        if (first) {
            dispatch(fetchCards({...filter, cardsPack_id: learnPackId}));
        }
        setFirst(false);
        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, learnPackId, cards, first]);

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            setCard(getCard(cards));
        }
    }
    if (!isAuth) return <Navigate replace to={PATH.AUTH.LOGIN}/>
    return (
        <div className={s.cardContainer}>
            <div className={s.card}>
                {status === 'loading'
                    ? <TableSpinner/>
                    : <div className={s.questionContainer}>
                        <div className={s.question}>
                            <span className={s.questionTitle}>Question: </span>
                            <span className={s.questionBody}>{card.question}</span>
                        </div>
                        {!isChecked && <button className={s.cardCommonButton}
                                               onClick={() => setIsChecked(true)}>Check</button>}
                    </div>}
                {isChecked && (
                    <div className={s.answerContainer}>
                        <div className={s.answer}>
                            <span className={s.questionTitle}>Answer: </span>
                            <span className={s.questionBody}>{card.answer}</span>
                        </div>
                        <div className={s.grades}>
                            {grades.map((g, i) => (
                                <button key={'grade-' + i}
                                        className={s.gradeButton}
                                        onClick={() => dispatch(gradeCard(i + 1, card._id))}>{g}</button>
                            ))}
                        </div>
                        <button className={s.cardCommonButton} onClick={onNext}>next</button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default LearnPage;