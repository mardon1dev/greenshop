"use client";
import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface ContextType {
  categoryName: string | null;
  setCategoryName: Dispatch<SetStateAction<string | null>>;
  tagName: string | null;
  setTagName: Dispatch<SetStateAction<string | null>>;
  maxPrice: number;
  setMaxPrice: Dispatch<SetStateAction<number>>;
  minPrice: number;
  setMinPrice: Dispatch<SetStateAction<number>>;
  size: string | null;
  setSize: Dispatch<SetStateAction<string | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  userName: string | null;
  setUserName: Dispatch<SetStateAction<string | null>>;
  userId: string | null;
  setUserId: Dispatch<SetStateAction<string | null>>;
}

export const Context = createContext<ContextType>({
  categoryName: null,
  setCategoryName: () => {},
  tagName: null,
  setTagName: () => {},
  maxPrice: 900,
  setMaxPrice: () => {},
  minPrice: 25,
  setMinPrice: () => {},
  size: null,
  setSize: () => {},
  token: null,
  setToken: () => {},
  userName: null,
  setUserName: () => {},
  userId: null,
  setUserId: () => {},
});

interface GreenShopContextProps {
  children: ReactNode;
}

export const GreenShopContext: React.FC<GreenShopContextProps> = ({
  children,
}) => {
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [tagName, setTagName] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(900);
  const [minPrice, setMinPrice] = useState<number>(25);
  const [size, setSize] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    try {
      setToken(localStorage.getItem("access_token"));
      setUserName(localStorage.getItem("firstName"));
      setUserId(localStorage.getItem("userId"));
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (token) {
        localStorage.setItem("access_token", token);
      } else {
        localStorage.removeItem("access_token");
      }
    } catch (error) {
      console.error("Error updating token in localStorage:", error);
    }
  }, [token]);

  useEffect(() => {
    try {
      if (userName) {
        localStorage.setItem("firstName", userName);
      } else {
        localStorage.removeItem("firstName");
      }
    } catch (error) {
      console.error("Error updating userName in localStorage:", error);
    }
  }, [userName]);

  useEffect(() => {
    try {
      if (userId) {
        localStorage.setItem("userId", userId);
      } else {
        localStorage.removeItem("userId");
      }
    } catch (error) {
      console.error("Error updating userId in localStorage:", error);
    }
  }, [userId]);

  return (
    <Context.Provider
      value={{
        categoryName,
        setCategoryName,
        tagName,
        setTagName,
        maxPrice,
        setMaxPrice,
        minPrice,
        setMinPrice,
        size,
        setSize,
        token,
        setToken,
        userName,
        setUserName,
        userId,
        setUserId,
      }}
    >
      {children}
    </Context.Provider>
  );
};
