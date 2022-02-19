import {FC} from "react"

import s from "./packs-header.module.css"
import searchIcon from "../../../assets/search_icon.png";

const PacksHeader: FC = () => {
    return <div className={s.header}>
        <h2 className={s.title}>Packs List</h2>
        <div className={s.tools}>
            <div className={s.search_container}>
                <img src={searchIcon} alt="search packs"/>
                <input className={s.input} type="text" name="search" placeholder="Search..."/>
            </div>
            <button className={s.button}>Add New Pack</button>
        </div>
    </div>
}

export default PacksHeader