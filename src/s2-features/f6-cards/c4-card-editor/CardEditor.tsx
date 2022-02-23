import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './CardEditor.module.css'
import sph from './../../f5-packs/p2-packs-header/packs-header.module.css'
import {useDispatch} from "react-redux";
import {createCard, fetchCards, setCardStatus} from "../../../s1-main/m2-bll/card-reducer";
import {useParams} from "react-router-dom";

type CardEditorPropsType = {
    modeCardEditor: boolean
    setModeCardEditor: (value: boolean) => void
}

const CardEditor: React.FC<CardEditorPropsType> = ({modeCardEditor, setModeCardEditor}) => {
    const params = useParams()
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")
    const dispatch = useDispatch()
    const createPackHandler = () => {
        if (params.packCardsId) {
            dispatch(createCard(params.packCardsId, question, answer));
            dispatch(setCardStatus("loading"))
        }
        setModeCardEditor(false)
        setQuestion("")
    }
    const onChangePackMode = () => {
        setModeCardEditor(false)
    }
    const onChangeCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeCardAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }

    return (
        <div className={s.editorCardContainer}>
            <div className={s.overlay}></div>
            <div className={s.editorContainer}>
                <div className={s.editor}>
                    <div className={s.editorHeader}>
                        <span>Add New Card</span>
                    </div>
                    <div className={s.editorBody}>
                        <div className={s.cardField} style={{top: "120px"}}>
                            <input className={`${s.fieldInput}`} value={question} placeholder={" "} type="text"
                                   onChange={onChangeCardQuestion}/>
                            <label className={`${s.fieldLabel}`}>Question</label>
                        </div>
                        <div className={s.cardField} style={{top: "260px"}}>
                            <input className={`${s.fieldInput}`} value={answer} placeholder={" "} type="text"
                                   onChange={onChangeCardAnswer}/>
                            <label className={`${s.fieldLabel}`}>Answer</label>
                        </div>
                    </div>
                    <div className={s.editorFooter}>
                        <button className={sph.button} onClick={createPackHandler}>Add</button>
                        <button className={sph.button} onClick={onChangePackMode}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardEditor;