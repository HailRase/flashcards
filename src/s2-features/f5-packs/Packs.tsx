import {FC} from "react";
import {useSelector} from "react-redux";
import {Navigate} from "react-router-dom";
import {PATH} from "../../s1-main/m1-ui/routes/routes";
import {StoreType} from "../../s1-main/m2-bll/store";

import s from "./packs.module.css"

const Packs: FC = () => {
    const isAuth = useSelector<StoreType, boolean>(state => state.auth.isAuth);


    if (!isAuth) return <Navigate replace to={PATH.AUTH.LOGIN}/>

    return <div className={s.container}>Packs Page</div>
}

export default Packs