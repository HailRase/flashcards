import {ChangeEvent, FC, useEffect, useState} from "react"

import s from "./packs-header.module.css"
import searchIcon from "../../../assets/search_icon.png";
import {useDispatch, useSelector} from "react-redux";
import {StoreType} from "../../../s1-main/m2-bll/store";
import {fetchPacks, PackState} from "../../../s1-main/m2-bll/pack-reducer";
import PackEditor from "../p4-pack-editor/PackEditor";
import Modal from "../../../s1-main/m1-ui/common/Modal/Modal";

const PacksHeader: FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [modePackEditor, setModePackEditor] = useState(false)
    const {status, filter} = useSelector<StoreType, PackState>(state => state.pack);
    const dispatch = useDispatch();


    useEffect(() => {
        const storedSearchValue = filter.packName;
        if (status === "loaded" && storedSearchValue !== searchValue) {
            dispatch(fetchPacks({...filter, packName: searchValue}));
        }
    }, [dispatch, filter, status, searchValue])

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    }
    const handleModalOpen = () => {
        setModePackEditor(true)
    }

    const handleModalClose = () => {
        setModePackEditor(false);
    }

    return <div className={s.header}>
        <h2 className={s.title}>Packs List</h2>
        <div className={s.tools}>
            <div className={s.search_container}>
                <img src={searchIcon} alt="search packs"/>
                <input className={s.input} type="text" value={searchValue} onChange={onSearchChange} name="search"
                       placeholder="Search..."/>
            </div>
            <button className={s.button} onClick={handleModalOpen}>Add New Pack</button>
        </div>
        <Modal active={modePackEditor} onClose={handleModalClose}>
            <PackEditor onClose={handleModalClose}/>
        </Modal>
    </div>
}

export default PacksHeader