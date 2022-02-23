import React from 'react';
import s from './Cards.module.css'
import CardsHeader from "./c1-cards-header/CardsHeader";
import Pagination from "../../s1-main/m1-ui/common/c4-Pagination/Pagination";
import CardsTable from "./c2-cards-table/CardsTable";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../s1-main/m2-bll/store";
import {CardState, fetchCards} from "../../s1-main/m2-bll/card-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../../s1-main/m1-ui/routes/routes";

const Cards = () => {
    const isAuth = useSelector<StoreType, boolean>(state => state.auth.isAuth);
    const {status, filter, cardsTotal} = useSelector<StoreType, CardState>(state => state.card);
    const dispatch = useDispatch()


    const itemsPerPage = filter.pageCount
    const maxPageNumber = Math.ceil(cardsTotal / itemsPerPage)


    const onPageChange = (page: number) => {
        dispatch(fetchCards({...filter, page}))
    }

    if (!isAuth) return <Navigate replace to={PATH.AUTH.LOGIN}/>
    return (
        <div className={s.cardsContainer}>
            <div className={s.cards}>
                <CardsHeader/>
                <CardsTable/>
                {maxPageNumber > 1 && <Pagination currentPage={filter.page}
                                                  maxPage={maxPageNumber}
                                                  onChange={onPageChange}
                                                  itemsPerPage={itemsPerPage}/>}
            </div>
        </div>
    );
};

export default Cards;