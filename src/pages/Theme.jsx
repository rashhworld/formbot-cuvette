import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { fetchFormByIdApi, updateFormApi } from "../apis/Form";
import Navbar from '../components/Navbar';
import cstyles from '../assets/Chatbox.module.css';
import styles from '../assets/Theme.module.css';

function Theme() {
    const token = useAuth();
    const [searchParams] = useSearchParams();

    const [formId, setFormId] = useState(searchParams.get('wid'));
    const [currentTheme, setCurrentTheme] = useState('light');

    const themes = [
        { name: "light", value: 1 },
        { name: "dark", value: 2 },
        { name: "blue", value: 3 }
    ];

    const fetchFormById = async () => {
        const data = await fetchFormByIdApi(formId, token);
        if (data) {
            const matchedTheme = themes.find(theme => theme.value === data.formTheme);
            setCurrentTheme(matchedTheme.name);
        }
    };

    const changeTheme = async (newTheme, value) => {
        setCurrentTheme(newTheme);
        const data = await updateFormApi(formId, { formTheme: value }, token);
        if (data) toast.success("Theme updated successfully.");
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
                            <button className={cstyles.click}>Hi!</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Theme