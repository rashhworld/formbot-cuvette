import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import { handleApiRes, handleApiErr } from '../utils/apiUtils'

import styles from '../assets/Dashboard.module.css'

function Dashboard() {
    const token = useAuth();
    const navigate = useNavigate();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const [userData, setUserData] = useState([]);

    const [allFolder, setAllFolder] = useState([]);
    const [folderId, setFolderId] = useState(null);
    const [folderName, setFolderName] = useState(null);
    const [folderNameError, setFolderNameError] = useState(null);

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const openCreateModal = () => {
        setFolderName('');
        setFolderNameError();
        setCreateModalOpen(true);
        setDeleteModalOpen(false);
    }

    const openDeleteModal = (id) => {
        setFolderId(id);
        setDeleteModalOpen(true);
        setCreateModalOpen(false);
    }

    const showDashboard = async () => {
        try {
            const response = await axios.get(`${baseURL}/user/dashboard`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status, data } = response.data;
            if (status === 'success') {
                setUserData(data);
                fetchAllFolder();
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
        }
    };

    const fetchAllFolder = async () => {
        try {
            const response = await axios.get(`${baseURL}/folder/view`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status, data } = response.data;
            if (status === 'success') {
                setAllFolder(data);
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
        }
    };

    const openFolder = (id) => {
        navigate(`/folder/${id}`);
    }

    const createFolder = async () => {
        setFolderNameError('');

        if (folderName.trim().length === 0) {
            setFolderNameError('Enter folder name');
        } else {
            try {
                const response = await axios.post(`${baseURL}/folder/create`, { folderName }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { status, msg } = response.data;
                if (status === 'success') {
                    toast.success(msg);
                    setCreateModalOpen(false);
                    fetchAllFolder();
                } else {
                    handleApiRes(response.data);
                }
            } catch (error) {
                handleApiErr(error, navigate);
            }
        }
    };

    const deleteFolder = async () => {
        try {
            const response = await axios.delete(`${baseURL}/folder/delete/${folderId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status, msg } = response.data;
            if (status === 'success') {
                toast.success(msg);
                setDeleteModalOpen(false);
                fetchAllFolder();
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
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
                        <img className={styles.arrowDown} src="/icons/arrow-angle-down.png" alt="arrow-down icon" />
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
                        <img src="/icons/folder-create.png" alt="folder icon" />
                        <span>Create a folder</span>
                    </button>
                    {allFolder.map((folder, key) => (
                        <button className={styles.createOpen} key={key} onClick={() => openFolder(folder._id)}>
                            <span>{folder.folderName}</span>
                            <img src="/icons/delete.png" onClick={() => openDeleteModal(folder._id)} alt="trash icon" />
                        </button>
                    ))}
                </div>
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
                    {isCreateModalOpen &&
                        <div className={styles.createFolderModal}>
                            <span>Create New Folder</span>
                            <form>
                                <div className={styles.inputs}>
                                    <input type="text" value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Enter folder name" />
                                    <label className="error">{folderNameError}</label>
                                </div>
                                <div className={styles.action}>
                                    <span className={styles.confirm} onClick={createFolder}>Done</span>
                                    <span></span>
                                    <span className={styles.cancel} onClick={() => setCreateModalOpen(false)}>Cancel</span>
                                </div>
                            </form>
                        </div>
                    }
                    {isDeleteModalOpen &&
                        <div className={styles.deleteFolderModal}>
                            <span>Are you sure you want to delete this folder ?</span>
                            <div className={styles.action}>
                                <span className={styles.confirm} onClick={deleteFolder}>Confirm</span>
                                <span></span>
                                <span className={styles.cancel} onClick={() => setDeleteModalOpen(false)}>Cancel</span>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </main>
    )
}

export default Dashboard