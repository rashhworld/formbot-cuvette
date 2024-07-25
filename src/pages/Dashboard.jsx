import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import useAuth from '../components/useAuth'

import styles from '../assets/Dashboard.module.css'

function Dashboard() {
    const token = useAuth();
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const [userData, setUserData] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const openCreateModal = () => {
        setCreateModalOpen(true);
        setDeleteModalOpen(false);
    }

    const openDeleteModal = () => {
        setDeleteModalOpen(true);
        setCreateModalOpen(false);
    }

    const showDashboard = async () => {
        try {
            const res = await axios.get(`${baseURL}/user/dashboard`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status, msg, data } = res.data;
            setUserData(data);

            if (status === 'jwtError') throw new Error();
            else toast.error(msg);
        } catch (error) {
            toast.error("Something went wrong. Please re-login.");
            navigate('/login');
        }
    };

    useEffect(() => {
        if (token) {
            showDashboard();
        }
    }, [token]);

    return (
        <main className={styles.dashboard}>
            <div className={styles.navbar}>
                <div className={`${styles.dropdown} ${isDropdownOpen ? styles.show : ''}`}>
                    <button className={styles.dropdownBtn} onClick={() => setDropdownOpen(!isDropdownOpen)}>
                        <span>{userData.username}'s workspace</span>
                        <img className={styles.arrowDown} src="icons/arrow-angle-down.png" alt="" />
                    </button>
                    <div className={styles.dropdownContent}>
                        <Link to="/settings">Settings</Link>
                        <Link to="/login" onClick={() => localStorage.removeItem('authToken')} className={styles.logout}>Logout</Link>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.folders}>
                    <button className={styles.createOpen} onClick={openCreateModal}>
                        <img src="icons/folder-create.png" />
                        <span>Create a folder</span>
                    </button>
                    <button className={styles.createOpen}>
                        <span>Computer Networks</span>
                        <img src="icons/delete.png" onClick={openDeleteModal} />
                    </button>
                    <button className={styles.createOpen}>
                        <span>Operating Systems</span>
                        <img src="icons/delete.png" onClick={openDeleteModal} />
                    </button>
                </div>
                <div className={styles.forms}>
                    <div className={styles.card}>
                        <img src="icons/plus.png" />
                        <span>Create a typebot</span>
                    </div>
                    <div className={`${styles.card} ${styles.created}`}>
                        <img className={styles.delete} src="icons/delete.png" width={20} />
                        <span>My new form</span>
                    </div>
                    <div className={`${styles.card} ${styles.created}`}>
                        <img className={styles.delete} src="icons/delete.png" width={20} />
                        <span>Customer form</span>
                    </div>
                    {isCreateModalOpen &&
                        <div className={styles.createFolderModal}>
                            <span>Create New Folder</span>
                            <input type="text" placeholder="Enter folder name" />
                            <div className={styles.action}>
                                <span class={styles.confirm}>Done</span>
                                <span></span>
                                <span class={styles.cancel} onClick={() => setCreateModalOpen(false)}>Cancel</span>
                            </div>
                        </div>
                    }
                    {isDeleteModalOpen &&
                        <div className={styles.deleteFolderModal}>
                            <span>Are you sure you want to delete this folder ?</span>
                            <div className={styles.action}>
                                <span class={styles.confirm}>Confirm</span>
                                <span></span>
                                <span class={styles.cancel} onClick={() => setDeleteModalOpen(false)}>Cancel</span>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </main>
    )
}

export default Dashboard