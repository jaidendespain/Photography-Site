"use client";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext<{ authed: boolean; login: (pw: string) => boolean }>({ authed: false, login: () => false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);

  function login(pw: string) {
    if (pw === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthed(true);
      return true;
    }
    return false;
  }

  return (
    <AuthContext.Provider value={{ authed, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 