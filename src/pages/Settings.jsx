import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../assets/Settings.module.css';

function Settings() {
    return (
        <main className={styles.settings}>
            <span className={styles.title}>Settings</span>
            <form action="">
                <div className={styles.inputs}>
                    <img src="icons/user.png" alt="" />
                    <input type="text" id="name" placeholder="Name" />
                </div>
                <div className={styles.inputs}>
                    <img src="icons/lock.png" alt="" />
                    <input type="email" id="email" placeholder="Update Email" />
                    <img src="icons/eye-open.png" alt="" />
                </div>
                <div className={styles.inputs}>
                    <img src="icons/lock.png" alt="" />
                    <input type="password" id="oldPassword" placeholder="Old Password" />
                    <img src="icons/eye-open.png" alt="" />
                </div>
                <div className={styles.inputs}>
                    <img src="icons/lock.png" alt="" />
                    <input type="password" id="newPassword" placeholder="New Password" />
                    <img src="icons/eye-open.png" alt="" />
                </div>
                <button className={styles.btnSubmit}>Update</button>
            </form>
            <div className={styles.logout}>
                <img src="icons/arrow-out.png" alt="" />
                <span>Log out</span>
            </div>
        </main>
    )
}

export default Settings