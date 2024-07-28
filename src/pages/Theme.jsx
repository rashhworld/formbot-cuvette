import React, { useState, useEffect } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import { handleApiRes, handleApiErr } from '../utils/apiUtils'
import Navbar from '../components/Navbar'

import cstyles from '../assets/Chatbox.module.css'
import styles from '../assets/Theme.module.css'

function Theme() {
    const token = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const [formId, setFormId] = useState(searchParams.get('wid'));
    const [currentTheme, setCurrentTheme] = useState('light');

    const themes = [
        { name: "light", value: 1 },
        { name: "dark", value: 2 },
        { name: "blue", value: 3 }
    ];

    const fetchFormById = async () => {
        try {
            const response = await axios.get(`${baseURL}/form/view/${formId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status, data } = response.data;
            if (status === 'success') {
                const matchedTheme = themes.find(theme => theme.value === data.formTheme);
                setCurrentTheme(matchedTheme.name);
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
        }
    };

    const changeTheme = async (newTheme, value) => {
        setCurrentTheme(newTheme);
        try {
            const response = await axios.patch(`${baseURL}/form/update/${formId}`, { formTheme: value }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status } = response.data;
            if (status === 'success') {
                toast.success("Theme updated successfully.")
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
        }
    };

    useEffect(() => {
        if (token) {
            if (formId) fetchFormById();
        }
    }, [token]);

    return (
        <main className={styles.theme}>
            <Navbar />
            <div className={styles.sidebar}>
                <span className={styles.title}>Customize the theme</span>
                <hr className={styles.hr} />
                {themes.map((theme, key) => (
                    <div key={key} className={`${styles.card} ${currentTheme === theme.name && styles.active}`} onClick={() => changeTheme(theme.name, theme.value)}>
                        <img src={`/images/theme-${theme.name}.jpg`} alt={`${theme.name} Theme`} />
                        <span className={styles.type}>{theme.name}</span>
                    </div>
                ))}
            </div>
            <div className={`${styles.content} ${styles[currentTheme]}`}>
                <div className={cstyles.chatbox}>
                    <div className={cstyles.admin}>
                        <img className={cstyles.chatHead} src="/images/vectors/chat-head.png" alt="admin chat-head" />
                        <div className={cstyles.chat}>
                            <span>Hello!</span>
                        </div>
                    </div>
                    <div className={cstyles.user}>
                        <div className={cstyles.chat}>
                            <span className={cstyles.click}>Hi!</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Theme