"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  SetStateAction,
} from "react";

interface ContextType {
  globalState: number;
  setGlobalState: React.Dispatch<SetStateAction<number>>;
  categoryName: string | null;
  setCategoryName: React.Dispatch<SetStateAction<string | null>>;
  tagName: string | null;
  setTagName: React.Dispatch<SetStateAction<string | null>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<SetStateAction<number>>;
  minPrice: number;
  setMinPrice: React.Dispatch<SetStateAction<number>>;
}

export const Context = createContext<ContextType>({
  globalState: 0,
  setGlobalState: () => {},
  categoryName: null,
  setCategoryName: () => {},
  tagName: null,
  setTagName: () => {},
  maxPrice: 700,
  setMaxPrice: () => {},
  minPrice: 25,
  setMinPrice: () => {},
});

interface CountryContextProps {
  children: ReactNode;
}

export const GreenShopContext: React.FC<CountryContextProps> = ({
  children,
}) => {
  const [globalState, setGlobalState] = useState(0);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [tagName, setTagName] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState(700);
  const [minPrice, setMinPrice] = useState(25);
  return (
    <Context.Provider
      value={{
        globalState,
        setGlobalState,
        categoryName,
        setCategoryName,
        tagName,
        setTagName,
        maxPrice,
        setMaxPrice,
        minPrice,
        setMinPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};
