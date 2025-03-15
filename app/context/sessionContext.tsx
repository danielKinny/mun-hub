"use client";
import React, { useEffect, useState, ReactNode, useContext, createContext } from "react";
import { Delegate } from "@/app/db/types";
import Cookies from 'js-cookie';

interface SessionContextProps {
    user: Delegate | null;
    login: (user: Delegate) => void;
    logout: () => void;
};

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<Delegate | null>(null);

    useEffect(() => {
        const storedUser = Cookies.get('user');
        if (storedUser) {
            console.log('Stored user found:', storedUser);
            setUser(JSON.parse(storedUser));
        } else {
            console.log('No stored user found');
        }
    }, []);

    const login = (user: Delegate) => {
        setUser(user);
        Cookies.set('user', JSON.stringify(user));
        console.log('User logged in:', user);
    };

    const logout = () => {
        setUser(null);
        Cookies.remove('user');
        console.log('User logged out');
    };

    return (
        <SessionContext.Provider value={{ user, login, logout }}>
            {children}
        </SessionContext.Provider>
    );
}

export const useSession = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}