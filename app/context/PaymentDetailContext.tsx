"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Definisikan tipe context
interface DataContextType {
  data: any;
  setData: (data: any) => void;
}

// Gunakan createContext dengan default null
const DataContext = createContext<DataContextType | null>(null);

// Provider dengan tipe yang lebih jelas
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook untuk mengambil context
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
