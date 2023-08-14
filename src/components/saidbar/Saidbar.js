import React, {useEffect, useState} from 'react';
import {Avatar, Badge, Layout, Menu, Space, Tooltip} from 'antd';
import Switch from "react-switch"
import {BrowserRouter, Link} from 'react-router-dom'
import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined,} from '@ant-design/icons';
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getTheme, isRefresh} from "../../redux";
import {ip} from "../../ip";
import {BsFillCloudMoonFill, WiSunrise} from "react-icons/all";
import RootPage from '../../pages/root';
import useWindowDimensions from '../../hooks/hooks';
import 'antd/dist/antd.css';

import logo_light from '../../images/logo_light.svg';
import logo from '../../images/metroBiocontrol/logo.svg';
import dashborad from '../../images/metroBiocontrol/dashboardIcon.svg';
import users from '../../images/metroBiocontrol/users.svg';
import calendar from '../../images/metroBiocontrol/calendar.svg';
import setting from '../../images/metroBiocontrol/settings.svg';
import cart_buy from '../../images/metroBiocontrol/cart-shopping.svg';
import bell from '../../images/metroBiocontrol/bell.svg';

import './style.css';

const {Header, Sider, Content} = Layout;
const {SubMenu} = Menu;

const Saidbar = ({user, setUser}) => {
    const {t, i18n} = useTranslation();
    const [lang, setLang] = useState(localStorage.getItem('i18nextLng') || 'uz')
    const [openKeys, setOpenKeys] = React.useState(['sub1']);

    const rootSubmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6', 'sub7', 'sub8', 'sub9',];

    const {width} = useWindowDimensions();
    const sidebarWidth = width < 1370 ? 200 : 300;
    const isDarkMode = useSelector(state => state.theme.theme_data);

    const dispatch = useDispatch();


    const handleChangeTheme = (state) => {
        dispatch(getTheme(state))
    }

    const handleClickListItem = (title, id) => {
        // setCheckedItemTitle(title)
        dispatch(isRefresh(id));

        // localStorage.setItem('selected-id', id);
        localStorage.setItem('selected-id', JSON.stringify(id));

    }


    const onOpenChange = keys => {

        const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
            localStorage.setItem('keys', JSON.stringify(keys));
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
            localStorage.setItem('keys', JSON.stringify(latestOpenKey ? [latestOpenKey] : []));
        }
    };
    const openKeysLocal = JSON.parse(localStorage.getItem('keys'));

    useEffect(() => {

    }, [openKeys, openKeysLocal]);

    const onChangeLanguage = (event) => {
        const lang = event.target.value
        setLang(lang)
        i18n.changeLanguage(lang)
        localStorage.setItem('i18nextLng', lang)
    }

    const LogoComponent = () => {
        return (<div className="dashboard">
                <p className={`saidbar_title  ${isDarkMode && 'darkModeColor'}`}>{t('Boshqaruv paneli')}</p>
            </div>)
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('soft-ais-token');
        // localStorage.setItem('selected-id' , '2');
        // localStorage.setItem('keys', JSON.stringify(['sub1']));

    }

    return (<BrowserRouter>
            <Layout style={{height: '100vh'}}>
                <Sider
                    width={sidebarWidth}
                    theme={isDarkMode ? 'dark' : 'light'}
                    className={`siderBackColor ${isDarkMode && 'darkModeBackground'}`}
                    trigger={null}
                    collapsible
                >
                    <div className="saidbar_top_bottom">
                        <div>
                            <div className="logo">
                                    <img className="logo_img " src={logo} alt=""/>
                            </div>

                            <Menu
                                theme={isDarkMode ? 'dark' : 'light'}
                                className={`siderBackColor_menu ${isDarkMode && 'darkModeBackground'}`}
                                onOpenChange={onOpenChange}
                                openKeys={openKeys}
                                mode="inline"
                                defaultSelectedKeys={['2']}
                                defaultOpenKeys={['sub1']}
                            >
                                <LogoComponent/>

                                <Menu.Item className={`saidbar_link ${isDarkMode && 'darkModeBackground'}`}
                                           onClick={() => handleClickListItem('Dashboard', 2)}
                                           key="2"
                                           icon={!isDarkMode ? <img src={dashborad} alt=""/> :
                                               <img src={dashborad} alt=""/>}>
                                    <Link to="/">
                                        {t('Dashboard')}
                                    </Link>
                                </Menu.Item>
                                <Menu.Item className={`saidbar_link ${isDarkMode && 'darkModeBackground'}`}
                                           onClick={() => handleClickListItem('Xodimlar', 3)}
                                           key="3" icon={!isDarkMode ? <img src={users} alt=""/> :
                                    <img src={users} alt=""/>}>
                                    <Link to="/employees">
                                        {t('Xodimlar')}
                                    </Link>
                                </Menu.Item>

                                <Menu.Item className={`saidbar_link ${isDarkMode && 'darkModeBackground'}`}
                                           onClick={() => handleClickListItem('Ish vaqti jadvali', 4)}
                                           key="4" icon={!isDarkMode ? <img src={calendar} alt=""/> :
                                    <img src={calendar} alt=""/>}>
                                    <Link to="/working-time-table">
                                        {t('Ish vaqti jadvali')}
                                    </Link>
                                </Menu.Item>

                                <Menu.Item className={`saidbar_link ${isDarkMode && 'darkModeBackground'}`}
                                           onClick={() => handleClickListItem('Xodimlar', 5)}
                                           key="5" icon={!isDarkMode ? <img src={cart_buy} alt=""/> :
                                    <img src={cart_buy} alt=""/>}>
                                    <Link to="/orders">
                                        {t('Buyurtmalar')}
                                    </Link>
                                </Menu.Item>

                                <Menu.Item className={`saidbar_link ${isDarkMode && 'darkModeBackground'}`}
                                           onClick={() => handleClickListItem('Face Control Sozlamalar', 6)}
                                           key="6" icon={!isDarkMode ? <img src={setting} alt=""/> :
                                    <img src={setting} alt=""/>}>
                                    <Link to="/settings">
                                        {t('Sozlamalar')}
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </div>

                        <div className="saidbar_bottom">
                            Powered by <img className="logo_img_softdata " src={logo_light} alt=""/>
                        </div>
                    </div>
                </Sider>


                <Layout className={`site-layout ${isDarkMode && 'darkModeLayautBg'} `}>
                    <Header theme={isDarkMode ? 'dark' : 'light'}
                            className={`site-layout-background headerr ${isDarkMode && 'darkModeBackground'} `}
                            style={{padding: 0}}>

                        <div className="header_navbar">
                            <div className="header_left">
                                <span >Versiob V0.1</span>
                            </div>
                            <div className="header_right">
                                {/*<div className="language" style={{marginRight: '15px'}}>*/}
                                {/*    <select className='lang_dropdown' onChange={onChangeLanguage} defaultValue={lang}>*/}
                                {/*        <option defaultValue="uz" value="uz">O'zbekcha</option>*/}
                                {/*        <option value="ru">Русский</option>*/}
                                {/*        <option value="en">English</option>*/}
                                {/*    </select>*/}
                                {/*</div>*/}

                                <Switch
                                    onChange={handleChangeTheme}
                                    checked={isDarkMode}
                                    checkedIcon={false}
                                    uncheckedIcon={false}
                                    offColor="#F7F7F7"
                                    onColor="#343D50"
                                    checkedHandleIcon={<div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            fontSize: 15,
                                            paddingRight: 2
                                        }}
                                    >
                                        <BsFillCloudMoonFill/>
                                    </div>}
                                    uncheckedHandleIcon={<div
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: "100%",
                                            fontSize: 20,
                                            color: "orange",
                                        }}
                                    >
                                        <WiSunrise/>
                                    </div>}
                                />

                                <div className="header_notif_badge">
                                    <Space size="middle">
                                        <Badge count={7}>
                                            <Avatar shape="square"  size="middle" icon={<img src={bell} alt=""/>}/>
                                        </Badge>
                                    </Space>
                                </div>

                                <div className="username_img_title">
                                    <div title='Chiqish' onClick={logout} className="rount_img">
                                        {
                                            user && <img src={`${ip}/${user.image}`} alt=""/>
                                        }
                                    </div>
                                    <div className="username">Xurshid Istamov</div>
                                </div>


                            </div>
                        </div>
                    </Header>

                    <Content className={`site-layout-background ${isDarkMode && 'darkModeBackground'}`}>
                        <div className={`content_bottom ${isDarkMode && 'darkModeLayautBg'}`}>
                            <RootPage/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>);
};


export default Saidbar;