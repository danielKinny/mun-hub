'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Delegate } from '../db/db';

interface UserContextType {
  currentUser: Delegate | null;
  setCurrentUser: (user: Delegate | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Delegate | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}