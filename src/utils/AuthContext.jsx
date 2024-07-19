import { createContext, useState, useEffect } from 'react';

import axios from 'axios';

import {BASE_URL} from "../data/api.js";

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.get(`${BASE_URL}/api/auth/`, { headers: { 'x-auth-token': token } })
                .then(res => {
                    setUser(res.data.user);
                })
                .catch(err => {
                    console.error(err);
                });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await axios.post(`${BASE_URL}/api/auth/login`, { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
