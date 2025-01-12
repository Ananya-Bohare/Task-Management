/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
//import { user } from "../../assets/data";

const initialState = {
    user: (() => {
        try {
            const userInfo = localStorage.getItem("userInfo");
            return userInfo ? JSON.parse(userInfo) : null;
        } catch (error) {
            console.error("Error parsing userInfo from localStorage:", error);
            return null;
        }
    })(),
    isSidebarOpen: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.user = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.user = null;
            localStorage.removeItem("userInfo");
        },
        setOpenSidebar: (state, action) => {
            state.isSidebarOpen = action.payload;
        },
    },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;