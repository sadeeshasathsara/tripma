import React, { createContext, useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const useToastProvider = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {

    const sendMessage = (message, type) => {
        switch (type) {
            case 'success':
                toast.success(message)
                break
            case 'error':
                toast.error(message)
                break
            case 'info':
                toast.info(message)
                break
            case 'warning':
                toast.warning(message)
                break
            default:
                toast(message)
                break
        }
    }

    return (
        <ToastContext.Provider value={{ sendMessage }}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
        </ToastContext.Provider>
    );
};
