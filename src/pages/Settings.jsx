import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import useAuth from '../components/useAuth'

import styles from '../assets/Settings.module.css'

function Settings() {
    const token = useAuth();
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const [input, setInput] = useState({ username: "", email: "", oldPassword: "", newPassword: "" });
    const [error, setError] = useState({ username: "", email: "", oldPassword: "", newPassword: "" });

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
                if (status === 'jwtError') throw new Error();
                else toast.error(msg);
            }
        } catch (error) {
            toast.error("Something went wrong. Please re-login.");
            navigate('/login');
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
        setError(() => { return { username: "", email: "", oldPassword: "", newPassword: "", } });

        Object.keys(input).forEach(key => {
            const element = input[key];
            if (typeof element === 'string' && element.trim().length === 0) {
                isError = true;
                setError(error => ({ ...error, [key]: "This field is required." }));
            } else if (key === 'email' && !validateEmail(element)) {
                isError = true;
                setError(error => ({ ...error, [key]: "Enter a valid email Id." }));
            } else if (key === 'newPassword' && !validatePassword(element)) {
                isError = true;
                setError(error => ({ ...error, [key]: "Password must be 6 characters long and include a letter and a number." }));
            }
        });

        if (!isError) {
            updateUser();
        }
    }

    return (
        <main className={styles.settings}>
            <span className={styles.title}>Settings</span>
            <form onSubmit={validateForm}>
                <div className={styles.inputs}>
                    <img src="icons/user.png" alt="" />
                    <input type="text" id="username" value={input.username} onChange={(e) => setInput({ ...input, username: e.target.value })} placeholder="Name" />
                    <label htmlFor="username" className={styles.error}>{error.username}</label>
                </div>
                <div className={styles.inputs}>
                    <img src="icons/lock.png" alt="" />
                    <input type="email" id="email" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} placeholder="Update Email" />
                    <label htmlFor="email" className={styles.error}>{error.email}</label>
                    <img src="icons/eye-open.png" alt="" />
                </div>
                <div className={styles.inputs}>
                    <img src="icons/lock.png" alt="" />
                    <input type="password" id="oldPassword" value={input.oldPassword} onChange={(e) => setInput({ ...input, oldPassword: e.target.value })} placeholder="Old Password" />
                    <label htmlFor="oldPassword" className={styles.error}>{error.oldPassword}</label>
                    <img src="icons/eye-open.png" alt="" />
                </div>
                <div className={styles.inputs}>
                    <img src="icons/lock.png" alt="" />
                    <input type="password" id="newPassword" value={input.newPassword} onChange={(e) => setInput({ ...input, newPassword: e.target.value })} placeholder="New Password" />
                    <label htmlFor="newPassword" className={styles.error}>{error.newPassword}</label>
                    <img src="icons/eye-open.png" alt="" />
                </div>
                <button className={styles.btnSubmit}>Update</button>
            </form>
            <Link to="/login" onClick={() => localStorage.removeItem('authToken')} className={styles.logout}>
                <img src="icons/arrow-out.png" alt="" />
                <span>Log out</span>
            </Link>
        </main>
    )
}

export default Settings