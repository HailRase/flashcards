import React from 'react';
import s from './Cards.module.css'
import CardsHeader from "./c1-cards-header/CardsHeader";
import Pagination from "../../s1-main/m1-ui/common/c4-Pagination/Pagination";
import CardsContent from "./c2-cards-content/CardsContent";

const Cards = () => {
    return (
        <div className={s.cardsContainer}>
            <div className={s.cards}>
                <CardsHeader/>
                <CardsContent/>
                <Pagination maxPage={20} onChange={() => {}} currentPage={1} itemsPerPage={10}/>
            </div>
        </div>
    );
};

export default Cards;