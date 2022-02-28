import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import s from './LearnPage.module.css'
import {useParams} from "react-router-dom";
import {ICard} from "../../../s1-main/m3-dal/card";
import {StoreType} from "../../../s1-main/m2-bll/store";
import {fetchCards, gradeCard} from "../../../s1-main/m2-bll/card-reducer";
import SuperButton from "../../../s1-main/m1-ui/common/c2-SuperButton/SuperButton";

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
    const [cardVisability, setCardVisability] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const {cards, filter, status} = useSelector((state: StoreType) => state.card);
    const {id} = useParams();

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
        console.log('LearnContainer useEffect');

        if (first) {
            dispatch(fetchCards({...filter, id}));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id, cards, first]);

    const onNext = () => {
        setCardVisability(false);

        if (cards.length > 0) {
            setCard(getCard(cards));
        }
    }

    return (
        <div className={s.cardFlipperContainer}>
            LearnPage
            <div className={cardVisability ? s.cardFlipper: ''}>
                <div className={s.front}>
                    <div>{card.question}</div>
                    <div>
                        <SuperButton onClick={() => setCardVisability(true)}>check</SuperButton>
                    </div>
                </div>
                <div className={s.back}>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <SuperButton key={'grade-' + i}
                                     onClick={() => dispatch(gradeCard(i + 1, card._id))}>{g}</SuperButton>
                    ))}

                    <div><SuperButton onClick={onNext}>next</SuperButton></div>
                </div>
            </div>
        </div>
    );
};

export default LearnPage;