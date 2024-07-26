import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../assets/Navbar.module.css'

function Navbar() {
    return (
        <div className={styles.navbar}>
            <div className={styles.formTitle}>
                <input type="text" placeholder="Enter Form Name" />
            </div>
            <div className={styles.formNav}>
                <Link to="/workspace" className={styles.active}>Flow</Link>
                <Link to="/theme">Theme</Link>
                <Link to="/response">Response</Link>
            </div>
            <div className={styles.formAction}>
                <button>Share</button>
                <button>Save</button>
                <Link to="/dashboard"><img src="/icons/close.png" alt="close icon" /></Link>
            </div>
        </div>
    )
}

export default Navbar