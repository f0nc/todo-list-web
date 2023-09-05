'use client'

import { useUser } from "@auth0/nextjs-auth0/client";
import MainView from "./components/MainView";
import LoginView from "./components/LoginView";

export default function Home(props) {
    const { user } = useUser();

    if (user) {
        return <MainView user={user}/>
    }

    return <LoginView />
}