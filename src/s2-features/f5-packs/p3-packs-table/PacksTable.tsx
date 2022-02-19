import {FC} from "react";
import {useSelector} from "react-redux";
import {PackState} from "../../../s1-main/m2-bll/pack-reducer";
import {StoreType} from "../../../s1-main/m2-bll/store";

import s from "./packs-table.module.css"

import spinner from "../../../assets/spinner.gif";
import PacksTableHeader from "./PacksTableHeader";

const EmptyRow = (i: number) => {
    return <div key={i} className={`${s.row} ${i % 2 && s.dark}`}>
        <div className={s.col_0}> </div>
        <div className={s.col_1}> </div>
        <div className={s.col_2}> </div>
        <div className={s.col_3}> </div>
        <div className={s.col_4}> </div>
    </div>
}

const TableSpinner = () => {
    return <img className={s.spinner} src={spinner} alt="loading spinner"/>
}

const PacksTable: FC = () => {
    const {filter, packs, status} = useSelector<StoreType, PackState>(state => state.pack)
    const id = useSelector<StoreType, string | undefined>(state => state.auth.userData?._id) || "";
    const {pageCount} = filter;

    const Rows = status === "loaded" && packs.map((pack, i) => {
        return (<div key={pack._id} className={`${s.row} ${(i % 2) && s.dark}`}>
            <div className={s.col_0}>{pack.name}</div>
            <div className={s.col_1}>{pack.cardsCount}</div>
            <div className={s.col_2}>{pack.updated.substring(0, 10)}</div>
            <div className={s.col_3}>{pack.user_name}</div>
            <div className={s.col_4}>{pack.user_id === id && <>
                <button>e</button>
                <button>x</button>
            </>}
                <button>learn</button>
            </div>
        </div>)
    });

    // Create empty rows
    let EmptyRows: JSX.Element[] = [];
    if (pageCount > packs.length) {
        if (!packs.length) {
            for (let i = 0; i < pageCount; i++) {
                EmptyRows.push(EmptyRow(i))
            }
        } else {
            for (let i = packs.length; i < pageCount; i++) {
                EmptyRows.push(EmptyRow(i))
            }
        }
    }

    if (status !== "loaded") {
        return <div className={s.table}>
            <PacksTableHeader/>
            <TableSpinner/>
        </div>
    }

    return <div className={s.table}>
        <PacksTableHeader/>
        {Rows}
        {EmptyRows}
    </div>
}

export default PacksTable;