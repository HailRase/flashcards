import React from 'react';
import s from "./CardsTableHeader.module.css";

const CardsTableHeader = () => {
    return (
        <div className={s.header}>
            <div className={`${s.col_0} ${s.sort}`}
                 onClick={()=>{}}>Question {}</div>
            <div className={`${s.col_1} ${s.sort}`}
                 onClick={()=>{}}>Answer {}</div>
            <div className={`${s.col_2} ${s.sort}`}
                 onClick={()=>{}}>Last Updated {}</div>
            <div className={`${s.col_3} ${s.sort}`}
                 onClick={()=>{}}>Grade{}</div>
            <div className={s.col_4}>Actions</div>

        </div>
    );
};

export default CardsTableHeader;