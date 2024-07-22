import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../assets/Auth.module.css';

function Register() {
    return (
        <main className={styles.auth}>
            <Link to="/"><img src="icons/arrow-back.png" className={styles.goback} width={20} alt="" /></Link>
            <form action="">
                <div className={styles.inputs}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" placeholder="Enter a username" />
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" />
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="*******" />
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" placeholder="*******" />
                </div>
                <button>Sign Up</button>
            </form>
            <span>Already have an account? <Link to="/login" className="link">Login</Link></span>
            <img className={`${styles.vector} ${styles.triangleLayer}`} src="images/vectors/triangle-layer.png" width={240} />
            <img className={`${styles.vector} ${styles.ellipsePink}`} src="images/vectors/ellipse-pink.png" width={80} />
            <img className={`${styles.vector} ${styles.ellipseYellow}`} src="images/vectors/ellipse-yellow.png" height={80} />
        </main>
    )
}

export default Register