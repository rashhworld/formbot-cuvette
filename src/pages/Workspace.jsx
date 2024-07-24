import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from '../assets/Workspace.module.css'

function Workspace() {
    const bubbleButtons = [
        { src: "icons/chat.png", text: "Text" },
        { src: "icons/photo.png", text: "Image" },
        { src: "icons/video.png", text: "Video" },
        { src: "icons/gif.png", text: "GIF" }
    ];

    const inputButtons = [
        { src: "icons/letter-t.png", text: "Text" },
        { src: "icons/hash.png", text: "Number" },
        { src: "icons/at.png", text: "Email" },
        { src: "icons/call.png", text: "Phone" },
        { src: "icons/calendar.png", text: "Date" },
        { src: "icons/star.png", text: "Rating" },
        { src: "icons/checkbox.png", text: "Buttons" }
    ];

    return (
        <main className={styles.workspace}>
            <Navbar />
            <div className={styles.space}>
                <div className={styles.sidebar}>
                    <span>Bubbles</span>
                    <div className={styles.bubbles}>
                        {bubbleButtons.map((button, index) => (
                            <button key={index}><img src={button.src} />{button.text}</button>
                        ))}
                    </div>
                    <span>Inputs</span>
                    <div className={styles.inputs}>
                        {inputButtons.map((button, index) => (
                            <button key={index}><img src={button.src} />{button.text}</button>
                        ))}
                    </div>
                </div>
                <div className={styles.layout}>
                    <div className={styles.card}>
                        <div className={styles.start}>
                            <img src="icons/flag.png" alt="" />
                            <span className={styles.title}>Start</span>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.remove}>
                            <img src="icons/delete.png" />
                        </div>
                        <span className={styles.title}>Text</span>
                        <div className={styles.inputBox}>
                            <img src="icons/chat.png" alt="" />
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