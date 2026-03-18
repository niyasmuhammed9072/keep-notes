import React from "react";
import { useState } from "react";
import Header from "../components/Header";
import NotesList from "../components/NotesList";
import Modal from "../components/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FiEdit } from "react-icons/fi";
import { setIsVisible } from "../store/slices/editSlices";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const notes = useAppSelector((state) => state.notes);
    const [addNew, setAddNew] = useState(false);
    const [filter, setFilter] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const user = auth.currentUser?.getIdToken;
    const handleClick = () => {
        if (!user) {
            navigate("/signin");
            return;
        }
        dispatch(setIsVisible(true));
        setAddNew(true);
    };
    return (
        <>
            <Header />
            <div className="p-5 flex justify-center gap-3">
                <div
                    onClick={() => handleClick()}
                    className="cursor-pointer justify-between items-center w-96 border-zinc-300 border-[1px] rounded  p-3 flex gap-4"
                >
                    <p>Take a note...</p>
                    <FiEdit />
                </div>
                <select
                    className="w-24 border-[1px] border-gray-300 focus:border-gray-300 rounded md:mr-14"
                    placeholder="Filter"
                    name="category"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="">Filter</option>
                    <option value="food">Food</option>
                    <option value="job">Job</option>
                    <option value="family">Family</option>
                    <option value="personal">Personal</option>
                </select>
            </div>
            <NotesList notes={notes} filterData={filter} />
            <Modal addNew={addNew} />
        </>
    );
};

export default HomePage;
