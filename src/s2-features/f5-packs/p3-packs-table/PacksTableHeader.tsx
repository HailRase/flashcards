import {FC} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPacks, PackState, SortPacks} from "../../../s1-main/m2-bll/pack-reducer";
import {StoreType} from "../../../s1-main/m2-bll/store";

import s from "./packs-table.module.css";
import sortIcon from "../../../assets/sort_icon.png";

const PacksTableHeader: FC = () => {
    const {filter} = useSelector<StoreType, PackState>(state => state.pack);
    const dispatch = useDispatch();

    const currentOrder = +filter.sortPacks.substring(0, 1); // 1 | 0
    const currentSortBy = filter.sortPacks.substring(1); // name | updated | cardsCount

    const changeSort = (sortBy: string, order: number) => {
        const sortPacks = `${order}${sortBy}` as SortPacks;
        dispatch(fetchPacks({...filter, sortPacks}))
    }

    const sortByName = () => {
        if (currentSortBy === "name") {
            changeSort("name", currentOrder ? 0 : 1);
        } else {
            changeSort("name", 0);
        }
    }

    const sortByNumber = () => {
        if (currentSortBy === "cardsCount") {
            changeSort("cardsCount", currentOrder ? 0 : 1);
        } else {
            changeSort("cardsCount", 0);
        }
    }

    const sortByDate = () => {
        if (currentSortBy === "updated") {
            changeSort("updated", currentOrder ? 0 : 1);
        } else {
            changeSort("updated", 0);
        }
    }

    const sortByUser = () => {
        if (currentSortBy === "user_name") {
            changeSort("user_name", currentOrder ? 0 : 1);
        } else {
            changeSort("user_name", 0);
        }
    }

    const Icon = <img
        src={sortIcon}
        alt="sort"
        className={`${s.sort_icon} ${currentOrder && s.sort_icon_upwards}`}/>

    return <div className={s.header}>

        <div className={`${s.col_0} ${s.sort}`}
             onClick={sortByName}>Name {currentSortBy === "name" && (Icon)}</div>

        <div className={`${s.col_1} ${s.sort}`}
             onClick={sortByNumber}>Cards {currentSortBy === "cardsCount" && (Icon)}</div>

        <div className={`${s.col_2} ${s.sort}`}
             onClick={sortByDate}>Last Updated {currentSortBy === "updated" && (Icon)}</div>

        <div className={`${s.col_3} ${s.sort}`}
             onClick={sortByUser}>Created By {currentSortBy === "user_name" && (Icon)}</div>

        <div className={s.col_4}>Actions</div>

    </div>
}

export default PacksTableHeader