import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import cstyles from '../assets/Chatbox.module.css'
import styles from '../assets/Theme.module.css'

function Theme() {
    const [currentTheme, setCurrentTheme] = useState('light');
    const themes = ['light', 'dark', 'blue'];

    const changeTheme = (newTheme) => () => {
        setCurrentTheme(newTheme);
        console.log(newTheme)
    };

    return (
        <main className={styles.theme}>
            <Navbar />
            <div className={styles.sidebar}>
                <span className={styles.title}>Customize the theme</span>
                <hr className={styles.hr} />
                {themes.map((theme) => (
                    <div key={theme} className={`${styles.card} ${currentTheme === theme && styles.active}`} onClick={changeTheme(theme)}>
                        <img src={`/images/theme-${theme}.jpg`} alt={`${theme} Theme`} />
                        <span className={styles.type}>{theme}</span>
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