import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './CardsHeader.module.css'
import sph from './../../f5-packs/p2-packs-header/packs-header.module.css'
import searchIcon from "../../../assets/search_icon.png";
import {useNavigate, useParams} from "react-router-dom";
import CardEditor from "../c4-card-editor/CardEditor";
import {useAppSelector} from "../../../s1-main/m2-bll/store";
import {useDispatch} from "react-redux";
import {fetchCards} from "../../../s1-main/m2-bll/card-reducer";

const CardsHeader = () => {
    const [searchValue, setSearchValue] = useState("");
    const [modeCardEditor, setModeCardEditor] = useState(false)
    const params = useParams()
    const dispatch = useDispatch()
    const pack = useAppSelector(state => state.pack.packs.find(p => p._id === params.packCardsId))
    const {status, filter} = useAppSelector(state => state.card)
    const navigate = useNavigate()

    const storedSearchValue = filter.cardQuestion;

    useEffect(() => {
        if (status === "loaded" && storedSearchValue !== searchValue) {
            dispatch(fetchCards({...filter, cardQuestion: searchValue}));
        }
    }, [dispatch, filter, status, searchValue])

    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    }
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
                        {" " + pack?.name}
                    </label>
                </div>
                <div className={s.searchBlock}>
                    <div className={s.search_container}>
                        <img src={searchIcon} alt="search packs"/>
                        <input className={sph.input} type="text"
                               name="search"
                               onChange={onSearchChange}
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