import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { fetchAllFormByFolderApi } from "../apis/Folder";
import { deleteFormApi } from "../apis/Form";
import styles from '../assets/Dashboard.module.css';

function Folders() {
    const token = useAuth();

    const { fid } = useParams();
    const [allForm, setAllForm] = useState([]);
    const [formId, setFormId] = useState(null);

    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const openDeleteModal = (id) => {
        setFormId(id); setDeleteModalOpen(true);
    };

    const fetchAllFormByFolder = async () => {
        const data = await fetchAllFormByFolderApi(fid, token);
        if (data) setAllForm(data);
    };

    const deleteForm = async () => {
        const data = await deleteFormApi(formId, token);
        if (data) { setDeleteModalOpen(false); fetchAllFormByFolder(); };
    };

    useEffect(() => {
        if (token) fetchAllFormByFolder();
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