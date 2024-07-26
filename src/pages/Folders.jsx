import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import { handleApiRes, handleApiErr } from '../utils/apiUtils'

import styles from '../assets/Dashboard.module.css'

function Folders() {
    const token = useAuth();
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;
    const { id } = useParams();

    return (
        <div className={styles.section}>
            <Link to="/dashboard"><img src="/icons/arrow-back.png" className="goback" alt="Go back" /></Link>
            <div className={styles.forms}>
                <div className={styles.card}>
                    <img src="/icons/plus.png" alt="plus icon" />
                    <span>Create a typebot</span>
                </div>
                <div className={`${styles.card} ${styles.created}`}>
                    <img className={styles.delete} src="/icons/delete.png" width={20} alt="trash icon" />
                    <span>My new form</span>
                </div>
                <div className={`${styles.card} ${styles.created}`}>
                    <img className={styles.delete} src="/icons/delete.png" width={20} alt="trash icon" />
                    <span>Customer form</span>
                </div>
            </div>
        </div>
    )
}

export default Folders