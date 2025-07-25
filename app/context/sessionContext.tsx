"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Admin, Delegate, Chair, UserType } from "@/db/types";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
// lot to explain here lolz
interface SessionContextProps {
  user: UserType | null;
  login: (user: UserType) => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Delegate | Admin | Chair | null>(null);
  const routerInstance = useRouter();
  const [isLoading, setIsLoading] =
    useState(true); /* this is very very very important
  
    
    literally spent a whole day trying to figure out why the routing wasnt working
    turns out that the context takes time to load, and while its not loaded in other components, it will redirect to the login page
    the value is null so they get redirected to the login before their user is even retrieved
    so by using the loading thingy im making sure that the user is loaded before the routing is done

    keeping this comment here for future reference to remember how important it is, i swear
    i was breaking my head over this


    */

  useEffect(() => {
    // storing it in cookies
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (user: UserType) => {
    setUser(user);
    Cookies.set("user", JSON.stringify(user));
  };

  //for now, though this is there, it doesnt have an implementation, might add it later,
  //if this is already added and my comment is still here then i have forgotten to remove this
  const logout = () => {
    setUser(null);
    Cookies.remove("user");
    routerInstance.push("/login");
    console.log("SessionProvider: User logged out");
  };

  if (isLoading) {
    return <div className="bg-black min-h-screen flex items-center justify-center text-white text-center">Loading...</div>;
  }

  return (
    <SessionContext.Provider value={{ user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
