import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './CardsHeader.module.css'
import sph from './../../f5-packs/p2-packs-header/packs-header.module.css'
import searchIcon from "../../../assets/search_icon.png";
import {useNavigate, useParams} from "react-router-dom";
import {StoreType, useAppSelector} from "../../../s1-main/m2-bll/store";
import {useDispatch, useSelector} from "react-redux";
import {fetchCards} from "../../../s1-main/m2-bll/card-reducer";
import {fetchPacks} from "../../../s1-main/m2-bll/pack-reducer";

const CardsHeader = () => {
    const [searchValue, setSearchValue] = useState("");
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const params = useParams()
    const dispatch = useDispatch()
    const isAuth = useSelector<StoreType, boolean>(state => state.auth.isAuth);
    const pack = useAppSelector(state => state.pack.packs.find(p => p._id === params.packCardsId))
    const id = useSelector<StoreType, string | undefined>(state => state.auth.userData?._id) || "";
    const {status: cardsStatus, filter: cardsFilter} = useAppSelector(state => state.card)
    const {status: packStatus, filter: packFilter} = useAppSelector(state => state.pack)

    const navigate = useNavigate()
    const storedSearchValue = cardsFilter.cardQuestion;
    useEffect(() => {                           //возможно из-за этого запроса умирает кука
        if (packStatus === "init" && isAuth) {
            dispatch(fetchPacks({...packFilter, }));
        }
    }, [dispatch, packFilter, packStatus, isAuth])

    useEffect(() => {
        if (cardsStatus === "loaded" && storedSearchValue !== searchValue) {
            dispatch(fetchCards({...cardsFilter, cardQuestion: searchValue}));
        }
    }, [dispatch, cardsFilter, cardsStatus, searchValue])
    const changeWidth = () => {
        setScreenWidth(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', changeWidth)
        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    }, [])
    const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.currentTarget.value);
    }
    const onPacksNavigate = () => {
        navigate('/packs')
    }
    return (
        <div className={s.headerContainer}>
            <div className={s.header}>
                <div className={s.arrowBack}>
                    <label className={s.back} onClick={onPacksNavigate}>
                        &larr;
                        {packStatus === "loaded" && pack?.name && " " + pack.name}
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
                    {pack?.user_id === id && <button style={{marginLeft: "15px"}}
                                                     className={sph.button}>{screenWidth <= 770 ? "+" : "Add Card"}
                    </button>
                    }
                </div>
            </div>
        </div>
    );
};

export default CardsHeader;