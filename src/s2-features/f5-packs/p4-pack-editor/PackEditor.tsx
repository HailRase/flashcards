import React, {ChangeEvent, useState} from 'react';
import s from './PackEditor.module.css'
import sph from './../p2-packs-header/packs-header.module.css'
import {createPack} from "../../../s1-main/m2-bll/pack-reducer";
import {useDispatch} from "react-redux";




const PackEditor = () => {

    const [packName, setPackName] = useState("")
    const dispatch = useDispatch()
    const createPackHandler = () => {
        dispatch(createPack(packName));
        setPackName("")
    }

    const onChangePackName = (e: ChangeEvent<HTMLInputElement>) => {
        setPackName(e.currentTarget.value)
    }
    return (
        <div className={s.editorPackContainer}>
            <div className={s.overlay}></div>
            <div className={s.editorContainer}>
                <div className={s.editor}>
                    <div className={s.editorHeader}>
                        <span>Add New Pack</span>
                    </div>
                    <div className={s.editorBody}>
                        <div className={s.packField}>
                            <input className={s.fieldInput} value={packName} placeholder={" "} type="text" onChange={onChangePackName}/>
                            <label className={s.fieldLabel}>Pack name</label>
                        </div>
                    </div>
                    <div className={s.editorFooter}>
                        <button className={sph.button} onClick={createPackHandler}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackEditor;