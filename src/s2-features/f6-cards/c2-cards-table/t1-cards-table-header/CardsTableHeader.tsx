import React from 'react';
import s from "./CardsTableHeader.module.css";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../../s1-main/m2-bll/store";
import {CardState, fetchCards, SortCards} from "../../../../s1-main/m2-bll/card-reducer";
import sortIcon from "../../../../assets/sort_icon.png";

const CardsTableHeader = () => {

    const {filter} = useSelector<StoreType, CardState>(state => state.card);
    const dispatch = useDispatch();

    const currentOrder = +filter.sortCards.substring(0, 1); // 1 | 0
    const currentSortBy = filter.sortCards.substring(1); //  updated | grade

    const changeSort = (sortBy: string, order: number) => {
        const sortCards = `${order}${sortBy}` as SortCards;
        dispatch(fetchCards({...filter, sortCards}))
    }

    const sortByDate = () => {
        if (currentSortBy === "updated") {
            changeSort("updated", currentOrder ? 0 : 1);
        } else {
            changeSort("updated", 0);
        }
    }

    const sortByGrade = () => {
        if (currentSortBy === "grade") {
            changeSort("grade", currentOrder ? 0 : 1);
        } else {
            changeSort("grade", 0);
        }
    }

    const Icon = <img
        src={sortIcon}
        alt="sort"
        className={`${s.sort_icon} ${currentOrder && s.sort_icon_upwards}`}/>

    return (
        <div className={s.header}>
            <div className={s.col_0}>Question</div>
            <div className={s.col_1}>Answer</div>
            <div className={`${s.col_2} ${s.sort}`}
                 onClick={sortByDate}>Last Updated {currentSortBy === "updated" && (Icon)}
            </div>
            <div className={`${s.col_3} ${s.sort}`}
                 onClick={sortByGrade}>Grade {currentSortBy === "grade" && (Icon)}</div>
            <div className={s.col_4}>Actions</div>

        </div>
    );
};

export default CardsTableHeader;