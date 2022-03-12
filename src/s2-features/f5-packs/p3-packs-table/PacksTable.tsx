import {FC, MouseEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deletePack, PackState} from "../../../s1-main/m2-bll/pack-reducer";
import {StoreType} from "../../../s1-main/m2-bll/store";
import s from "./packs-table.module.css"
import spinner from "../../../assets/spinner.gif";
import deleteIcon from "../../../assets/delete_icon.svg";
import editIcon from "../../../assets/edit_icon.svg";
import learn from "../../../assets/open-book.png"
import PacksTableHeader from "./PacksTableHeader";
import {useNavigate} from "react-router-dom";
import {setCardStatus} from "../../../s1-main/m2-bll/card-reducer";
import {formatStr} from "../../../s3-utils/formatStrt";
import PopUp from "../../../s1-main/m1-ui/common/c5-PopUp/PopUp";
import DeletePack from "../p4-pack-editor/e1-delete-pack/DeletePack";

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
    return <div className={s.spinnerContainer}><img className={s.spinner} src={spinner} alt="loading spinner"/></div>
}
const PacksTable: FC = () => {
    const [popupVisible, setPopupVisible] = useState<boolean>(false)
    const [pack, setPack] = useState({
        packId: '',
        packName: ''
    })
    const {filter, packs, status} = useSelector<StoreType, PackState>(state => state.pack)
    const id = useSelector<StoreType, string | undefined>(state => state.auth.userData?._id) || "";
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const {pageCount} = filter;

     const onDeletePackHandler = (packId: string) => {
         dispatch(deletePack(packId || ""))
         setPopupVisible(false)
     }
    const toPackCards = (cardsPack_id: string) => {
        navigate(`/cards/${cardsPack_id}`)
        dispatch(setCardStatus("init"))
    }
    const toLearnPage = (cardsPack_id: string) => {
        navigate(`/packs/${cardsPack_id}`)
        dispatch(setCardStatus("init"))
    }
    const onDeletePopupHandler = (pack: { packId: string, packName: string }) => {
        setPopupVisible(true)
        setPack(pack)
    }
    const Rows = status === "loaded" && packs.map((pack, i) => {
        return (
            <div key={pack._id} className={`${s.row} ${(i % 2) && s.dark}`}>
                <div className={s.col_0}><span onClick={() => toPackCards(pack._id)}>{formatStr(pack.name, 29)}</span>
                </div>
                <div className={s.col_1}>{pack.cardsCount}</div>
                <div className={s.col_2}>{pack.updated.substring(0, 10)}</div>
                <div className={s.col_3}>{formatStr(pack.user_name, 29)}</div>
                <div className={s.col_4}>{pack.user_id === id &&
                    <>
                        <img src={deleteIcon}
                             alt="delete my pack"
                             data-id={pack._id}
                             onClick={() => onDeletePopupHandler({packId: pack._id, packName: pack.name})}
                             className={`${s.icon} ${s.icon_red}`}/>

                        <img onClick={() => {}} src={editIcon} alt="edit my pack"
                             className={`${s.icon} ${s.icon_blue}`}/>
                    </>}
                    <img src={learn} alt="view cards" className={`${s.icon} ${s.icon_blue}`}
                         onClick={() => toLearnPage(pack._id)}/>
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
        {popupVisible && <PopUp active={popupVisible} setActive={setPopupVisible} title={'Delete pack'}>
            <DeletePack packId={pack.packId} packName={pack.packName} deletePack={onDeletePackHandler}/>
        </PopUp>}
    </div>
}

export default PacksTable;