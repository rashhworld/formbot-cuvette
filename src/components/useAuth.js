import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const useAuth = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
        } else {
            setToken(token);
        }
    }, [navigate]);

    return token;
};

export default useAuth;