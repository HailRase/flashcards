import React, {ChangeEvent, useEffect, useState} from 'react';
import s from './CardEditor.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Navigate, useParams} from "react-router-dom";
import {fetchCards, updateCard} from "../../../s1-main/m2-bll/card-reducer";
import {StoreType, useAppSelector} from "../../../s1-main/m2-bll/store";
import {ICard} from "../../../s1-main/m3-dal/card";
import {TableSpinner} from "../../f5-packs/p3-packs-table/PacksTable";


const CardEditor = () => {
    const isAuth = useSelector<StoreType, boolean>(state => state.auth.isAuth);

    const {filter, status} = useAppSelector(state => state.card)
    const dispatch = useDispatch()
    const params = useParams()
    const card = useAppSelector<ICard>(state => state.card.cards.find((c: ICard) => c._id === params.cardId))
    const [question, setQuestion] = useState('')
    const [questionImg, setQuestionImg] = useState('')
    const [answer, setAnswer] = useState('')
    const [answerImg, setAnswerImg] = useState('')
    useEffect(() => {
        if (filter.cardsPack_id) {
            localStorage.setItem('cardsPackId', filter.cardsPack_id)
        }
    }, [filter])
    useEffect(() => {
        const cardsPack_id = localStorage.getItem('cardsPackId')
        if (status === 'init' && isAuth) {
            dispatch(fetchCards({...filter, cardsPack_id}))
        }
    }, [dispatch, filter, status, isAuth])
    useEffect(()=> {
        if (status === 'loaded') {
            setQuestion(card.question)
            setAnswer(card.answer)
            setAnswerImg(card.answerImg)
            setQuestionImg(card.questionImg)
        }
    }, [card, status])
    const onChangeCardQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value)
    }
    const onChangeCardAnswer = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value)
    }
    const onSaveChanges = () => {
        if (params.cardId)
            dispatch(updateCard({_id: params.cardId, question, answer, questionImg, answerImg}))
    }
    const onChangeQuestionImg = (e: ChangeEvent<HTMLInputElement>) => {
        uploadImg(e, setQuestionImg)
    }
    const onChangeAnswerImg = (e: ChangeEvent<HTMLInputElement>) => {
        uploadImg(e, setAnswerImg)
    }
    const uploadImg = (e: ChangeEvent<HTMLInputElement>, setStateAction: (value: string) => void) => {
        const reader = new FileReader();
        const newFile = e.target.files && e.target.files[0];
        if (newFile) {
            reader.onloadend = () => {
                setStateAction(reader.result as string)
            }
            reader.readAsDataURL(newFile);
        }
    }


    if (!isAuth) return <Navigate replace to={'/login'}/>
    return (
        <div className={s.editorContainer}>
            <div className={s.editor}>
                <span className={s.editorTitle}>Card Info</span>
                {status === 'loading'
                    ? <TableSpinner/>
                    : <div className={s.editorFields}>
                        <div className={s.editorField}>
                            <img src={questionImg} alt={'file'} width={'270'} className={s.cardImage}/>
                            <label className={s.fieldFile}>
                                <input type="file"
                                       accept=".jpg, .jpeg, .png"
                                       multiple
                                       onChange={onChangeQuestionImg}/>
                                + Attach file
                            </label>
                            <input className={s.fieldInput}
                                   type='text'
                                   value={question}
                                   placeholder={' '}
                                   onChange={onChangeCardQuestion}/>
                            <label className={s.fieldTitle}>Question</label>
                        </div>

                        <div className={s.editorField}>
                            <img src={answerImg} alt={'file'} width={'270'} className={s.cardImage}/>
                            <label className={s.fieldFile}>
                                <input type="file"
                                       accept=".jpg, .jpeg, .png"
                                       multiple
                                       onChange={onChangeAnswerImg}/>
                                + Attach file
                            </label>
                            <input className={s.fieldInput}
                                   type='text'
                                   value={answer}
                                   placeholder={' '}
                                   onChange={onChangeCardAnswer}/>
                            <label className={s.fieldTitle}>Answer</label>
                        </div>
                    </div>}
                <button onClick={onSaveChanges}>Save</button>
            </div>
        </div>
    );
};

export default CardEditor;