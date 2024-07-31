import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { shareFormApi, countFormHitApi, saveFormResponseApi } from "../apis/Form";
import cstyles from '../assets/Chatbox.module.css';
import styles from '../assets/Share.module.css';

function Share() {
    const { wid } = useParams();
    const vid = Math.floor(10000 + Math.random() * 90000);
    const startDate = moment().format('MMM DD, hh:mm A');

    const [formData, setFormData] = useState({});
    const [formSequence, setFormSequence] = useState({});
    const [formResponse, setFormResponse] = useState({ vid, startDate });

    const [activeRating, setActiveRating] = useState('');
    const [hitFlag, setHitFlag] = useState(true);
    const [shareBox, setShareBox] = useState([]);
    const [shareBoxIndex, setShareBoxIndex] = useState(0);
    const [disableFlagArr, setDisableFlagArr] = useState([]);

    const fetchFormById = async () => {
        const data = await shareFormApi(wid);
        if (data) {
            setFormData(data); setFormSequence(data.formSequence);

        }
    };

    const getInputValue = (key, value) => {
        setFormResponse((prevData) => ({
            ...prevData, [key]: value
        }));
    };

    const setIsSubmit = async (key, e) => {
        e && e.preventDefault();
        if (!key.includes("Button") && !(key in formResponse)) return;
        await saveFormResponseApi(wid, formResponse);
        console.log(formResponse)

        setDisableFlagArr(prevArray => {
            const newArray = [...prevArray];
            newArray[shareBoxIndex] = true;
            return newArray;
        });

        const n = formSequence.length;
        let idx = shareBoxIndex;
        const newItems = [];

        while (idx + 1 < n) {
            idx += 1;
            newItems.push(formSequence[idx]);
            if (formSequence[idx].data.role === 'user') {
                break;
            }
        }

        setShareBox((prev) => [...prev, ...newItems]);
        setShareBoxIndex(idx);
    };

    useEffect(() => {
        const adminItems = [];
        const n = formSequence.length;
        let idx = -1;

        for (let i = 0; i < n; i++) {
            if (formSequence[i].data.role === 'admin') {
                adminItems.push(formSequence[i]);
            }
            else {
                adminItems.push(formSequence[i]);
                idx = i;
                break;
            }
        }

        const boolArr = new Array(n).fill(false);
        setDisableFlagArr(boolArr);
        setShareBox(adminItems);
        setShareBoxIndex(idx);
    }, [formSequence]);

    useEffect(() => {
        if (wid) fetchFormById();
        const fromHit = async () => {
            if (hitFlag) {
                await countFormHitApi(wid);
                setHitFlag(false)
            }
        }

        fromHit();
    }, []);

    const renderAdminContent = (item, index) => {
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

    const renderUserContent = (item, index) => {
        const { type, value } = item.data;

        if (type === 'Text' || type === 'Number' || type === 'Email' || type === 'Phone' || type === 'Date') {
            return (
                <form className={styles.inputs} onSubmit={(e) => setIsSubmit(item.key, e)}>
                    <input type={type} id={item.key} onChange={(e) => getInputValue(item.key, e.target.value)} placeholder={`Enter Your ${type}`} autoComplete="off" required disabled={disableFlagArr[index]} />
                    <button className={styles.submitBtn} disabled={disableFlagArr[index]}>
                        <img src="/icons/send.png" alt="send icon" />
                    </button>
                </form>
            );
        } else if (type === 'Rating') {
            return (
                <div className={styles.inputs}>
                    <div className={`${styles.rating} ${disableFlagArr[index] ? styles.disabled : ''}`}>
                        {[1, 2, 3, 4, 5].map((i, idx) => (
                            <button key={i} className={activeRating === idx ? styles.activeRating : ''} onClick={() => { getInputValue(item.key, i); setActiveRating(idx); }}>{i}</button>
                        ))}
                    </div>
                    <button className={styles.submitBtn} onClick={() => setIsSubmit(item.key)} disabled={disableFlagArr[index]}>
                        <img src="/icons/send.png" alt="send icon" />
                    </button>
                </div>
            );
        } else if (type === 'Button') {
            return (
                <button key={index} className={styles.inputBtn} onClick={() => { getInputValue(item.key, value); setIsSubmit(item.key); }} disabled={disableFlagArr[index]}>{value}</button>
            );
        } else {
            return null;
        }
    };

    return (
        <section className={styles.shareLayout} style={{ background: formData.formTheme }}>
            {shareBox.length > 0 && (
                <div className={`${styles.chatbox} ${cstyles.chatbox}`}>
                    {shareBox.map((item, index) => (
                        <div key={item.key + index} className={cstyles[item.data.role]}>
                            {item.data.role === 'admin' ? (
                                <>
                                    <img className={cstyles.chatHead} src="/images/chat-head-admin.png" alt="admin chat-head" />
                                    <div className={cstyles.chat}>
                                        <span>{renderAdminContent(item, index)}</span>
                                    </div>
                                </>
                            ) : (
                                <div className={cstyles.chat}>
                                    {renderUserContent(item, index)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}

export default Share