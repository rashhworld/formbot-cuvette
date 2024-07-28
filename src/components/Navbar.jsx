import React, { useState, useEffect } from 'react'
import { NavLink, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import useAuth from '../hooks/useAuth'
import { handleApiRes, handleApiErr } from '../utils/apiUtils'

import styles from '../assets/Navbar.module.css'

function Navbar() {
    const token = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUrl = `${location.pathname}${location.search}`;
    const [searchParams] = useSearchParams();
    const baseURL = import.meta.env.VITE_API_BASE_URL;

    const [folderId, setFolderId] = useState(searchParams.get('fid'));
    const [formId, setFormId] = useState(searchParams.get('wid'));
    const [formName, setFormName] = useState('');
    const [formNameError, setFormNameError] = useState('');

    const createForm = async () => {
        setFormNameError('');

        if (formName.trim().length === 0) {
            setFormNameError('Enter form name');
        } else {
            try {
                const response = await axios.post(`${baseURL}/form/create`, { folderId, formName }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { status, formId } = response.data;
                if (status === 'success') {
                    setFormId(formId);
                    navigate(`/workspace?wid=${formId}`);
                } else {
                    handleApiRes(response.data);
                }
            } catch (error) {
                handleApiErr(error, navigate);
            }
        }
    };

    const fetchFormById = async () => {
        try {
            const response = await axios.get(`${baseURL}/form/view/${formId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const { status, data } = response.data;
            if (status === 'success') {
                setFormName(data.formName);
            } else {
                handleApiRes(response.data);
            }
        } catch (error) {
            handleApiErr(error, navigate);
        }
    };

    const updateForm = async () => {
        setFormNameError('');

        if (formName.trim().length === 0) {
            setFormNameError('Enter form name');
        } else {
            try {
                const response = await axios.patch(`${baseURL}/form/update/${formId}`, { formName }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const { status } = response.data;
                if (status === 'success') {
                    setFormName(formName);
                    toast.success("Form name updated successfully.")
                } else {
                    handleApiRes(response.data);
                }
            } catch (error) {
                handleApiErr(error, navigate);
            }
        }
    };

    useEffect(() => {
        if (token) {
            if (formId) fetchFormById();
        }
    }, [token]);

    return (
        <div className={styles.navbar}>
            <div className={styles.formTitle}>
                <input type="text" className={formNameError && 'error'} value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="Enter Form Name" />
            </div>
            <div className={styles.formNav}>
                <NavLink to={formId ? `/workspace?wid=${formId}` : currentUrl} className={({ isActive }) => isActive ? styles.active : ''}>Flow</NavLink>
                <NavLink to={formId ? `/theme?wid=${formId}` : currentUrl} className={({ isActive }) => isActive && formId ? styles.active : ''}>Theme</NavLink>
                <NavLink to={formId ? `/response?wid=${formId}` : currentUrl} className={({ isActive }) => isActive && formId ? styles.active : ''}>Response</NavLink>
            </div>
            <div className={styles.formAction}>
                <button disabled={!formId}>Share</button>
                <button onClick={!formId ? createForm : updateForm}>Save</button>
                <NavLink to="/dashboard"><img src="/icons/close.png" alt="close icon" /></NavLink>
            </div>
        </div>
    )
}

export default Navbar