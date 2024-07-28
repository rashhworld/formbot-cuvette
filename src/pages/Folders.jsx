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

    const { fid } = useParams();
    const [allForm, setAllForm] = useState([]);
    const [formId, setFormId] = useState(null);

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const openDeleteModal = (id) => {
        setFormId(id);
        setDeleteModalOpen(true);
    }

    const fetchAllFormByFolder = async () => {
        try {
            const response = await axios.get(`${baseURL}/folder/view/${fid}`, {
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
                fetchAllFormByFolder();
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
        }
    };

    useEffect(() => {
        if (token) {
            fetchAllFormByFolder();
        }
    }, [token]);

    return (
        <div className={styles.section}>
            <Link to="/dashboard"><img src="/icons/arrow-back.png" className="goback" alt="Go back" /></Link>
            <div className={styles.forms}>
                <Link to={`/workspace?fid=${fid}`} className={styles.card}>
                    <img src="/icons/plus.png" alt="plus icon" />
                    <span>Create a typebot</span>
                </Link>
                {allForm.map((form, key) => (
                    <div className={styles.formCard} key={key}>
                        <img className={styles.delete} src="/icons/delete.png" onClick={() => openDeleteModal(form._id)} width={20} alt="trash icon" />
                        <Link to={`/workspace?wid=${form._id}`} className={`${styles.card} ${styles.created}`}>
                            <span>{form.formName}</span>
                        </Link>
                    </div>
                ))}
                {isDeleteModalOpen &&
                    <div className={styles.deleteFolderModal}>
                        <span>Are you sure you want to delete this form ?</span>
                        <div className={styles.action}>
                            <span className={styles.confirm} onClick={deleteForm}>Confirm</span>
                            <span></span>
                            <span className={styles.cancel} onClick={() => setDeleteModalOpen(false)}>Cancel</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Folders