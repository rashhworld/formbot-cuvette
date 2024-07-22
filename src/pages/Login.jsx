import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../assets/Auth.module.css';

function Login() {
    return (
        <main className={styles.auth}>
            <Link to="/"><img src="icons/arrow-back.png" className={styles.goback} width={20} alt="Go back" /></Link>
            <form action="">
                <div className={styles.inputs}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" />
                </div>
                <div className={styles.inputs}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="*******" />
                </div>
                <button>Log In</button>
            </form>
            <span>Don't have an account? <Link to="/register">Register now</Link></span>
            <img className={`${styles.vector} ${styles.triangleLayer}`} src="images/vectors/triangle-layer.png" width={240} />
            <img className={`${styles.vector} ${styles.ellipsePink}`} src="images/vectors/ellipse-pink.png" width={80} />
            <img className={`${styles.vector} ${styles.ellipseYellow}`} src="images/vectors/ellipse-yellow.png" height={80} />
        </main>
    )
}

export default Login