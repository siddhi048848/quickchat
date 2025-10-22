import { createContext, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import {io} from "socket.io-client";
import { useEffect } from "react";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    //Check if user is authenticated and if so, set the user data and connect the socket
    const checkAuth = async () => {
        try{
            const {data} = await axios.get("/api/auth/check")
            if(data.success){
                setAuthUser(data.user);
                connectSocket(data.user);
            }
        } catch(error){
            toast.error(error.message)
        }
    }

    //Login function to handle user authentication and socket connection 
    const login = async (state, Credentials) => {
        try{
            const {data} = await axios.post(`/api/auth/${state}`, Credentials);
            if(data.success){
                axios.defaults.headers.common["token"] = data.token;
                setToken(data.token);
                localStorage.setItem("token", data.token);
                setAuthUser(data.user);
                connectSocket(data.userData);
                toast.success(data.message);
                return true;
            }else{
                toast.error(data.message);
            }

        } catch(error){
            toast.error(error.message)
        }
    }


    //logout function to clear user data and disconnect socket
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setAuthUser(null);
        setOnlineUsers([]);
        axios.defaults.headers.common["token"] = null;
        toast.success("Logged out successfully");
        socket.disconnect();
    }

    //update profile function to handle user profile updates
    const updateProfile = async (body) => {
        try{
            const {data} = await axios.put("/api/auth/update-profile", body);
            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile updated successfully");
            }
        } catch(error){
            toast.error(error.message)
        }
    }


    //connect socket function to handle socket connection and online 
    //user updates

    const connectSocket = (userData) => {
        if(!userData || socket?.connected) return;
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds);
        })
    }

    useEffect(() => {
        if(token){
            axios.defaults.headers.common["token"] = token;
        }
        checkAuth();
    }, [])

    const value = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value = {value}> 
            {children}
        </AuthContext.Provider>
    )
}