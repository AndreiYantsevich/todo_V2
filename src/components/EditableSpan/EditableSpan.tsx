import React, { ChangeEvent, useState } from 'react';
import style from './EditableSpan.module.css'
import TextField from '@mui/material/TextField';


type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled: boolean | undefined
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log('EditableSpan called');
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        : <span onDoubleClick={activateEditMode} className={props.disabled ? style.disabledSpan : ''}>{props.value}</span>
});
