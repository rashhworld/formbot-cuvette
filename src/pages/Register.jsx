import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

import styles from '../assets/Auth.module.css'

function Register() {
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const [input, setInput] = useState({ username: "", email: "", password: "", confirmPassword: "" });
    const [error, setError] = useState({ username: "", email: "", password: "", confirmPassword: "" });

    const registerUser = async () => {
        try {
            const response = await axios.post(`${baseURL}/user/register`, input);

            const { status, msg } = response.data;
            if (status === 'success') {
                toast.success(msg);
                navigate('/login');
            } else {
                toast.error(msg);
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
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
        e.preventDefault();

        let isError = false;
        setError(() => ({ username: "", email: "", password: "", confirmPassword: "" }));

        Object.keys(input).forEach(key => {
            const element = input[key];
            if (typeof element === 'string' && element.trim().length === 0) {
                isError = true;
                setError(error => ({ ...error, [key]: "This field is required" }));
            } else if (key === 'email' && !validateEmail(element)) {
                isError = true;
                setError(error => ({ ...error, [key]: "Enter a valid email Id" }));
            } else if (key === 'password' && !validatePassword(element)) {
                isError = true;
                setError(error => ({ ...error, [key]: "Password must be 6+ chars, incl. letter & number" }));
            } else if (key === 'confirmPassword' && element !== input.password) {
                isError = true;
                setError(error => ({ ...error, [key]: "Passwords do not match with above password" }));
            }
        });

        if (!isError) {
            registerUser();
        }
    }

    return (
        <main className={styles.auth}>
            <Link to="/"><img src="/icons/arrow-back.png" className="goback" alt="arrow-back icon" /></Link>
            <form className={styles.form} onSubmit={validateForm}>
                <div className={styles.inputs}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={input.username} onChange={(e) => setInput({ ...input, username: e.target.value })} placeholder="Enter a username" />
                    <label htmlFor="username" className="error">{error.username}</label>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={input.email} onChange={(e) => setInput({ ...input, email: e.target.value })} placeholder="Enter your email" />
                    <label htmlFor="email" className="error">{error.email}</label>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={input.password} onChange={(e) => setInput({ ...input, password: e.target.value })} placeholder="*******" />
                    <label htmlFor="password" className="error">{error.password}</label>
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" value={input.confirmPassword} onChange={(e) => setInput({ ...input, confirmPassword: e.target.value })} placeholder="*******" />
                    <label htmlFor="confirmPassword" className="error">{error.confirmPassword}</label>
                </div>
                <button>Sign Up</button>
            </form>
            <span>Already have an account? <Link to="/login" className="link">Login</Link></span>
            <img className={`${styles.vector} ${styles.triangleLayer}`} src="/images/vectors/triangle-layer.png" width={240} alt="triangle-layer" />
            <img className={`${styles.vector} ${styles.ellipsePink}`} src="/images/vectors/ellipse-pink.png" width={80} alt="ellipse-pink" />
            <img className={`${styles.vector} ${styles.ellipseYellow}`} src="/images/vectors/ellipse-yellow.png" height={80} alt="ellipse-yellow" />
        </main>
    )
}

export default Register