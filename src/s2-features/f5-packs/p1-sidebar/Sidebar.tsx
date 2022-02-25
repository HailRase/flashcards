import {FC, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchPacks, PackFilter, PackStatus} from "../../../s1-main/m2-bll/pack-reducer";
import {StoreType} from "../../../s1-main/m2-bll/store";
import s from "./sidebar.module.css"
import DoubleRange, {
    RangeValue
} from "../../../s1-main/m1-ui/common/DoubleRange/DoubleRange";
import usePackRange from "../../../s3-utils/usePackRange";

const Sidebar: FC = () => {
    const id = useSelector<StoreType, string>(state => state.auth.userData?._id || "");
    const filter = useSelector<StoreType, PackFilter>(state => state.pack.filter);
    const dispatch = useDispatch();

    const handleRangeChange = usePackRange();

    const filterId = filter.user_id;
    const cards = id.length && id === filterId ? "my" : "all";


    const onSelect = (select: string) => {
        if (cards === "all" && select === "my") {
            dispatch(fetchPacks({...filter, user_id: id, page: 1}));
        }

        if (cards === "my" && select === "all") {
            dispatch(fetchPacks({...filter, user_id: ""}));
        }
    }

    return <aside className={s.sidebar}>
        <div className={s.title}>Show Packs</div>
        <div className={s.select_container}>
            <div className={`${s.select} ${cards === "my" && s.selected}`} onClick={() => onSelect("my")}>
                My
            </div>
            <div className={`${s.select} ${cards === "all" && s.selected}`} onClick={() => onSelect("all")}>
                All
            </div>
        </div>
        <div className={s.doubleRangeContainer}>
            <div className={s.title}>Number of cards</div>
            <DoubleRange min={0} max={150} onChange={handleRangeChange}/>
        </div>

    </aside>
}

export default Sidebar;