import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import styles from '../assets/Workspace.module.css'

function Workspace() {
    return (
        <main className={styles.workspace}>
            <Navbar />
            <div className={styles.space}>
                <div className={styles.sidebar}>
                    <span>Bubbles</span>
                    <div className={styles.bubbles}>
                        <button><img src="icons/chat.png" />Text</button>
                        <button><img src="icons/photo.png" />Image</button>
                        <button><img src="icons/video.png" />Video</button>
                        <button><img src="icons/gif.png" />GIF</button>
                    </div>
                    <span>Inputs</span>
                    <div className={styles.inputs}>
                        <button><img src="icons/letter-t.png" />Text</button>
                        <button><img src="icons/hash.png" />Number</button>
                        <button><img src="icons/at.png" />Email</button>
                        <button><img src="icons/call.png" />Phone</button>
                        <button><img src="icons/calendar.png" />Date</button>
                        <button><img src="icons/star.png" />Rating</button>
                        <button><img src="icons/checkbox.png" />Buttons</button>
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