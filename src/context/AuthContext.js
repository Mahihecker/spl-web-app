// src/context/AuthContext.js
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { generateMockToken, decodeMockToken } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const decoded = decodeMockToken(token);
                // Set complete user object from decoded token (which should contain all fields)
                setUser(decoded);
                console.log('User decoded from token:', decoded); // Debug log
            } catch (err) {
                console.error('Invalid token');
                logout();
            }
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch('/data/users.json');
            const users = await response.json();
            const user = users.find(u => u.username === username && u.password === password);
            if (!user) throw new Error('Invalid credentials');

            // Store the complete user object in state first
            const completeUser = {
                ...user, // Include all fields: role, username, email, pfp, orgId, enrolledOrgIds
            };

            // Generate token with all user data
            const token = generateMockToken(completeUser);
            Cookies.set('token', token, { expires: 1 });

            // Set complete user data in state
            setUser(completeUser);
            console.log('User set in AuthContext:', completeUser); // Debug log
            return user.role;
        } catch (err) {
            console.error('Login failed:', err);
            throw err;
        }
    };

    const logout = () => {
        Cookies.remove('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}