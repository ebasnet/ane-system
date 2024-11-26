import { useEffect, useState } from 'react';
import { createContext } from "react";

const Context = createContext();

const SharedState = (props) => {

    const hostname = process.env.REACT_APP_HOSTNAME || "http://localhost:9090"

    const [loading, setLoading] = useState(false);

    const [user, setUser] = useState({});

    const [allForms, setAllForms] = useState({ data: {} });

    const [formCount, setFormCount] = useState('')

    const [allNotices, setAllNotices] = useState({ data: {} });

    const [noticeCount, setNoticeCount] = useState('')

    const [selectedClass, setSelectedClass] = useState('');

    // Dark Mode toggle
    const [mode, setMode] = useState(localStorage.getItem('mode') || 'light');
    const switchMode = () => {
        if (mode === 'dark') {
            setMode('light')
        }
        else {
            setMode('dark')
        }
    };
    useEffect(() => {
        localStorage.setItem('mode', mode)
    }, [mode])

    // For Alert Message
    const [alert, setAlert] = useState();
    const showAlert = (message, type, timer) => {
        setAlert({
            msg: message,
            type: type
        });
        setTimeout(() => {
            setAlert(null);
        }, timer);
    };

    //For Modal Toggle (HireMe.js)
    const [formID, setformID] = useState()
    const toggleModal = (formid) => {
        setformID(formid)
        const modal = new window.bootstrap.Modal(document.getElementById('exampleModal'));
        modal.toggle()
    }


    return (
        <Context.Provider value={{
            hostname,
            loading, setLoading,
            user, setUser,
            mode, switchMode,
            alert, showAlert,
            allForms, setAllForms,
            formCount, setFormCount,
            allNotices, setAllNotices,
            noticeCount, setNoticeCount,
            toggleModal, formID,
            selectedClass, setSelectedClass

        }}>

            {props.children}

        </Context.Provider>
    );
};

export { Context, SharedState };
