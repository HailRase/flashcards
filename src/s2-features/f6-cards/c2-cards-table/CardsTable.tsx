import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../s1-main/m2-bll/store";
import {CardState, fetchCards} from "../../../s1-main/m2-bll/card-reducer";
import s from './CardsTable.module.css'
import CardsTableHeader from "./t1-cards-table-header/CardsTableHeader";
import {useParams} from "react-router-dom";
import {TableSpinner} from "../../f5-packs/p3-packs-table/PacksTable";

const CardsTable = () => {

    const {status, filter, cardsTotal, cards} = useSelector<StoreType, CardState>(state => state.card);
    const params = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        if (params.packCardsId) {
            dispatch(fetchCards({...filter, cardsPack_id: params.packCardsId}));
        }
    }, [])


    const loadedCards = status === "loaded" && cards.map((c, i) =>

        <div key={c._id} className={`${s.row} ${i % 2 && s.dark}`}>
            <div className={s.col_0}>{c.question}</div>
            <div className={s.col_1}>{c.answer}</div>
            <div className={s.col_2}>{c.updated.substring(0, 10)}</div>
            <div className={s.col_3}>{c.grade}</div>
            <div className={s.col_4}>action</div>
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
            </div>
        </div>
    );
};

export default CardsTable;