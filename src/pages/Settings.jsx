import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import { handleApiRes, handleApiErr } from '../utils/apiUtils'

import styles from '../assets/Settings.module.css'

function Settings() {
    const token = useAuth();
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const [input, setInput] = useState({ username: "", email: "", oldPassword: "", newPassword: "" });
    const [error, setError] = useState({ username: "", email: "", oldPassword: "", newPassword: "" });

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const updateUser = async () => {
        try {
            const response = await axios.post(`${baseURL}/user/update`, input, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status, msg } = response.data;
            if (status === 'success') {
                toast.success(msg);
                navigate('/dashboard');
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
        }
    };

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        return passwordRegex.test(password);
    }

    function validateForm(e) {
        e.preventDefault()

        let isError = false;
        setError(() => ({ username: "", email: "", oldPassword: "", newPassword: "", }));

        if (input.email && !validateEmail(input.email)) {
            isError = true;
            setError((error) => ({ ...error, email: 'Enter a valid email format' }));
        }

        if (input.oldPassword) {
            if (!validatePassword(input.oldPassword)) {
                isError = true;
                setError((error) => ({ ...error, oldPassword: 'Password must be 6+ chars, incl. letter & number' }));
            }
            if (!input.newPassword) {
                isError = true;
                setError((error) => ({ ...error, newPassword: 'New password is required' }));
            }
        }

        if (input.newPassword) {
            if (!validatePassword(input.newPassword)) {
                isError = true;
                setError((error) => ({ ...error, newPassword: 'Password must be 6+ chars, incl. letter & number' }));
            }
            if (!input.oldPassword) {
                isError = true;
                setError((error) => ({ ...error, oldPassword: 'Old password is required' }));
            }
        }

        if (!isError) {
            updateUser();
        }
    }

    return (
        <main className={styles.settings}>
            <Link to="/dashboard"><img src="/icons/arrow-back.png" className="goback" alt="Go back" /></Link>
            <span className={styles.title}>Settings</span>
            <form onSubmit={validateForm} className={styles.form}>
                <div className={styles.inputs}>
                    <img src="/icons/user.png" alt="user icon" />
                    <input type="text" id="username" value={input.username} onChange={(e) => setInput({ ...input, username: e.target.value })} placeholder="Name" />
                    <label htmlFor="username" className="error">{error.username}</label>
                </div>
                <div className={styles.inputs}>
                    <img src="/icons/mail.png" alt="mail icon" />
                    <input type="email" id="email" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} placeholder="Update Email" />
                    <label htmlFor="email" className="error">{error.email}</label>
                </div>
                <div className={styles.inputs}>
                    <img src="/icons/lock.png" alt="lock icon" />
                    <input type={showOldPassword ? 'text' : 'password'} id="oldPassword" value={input.oldPassword} onChange={(e) => setInput({ ...input, oldPassword: e.target.value })} placeholder="Old Password" />
                    <label htmlFor="oldPassword" className="error">{error.oldPassword}</label>
                    <img src="/icons/eye-open.png" onClick={() => setShowOldPassword(!showOldPassword)} alt="eye-open icon" />
                </div>
                <div className={styles.inputs}>
                    <img src="/icons/lock.png" alt="lock icon" />
                    <input type={showNewPassword ? 'text' : 'password'} id="newPassword" value={input.newPassword} onChange={(e) => setInput({ ...input, newPassword: e.target.value })} placeholder="New Password" />
                    <label htmlFor="newPassword" className="error">{error.newPassword}</label>
                    <img src="/icons/eye-open.png" onClick={() => setShowNewPassword(!showNewPassword)} alt="eye-open icon" />
                </div>
                <button className={styles.btnSubmit}>Update</button>
            </form>
            <Link to="/login" onClick={() => localStorage.removeItem('authToken')} className={styles.logout}>
                <img src="/icons/arrow-out.png" alt="arrow-out icon" />
                <span>Log out</span>
            </Link>
        </main>
    )
}

export default Settings