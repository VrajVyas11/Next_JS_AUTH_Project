"use client"

import { createContext, useState, useContext, ReactNode } from "react";

type EmailContextType = {
  email: string;
  setEmail: (email: string) => void;
};

const EmailContext = createContext<EmailContextType>({
  email: "",
  setEmail: () => {},
});

export const EmailProvider = ({ children }: { children: ReactNode }) => {
  const [email, setEmail] = useState("");

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);
