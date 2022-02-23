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
import Pagination from "../../s1-main/m1-ui/common/c4-Pagination/Pagination";

const Packs: FC = () => {
    const isAuth = useSelector<StoreType, boolean>(state => state.auth.isAuth);
    const {status, filter, packsTotal} = useSelector<StoreType, PackState>(state => state.pack);
    const dispatch = useDispatch();

    const itemsPerPage = filter.pageCount
    const maxPageNumber = Math.ceil(packsTotal / itemsPerPage)

    useEffect(() => {
        if (status === "init" && isAuth) {
            dispatch(fetchPacks(filter));
        }
    }, [status, isAuth, dispatch, filter])

    const onPageChange = (page: number) => {
        dispatch(fetchPacks({...filter, page}))
    }

    if (!isAuth) return <Navigate replace to={PATH.AUTH.LOGIN}/>

    return <div className={s.packsContainer}>
        <div className={s.packs}>
            <Sidebar/>
            <main className={s.main}>
                <PacksHeader/>
                <PacksTable/>
                {maxPageNumber > 1 && <Pagination currentPage={filter.page}
                                                  maxPage={maxPageNumber}
                                                  onChange={onPageChange}
                                                  itemsPerPage={itemsPerPage}/>}
            </main>
        </div>
    </div>
}

export default Packs