import React, {useState} from 'react'

import LoginPage from './components/loginPage/Login'
import App from './App'
import {ConfigProvider, theme} from "antd";
import LoginNewPage from "./components/loginPage/LoginNewPage";

function Auth() {

    const [user, setUser] = useState(null)

    if (user && (user.role === 'king')) {
        return <App setUser={setUser} user = {user} />

        // return(
        //     <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
        //         <App/>
        //     </ConfigProvider>
        //     )
    }

    return (
        <LoginNewPage user={user} setUser={setUser}/>
        // <LoginPage user={user} setUser={setUser}/>
    )
}

export default Auth
