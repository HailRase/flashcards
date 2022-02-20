import React from 'react';
import s from './Cards.module.css'
import CardsHeader from "./c1-cards-header/CardsHeader";

const Cards = () => {
    return (
        <div className={s.cardsContainer}>
            <div className={s.cards}>
                <CardsHeader/>
            </div>
        </div>
    );
};

export default Cards;