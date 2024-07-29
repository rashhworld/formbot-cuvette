import axios from 'axios';
import { toast } from 'react-toastify';
import { handleApiRes, handleApiErr } from '../utils/apiUtils';
const baseURL = import.meta.env.VITE_API_BASE_URL;

export const createFormApi = async (folderId, formName, token) => {
    try {
        const response = await axios.post(`${baseURL}/form/create`, { folderId, formName }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const { status, formId } = response.data;
        if (status === 'success') {
            return formId;
        } else {
            handleApiRes(response.data);
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

export const fetchAllFormApi = async (token) => {
    try {
        const response = await axios.get(`${baseURL}/form/view`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const { status, data } = response.data;
        if (status === 'success') {
            return data;
        } else {
            handleApiRes(response.data);
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

export const fetchFormByIdApi = async (formId, token) => {
    try {
        const response = await axios.get(`${baseURL}/form/view/${formId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const { status, data } = response.data;
        if (status === 'success') {
            return data;
        } else {
            handleApiRes(response.data);
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

export const updateFormApi = async (formId, formData, token) => {
    try {
        const response = await axios.patch(`${baseURL}/form/update/${formId}`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const { status } = response.data;
        if (status === 'success') {
            return true;
        } else {
            handleApiRes(response.data);
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};

export const deleteFormApi = async (formId, token) => {
    try {
        const response = await axios.delete(`${baseURL}/form/delete/${formId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const { status, msg } = response.data;
        if (status === 'success') {
            toast.success(msg);
            return true;
        } else {
            handleApiRes(response.data);
        }
    } catch (error) {
        handleApiErr(error, navigate);
    }
};