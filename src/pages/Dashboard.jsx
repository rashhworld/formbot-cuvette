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

    const [allForm, setAllForm] = useState([]);
    const [formId, setFormId] = useState(null);
    const [entityType, setEntityType] = useState(null);

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const openCreateModal = () => {
        setFolderName('');
        setFolderNameError('');
        setCreateModalOpen(true);
        setDeleteModalOpen(false);
    }

    const openDeleteModal = (id, type = "folder") => {
        setEntityType(type); setFormId(null); setFolderId(null);
        if (type == "form") setFormId(id); else setFolderId(id);
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
                fetchAllForm();
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
        }
    };

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

    const fetchAllForm = async () => {
        try {
            const response = await axios.get(`${baseURL}/form/view`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status, data } = response.data;
            if (status === 'success') {
                setAllForm(data);
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
        }
    };

    const deleteForm = async () => {
        try {
            const response = await axios.delete(`${baseURL}/form/delete/${formId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status, msg } = response.data;
            if (status === 'success') {
                toast.success(msg);
                setDeleteModalOpen(false);
                fetchAllForm();
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
                        <button className={styles.createOpen} key={key}>
                            <span onClick={() => openFolder(folder._id)}>{folder.folderName}</span>
                            <img src="/icons/delete.png" onClick={() => openDeleteModal(folder._id)} alt="trash icon" />
                        </button>
                    ))}
                </div>
                <div className={styles.forms}>
                    <Link to="/workspace" className={styles.card}>
                        <img src="/icons/plus.png" alt="plus icon" />
                        <span>Create a typebot</span>
                    </Link>
                    {allForm.map((form, key) => (
                        <div className={styles.formCard} key={key}>
                            <img className={styles.delete} src="/icons/delete.png" onClick={() => openDeleteModal(form._id, 'form')} width={20} alt="trash icon" />
                            <Link to={`/workspace?wid=${form._id}`} className={`${styles.card} ${styles.created}`}>
                                <span>{form.formName}</span>
                            </Link>
                        </div>
                    ))}
                    {isCreateModalOpen &&
                        <div className={styles.createFolderModal}>
                            <span>Create New Folder</span>
                            <form>
                                <div className={styles.inputs}>
                                    <input type="text" className={folderNameError && 'error'} value={folderName} onChange={(e) => setFolderName(e.target.value)} placeholder="Enter folder name" />
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
                            <span>Are you sure you want to delete this {entityType} ?</span>
                            <div className={styles.action}>
                                <span className={styles.confirm} onClick={entityType == "folder" ? deleteFolder : deleteForm}>Confirm</span>
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