import {FC, MouseEvent} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePack, PackState} from "../../../s1-main/m2-bll/pack-reducer";
import {StoreType} from "../../../s1-main/m2-bll/store";
import s from "./packs-table.module.css"
import spinner from "../../../assets/spinner.gif";
import deleteIcon from "../../../assets/delete_icon.svg";
import editIcon from "../../../assets/edit_icon.svg";
import eyeIcon from "../../../assets/eye_icon.svg"
import PacksTableHeader from "./PacksTableHeader";
import {useNavigate} from "react-router-dom";
import {setCardStatus} from "../../../s1-main/m2-bll/card-reducer";

const EmptyRow = (i: number) => {
    return <div key={i} className={`${s.row} ${i % 2 && s.dark}`}>
        <div className={s.col_0}></div>
        <div className={s.col_1}></div>
        <div className={s.col_2}></div>
        <div className={s.col_3}></div>
        <div className={s.col_4}></div>
    </div>
}

export const TableSpinner = () => {
    return <img className={s.spinner} src={spinner} alt="loading spinner"/>
}

const formatStr = (str: string, maxLen: number) => {
    if (str.length > 32) {
        return str.substring(0, maxLen) + "...";
    }

    return str;
}

const PacksTable: FC = () => {
    const {filter, packs, status} = useSelector<StoreType, PackState>(state => state.pack)
    const id = useSelector<StoreType, string | undefined>(state => state.auth.userData?._id) || "";
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {pageCount} = filter;

    const deletePackHandler = (e: MouseEvent<HTMLImageElement>) => {
        dispatch(deletePack(e.currentTarget.dataset.id || ""))
    }
    const toPackCards = (cardsPack_id: string) => {
      navigate(`/cards/${cardsPack_id}`)
        dispatch(setCardStatus("init"))
    }
    const Rows = status === "loaded" && packs.map((pack, i) => {
        return (
            <div key={pack._id} className={`${s.row} ${(i % 2) && s.dark}`}>
                <div className={s.col_0}><span onClick={() => toPackCards(pack._id)}>{formatStr(pack.name, 29)}</span></div>
                <div className={s.col_1}>{pack.cardsCount}</div>
                <div className={s.col_2}>{pack.updated.substring(0, 10)}</div>
                <div className={s.col_3}>{formatStr(pack.user_name, 29)}</div>
                <div className={s.col_4}>{pack.user_id === id &&
                    <>
                        <img src={deleteIcon}
                             alt="delete my pack"
                             data-id={pack._id}
                             onClick={deletePackHandler}
                             className={`${s.icon} ${s.icon_red}`}/>

                        <img src={editIcon} alt="edit my pack" className={`${s.icon} ${s.icon_blue}`}/>
                    </>}
                    <img src={eyeIcon} alt="view cards" className={`${s.icon} ${s.icon_blue}`}/>
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