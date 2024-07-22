import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../assets/Dashboard.module.css';

function Dashboard() {
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

    return (
        <main className={styles.dashboard}>
            <div className={styles.navbar}>
                <div className={`${styles.dropdown} ${isDropdownOpen ? styles.show : ''}`}>
                    <button className={styles.dropdownBtn} onClick={() => setDropdownOpen(!isDropdownOpen)}>
                        <span>Rashmi Ranjan's workspace</span>
                        <img className={styles.arrowDown} src="icons/arrow-angle-down.png" alt="" />
                    </button>
                    <div className={styles.dropdownContent}>
                        <Link to="/settings">Settings</Link>
                        <a href="#" className={styles.logout}>Logout</a>
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