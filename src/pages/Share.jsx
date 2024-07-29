import React, { useState } from 'react';
import cstyles from '../assets/Chatbox.module.css';
import styles from '../assets/Share.module.css';

function Share() {
    const formSequence = [
        {
            key: "admin-Text:1",
            data: {
                role: "admin",
                src: "chat.png",
                type: "Text",
                hint: "Click here to edit",
                value: "Enter your name"
            }
        },
        {
            key: "user-Text:1",
            data: {
                role: "user",
                src: "text.png",
                type: "Text",
                hint: "input a text on his form"
            }
        },
        {
            key: "admin-Text:2",
            data: {
                role: "admin",
                src: "chat.png",
                type: "Text",
                hint: "Click here to edit",
                value: "Enter your email"
            }
        },
        {
            key: "user-Email:1",
            data: {
                role: "user",
                src: "at.png",
                type: "Email",
                hint: "input a email on his form"
            }
        }
    ];

    const [inputValue, setInputValue] = useState({});
    const [ratingValue, setRatingValue] = useState('');
    const [userData, setUserData] = useState({});

    const getInputValue = (key, value) => {
        setUserData((prevData) => ({
            ...prevData, [key]: value
        }));
    };

    const setIsSubmit = (key) => {
        const existingIndex = userData.find(item => item[key] === key);
    };

    const renderAdminContent = (item) => {
        if (item.data.type === 'Image' || item.data.type === 'GIF') {
            return <img src={item.data.value} alt="admin content" />;
        } else if (item.data.type === 'Video') {
            return (
                <video controls>
                    <source src={item.data.value} type="video/mp4" />
                </video>
            );
        } else {
            return item.data.value;
        }
    };

    const renderUserContent = (item) => {
        const { type } = item.data;
        if (type === 'Text' || type === 'Number' || type === 'Email' || type === 'Phone' || type === 'Date') {
            return (
                <div className={styles.inputs}>
                    <input type={type} id={item.key} onChange={(e) => getInputValue(item.key, e.target.value)} placeholder={`Enter your ${type}`} required/>
                    <button className={styles.submitBtn} onClick={() => setIsSubmit(item.key)}><img src="/icons/send.png" alt="send icon" /></button>
                </div>
            );
        } else if (type === 'Rate') {
            return (
                <div className={styles.inputs}>
                    <div className={styles.rating}>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <button key={i} onClick={() => getInputValue(item.key, i)}>{i}</button>
                        ))}
                    </div>
                    <button className={styles.submitBtn}><img src="/icons/send.png" alt="send icon" /></button>
                </div>
            );
        } else if (type === 'buttons') {
            return (
                <button key={index}>Click</button>
            );
        } else {
            return null;
        }
    };

    console.log(userData)

    return (
        <section className={styles.shareLayout}>
            <div className={`${styles.chatbox} ${cstyles.chatbox}`}>
                {formSequence.map((item) => (
                    <div key={item.key} className={cstyles[item.data.role]}>
                        {item.data.role === 'admin' ? (
                            <>
                                <img className={cstyles.chatHead} src="/images/chat-head-admin.png" alt="admin chat-head" />
                                <div className={cstyles.chat}>
                                    <span>{renderAdminContent(item)}</span>
                                </div>
                            </>
                        ) : (
                            <div className={cstyles.chat}>
                                <span>{renderUserContent(item)}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Share