import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<PropsType> = ({addItem}) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const addItemHandler = () => {
        if (value.trim() !== '') {
            addItem(value)
            setValue('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler();
        }
    }

    return (
        <div>
            <input value={value}
                   onChange={changeValueHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItemHandler}>+</button>
            {error ? <div className="error-message">{error}</div> : ''}
        </div>
    )
}