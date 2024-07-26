import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from '../assets/Workspace.module.css'

function Workspace() {
    const bubbleButtons = [
        { src: "chat.png", text: "Text" },
        { src: "photo.png", text: "Image" },
        { src: "video.png", text: "Video" },
        { src: "gif.png", text: "GIF" }
    ];

    const inputButtons = [
        { src: "text.png", text: "Text" },
        { src: "hash.png", text: "Number" },
        { src: "at.png", text: "Email" },
        { src: "call.png", text: "Phone" },
        { src: "calendar.png", text: "Date" },
        { src: "star.png", text: "Rating" },
        { src: "checkbox.png", text: "Buttons" }
    ];

    return (
        <main className={styles.workspace}>
            <Navbar />
            <div className={styles.space}>
                <div className={styles.sidebar}>
                    <span>Bubbles</span>
                    <div className={styles.bubbles}>
                        {bubbleButtons.map((button, index) => (
                            <button key={index}><img src={`/icons/${button.src}`} alt={`${button.src} icon`} />{button.text}</button>
                        ))}
                    </div>
                    <span>Inputs</span>
                    <div className={styles.inputs}>
                        {inputButtons.map((button, index) => (
                            <button key={index}><img src={`/icons/${button.src}`} alt={`${button.src} icon`} />{button.text}</button>
                        ))}
                    </div>
                </div>
                <div className={styles.layout}>
                    <div className={styles.card}>
                        <div className={styles.start}>
                            <img src="/icons/flag.png" alt="flag icon" />
                            <span className={styles.title}>Start</span>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.remove}>
                            <img src="/icons/delete.png" alt="trash icon" />
                        </div>
                        <span className={styles.title}>Text</span>
                        <div className={styles.inputBox}>
                            <img src="/icons/chat.png" alt="chat icon" />
                            <input type="text" placeholder="Click here to edit" />
                        </div>
                        <small></small>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Workspace