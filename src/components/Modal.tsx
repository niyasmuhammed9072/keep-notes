import React, { MouseEvent, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setEditNote, setIsVisible } from '../store/slices/editSlices'
import { addNotes, updateNote } from '../store/slices/notesSlices'
import { nanoid } from 'nanoid'

type ModalProps = {
    addNew: boolean
}

const Modal = (props: ModalProps) => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [edit, setEdit] = useState(false)
    const [select, setSelect] = useState('')
    const { editNote, isVisible } = useAppSelector((state) => state.editSlices)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setTitle(editNote?.title)
        setContent(editNote?.content)
        setSelect(editNote?.category)
    }, [isVisible])


    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
        const divElement = e.target as HTMLDivElement;
        if (divElement.id === 'outerDiv') {
            dispatch(setIsVisible(false))
            dispatch(setEditNote({}))
        }
    }

    const handleSubmit = () => {
        if (!title || !content) return
        if (!edit && !props.addNew) {
            setEdit(true)
            return
        }
        if (props.addNew) {
            const newNote = {
                id: nanoid(),
                title: title,
                content: content,
                category: select,
                date: new Date()
            }
            dispatch(addNotes(newNote))
            setTitle('')
            setContent('')
            dispatch(setIsVisible(false))
            return
        }
        const editedNote = {
            id: editNote.id,
            title: title,
            content: content,
            category: select,
            date: new Date()
        }
        dispatch(updateNote(editedNote))
        dispatch(setIsVisible(false))
        setEdit(false)

    }
    if (!isVisible) return null
    return (
        <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center' id='outerDiv' onClick={(e) => handleClick(e)}>
            <div className=' w-96 border-zinc-300 bg-white border-[1px] rounded-xl p-5 flex flex-col gap-4'>
                <input className="focus:outline-none" type="text" readOnly={edit ? false : props.addNew ? false : true} value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                <select className='w-24  border-[1px] border-gray-300 rounded' name='category' value={select} onChange={(e) => setSelect(e.target.value)}>
                    <option value="food">Food</option>
                    <option value="job">Job</option>
                    <option value="family">Family</option>
                    <option value="personal">Personal</option>
                </select>
                <textarea
                    className="focus:outline-none"
                    rows={3}
                    cols={10}
                    placeholder='Content...'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    readOnly={edit ? false : props.addNew ? false : true}
                />
                <div className="flex justify-end">
                    <button onClick={() => handleSubmit()} className="bg-gray-200 py-1 px-3 rounded">{edit || props.addNew ? 'Save' : 'Edit'}</button>
                </div>
            </div>
        </div>
    )
}

export default Modal