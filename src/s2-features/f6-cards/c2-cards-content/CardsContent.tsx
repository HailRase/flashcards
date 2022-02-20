import React, {useEffect} from 'react';
import {useAppSelector} from "../../../s1-main/m2-bll/store";
import {useParams} from "react-router-dom";
import {fetchCards} from "../../../s1-main/m2-bll/card-reducer";
import {useDispatch} from "react-redux";

const CardsContent = () => {

    const {cards} = useAppSelector(state => state.card.cards)
    const {filter} = useAppSelector(state => state.card.filter)
    let param = useParams()
    const dispatch = useDispatch()
    useEffect( () => {
        dispatch(fetchCards({...filter, cardsPack_id: param.packCardsId}))
    }, [])

    return (
        <div>

        </div>
    );
};

export default CardsContent;