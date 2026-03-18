import React, { FormEvent, useState } from 'react'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'

const SignInPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        } catch (err) {
            toast.error('error')
            console.error(err)
        }
    }
    return (
        <div className="flex justify-center">
            <div className="my-[3rem] mx-4 py-[3rem] bg-white rounded-lg w-[440px] shadow-lg">
                <h2 className=" text-center text-3xl font-bold">
                    Sign in
                </h2>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="px-[3rem] pt-[1rem] flex flex-col mt-[2rem]"
                >
                    <label className="text-sm mt-5" htmlFor="userName">
                        Email
                    </label>
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3"
                    />
                    <label className="text-sm mt-5" htmlFor="userName">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 rounded focus:outline-none w-full h-10 p-3"
                    />
                    <div>
                        <button
                            type="submit"
                            className="border border-darkBlue px-6 py-2 mt-4 rounded font-bold hover:shadow-md"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
                <div className="ml-[3rem]">
                    <p className="text-xs mt-4 mb-1 text-lightBlue">
                        Don't have an account? <Link className='text-blue-400' to={"/signup"}>Sign up.</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignInPage