import React, { createContext, useContext } from "react";

type User = {
    email: string;
};

const UserContext = createContext<User | null>(null);

export const UserProvider: React.FC<{ user: User | null; children: React.ReactNode }> = ({ user, children }) => {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};