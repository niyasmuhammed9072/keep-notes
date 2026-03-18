import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { setSearchText } from '../store/slices/searchSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const Header = () => {
    const { searchText } = useAppSelector((state) => state.searchSlice)
    const [temp, setTemp] = useState(false)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const user = auth.currentUser?.getIdToken

    const handleLogout = async () => {
        if (!user) {
            navigate('/signin')
            return
        }
        try {
            await signOut(auth);
            toast.success('Logout successful')
            setTemp(!temp)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className='border-b pt-2 pb-3 flex justify-between gap-2 items-center md:px-20 px-5'>
            <h1 className='text-xl font-bold'>Keep Notes</h1>
            <div className='w-25 md:w-96 p-2 bg-gray-100 rounded-md flex gap-2 items-center'>
                <CiSearch />
                <input type="text" value={searchText} onChange={(e) => dispatch(setSearchText(e.target.value))} className='bg-gray-100 focus:outline-none' placeholder='Search..' />
            </div>
            <button onClick={() => handleLogout()} className='py-2 px-3 bg-gray-200 hover:bg-gray-300 rounded'>{user ? 'Logout' : 'Sign in'}</button>
        </div>
    )
}

export default Header