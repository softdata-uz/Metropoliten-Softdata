import {useEffect} from "react";
import axios from "axios";
import {ip} from "./ip";

import Saidbar from "./components/saidbar/Saidbar";
import './App.css';
import {ThemeProvider} from 'styled-components';
import {lightTheme, darkTheme, GlobalStyles} from './themes/theme';
import {useSelector} from "react-redux";

function App({setUser, user}) {

    const isDarkMode = useSelector(state => state.theme.theme_data)

    useEffect(() => {
        if (localStorage.getItem('soft-ais-token')) {
            axios.get(`${ip}/api/me`, {headers: {'x-access-token': localStorage.getItem('soft-ais-token')}})
                .then(res => {
                    setUser(res.data.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [setUser]);

    return (<ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>

            <>
                <Saidbar setUser={setUser} user={user}/>
                <GlobalStyles/>
            </>

        </ThemeProvider>

    );
}

export default App;


