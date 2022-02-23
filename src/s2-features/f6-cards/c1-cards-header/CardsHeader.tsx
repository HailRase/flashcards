import React, {useState} from 'react';
import s from './CardsHeader.module.css'
import sph from './../../f5-packs/p2-packs-header/packs-header.module.css'
import searchIcon from "../../../assets/search_icon.png";
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../../s1-main/m2-bll/store";
import CardEditor from "../c4-card-editor/CardEditor";

const CardsHeader = () => {

    const [modeCardEditor, setModeCardEditor] = useState(false)
    const navigate = useNavigate()
    const onPacksNavigate = () => {
        navigate('/packs')
    }
    const onModeChange = () => {
        setModeCardEditor(true)
    }
    return (
        <div className={s.headerContainer}>
            <div className={s.header}>
                <div className={s.arrowBack}>
                    <label className={s.back} onClick={onPacksNavigate}>
                        &larr;
                        Pack name
                    </label>
                </div>
                <div className={s.searchBlock}>
                    <div className={s.search_container}>
                        <img src={searchIcon} alt="search packs"/>
                        <input className={sph.input} type="text"
                               name="search"
                               placeholder="Search..."/>
                    </div>
                    <button className={sph.button} onClick={onModeChange}>Add Card</button>
                </div>
            </div>
            {modeCardEditor && <CardEditor modeCardEditor={modeCardEditor} setModeCardEditor={setModeCardEditor}/>}
        </div>
    );
};

export default CardsHeader;