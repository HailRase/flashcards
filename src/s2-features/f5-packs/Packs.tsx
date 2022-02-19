import {FC, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {PATH} from "../../s1-main/m1-ui/routes/routes";
import {fetchPacks, PackState} from "../../s1-main/m2-bll/pack-reducer";
import {StoreType} from "../../s1-main/m2-bll/store";
import Sidebar from "./p1-sidebar/Sidebar";
import PacksHeader from "./p2-packs-header/PacksHeader";
import PacksTable from "./p3-packs-table/PacksTable";

import s from "./packs.module.css"

const Packs: FC = () => {
    const isAuth = useSelector<StoreType, boolean>(state => state.auth.isAuth);
    const {status, filter} = useSelector<StoreType, PackState>(state => state.pack);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === "init" && isAuth) {
            dispatch(fetchPacks(filter));
        }
    }, [status, isAuth, dispatch, filter])

    if (!isAuth) return <Navigate replace to={PATH.AUTH.LOGIN}/>

    return <div className={s.container}>
        <Sidebar/>
        <main className={s.main}>
            <PacksHeader/>
            <PacksTable/>
        </main>
    </div>
}

export default Packs