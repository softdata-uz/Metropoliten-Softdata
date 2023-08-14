import React, {useEffect, useState} from 'react';
import icon2 from "../../../images/parkingModul/database/Vector (4).svg";
import icon3 from "../../../images/parkingModul/database/Vector (5).svg";
import icon5 from "../../../images/parkingModul/database/Vector (7).svg";
import icon6 from "../../../images/parkingModul/database/Vector (8).svg";
import icon9 from '../../../images/parkingModul/database/Group (2).svg';
import notCheck from '../../../images/parkingModul/database/Vector (24).png';

import {Checkbox, Dropdown, Menu, Pagination, Progress} from "antd";
import burger from "../../../images/parkingModul/database/Vector (23).png";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import FaceDatabaseAdd from "./FaceDatabaseAdd";
import editIcon from "../../../images/parkingModul/database/Vector (25).png";
import deleteIcon from "../../../images/parkingModul/database/Vector (26).png";
import userIcon from '../../../images/parkingModul/database/Vector (27).png';
import userIcon2 from '../../../images/parkingModul/database/Vector (28).png';

import './faceDatabaseBlack.css';
import AddModalBlack from "./addModal/AddModalBlack";

import styled from "styled-components";

export const PaginationStyles = styled(Pagination)`
  .ant-pagination-item, .ant-pagination-item-link, .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;

const CheckboxGroup = Checkbox.Group;
const plainOptions = [1];
const defaultCheckedList = [];

const FaceDatabaseBlack = () => {

    const isDarkMode = useSelector(state => state.theme.theme_data);
    const {t} = useTranslation();

    const [pageChange, setPageChange] = useState(true);
    const chanePage = () => {
        setPageChange(false);
    }
    useEffect(() => {

        console.log(pageChange);

    }, [pageChange, setPageChange])

    // const onChange = (e) => {
    //     console.log(`checked = ${e.target.checked}`);
    // };

    // chek group
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < plainOptions.length);
        setCheckAll(list.length === plainOptions.length);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? plainOptions : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };
    // chek group


    const [modalOpenBlack, setModalOpenBlack] = useState(false)


    function WidgetMenu(props) {
        return (<Menu {...props} >
            <Menu.Item>
                <div className="parking_database_dropEdit">
                    <div className="icon"><img src={editIcon}/></div>
                    <span>Tahrirlash</span>
                </div>
            </Menu.Item>
            <Menu.Item>
                <div className="parking_database_dropDelete">
                    <div className="icon"><img src={deleteIcon}/></div>
                    <span>O'chirish</span>
                </div>
            </Menu.Item>
        </Menu>);
    }


    return (
        <div>
        {pageChange === true ?
            <div className="face_database_black">
            <div className="face_database_black_top">
                <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>
                    {t('Ma’lumotlar bazasi')}
                </p>
                <div className="face_database_black_top_pagination">
                    <PaginationStyles defaultCurrent={1} total={40}/>
                </div>
            </div>

            <div className={`face_database_black_body ${isDarkMode && 'darkModeBackground darkModeBorder '}`}>
                <div className="face_database_black_body_topButtons">
                    <div className="face_database_black_body_topButtons_left">
                        <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `}
                                type="button">
                            <div className="face_database_black_body_topButtons_left_buttonText"
                                 onClick={chanePage}><img src={icon2}/>{t('Yaratish')}</div>
                        </button>
                        <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `}
                                type="button" onClick={() => setModalOpenBlack(true)}>
                            <div className="face_database_black_body_topButtons_left_buttonText"><img
                                src={icon3}/>{t("Qo'shish")}</div>
                        </button>
                        <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `}
                                type="button">
                            <div className="face_database_black_body_topButtons_left_buttonText"><img
                                src={icon5}/>{t('O‘chirish')}</div>
                        </button>
                        <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `}
                                type="button">
                            <div className="face_database_black_body_topButtons_left_buttonText"><img
                                src={icon9}/>{t('Tozalash')}</div>
                        </button>
                        <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `}
                                type="button">
                            <div className="face_database_black_body_topButtons_left_buttonText"><img
                                src={icon6}/>{t('Yangilash')}</div>
                        </button>
                        <div className="face_database_black_body_topButtons_progress">
                            <div className="face_database_black_body_topButtons_progress_1">
                                <Progress percent={30} size="small"/>
                                <span className={` ${isDarkMode && 'darkModeColor'}`}>Ma'lumotlar {30}%</span>
                            </div>
                            <div className="face_database_black_body_topButtons_progress_1">
                                <Progress percent={60} size="small"/>
                                <span className={` ${isDarkMode && 'darkModeColor'}`}>Saqlangan {60}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="face_database_black_body_cards">
                    <div className="face_database_black_body_cards_head">
                        <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                            Barchasini belgilash
                        </Checkbox>
                        {/*<Checkbox onChange={onChange}>Barchasini belgilash</Checkbox>*/}
                    </div>
                    <CheckboxGroup onChange={onChange}>
                        <div className="face_database_black_body_cards_body">
                            <div
                                className={`face_database_black_body_cards_body_card  ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                <div className="face_database_black_body_cards_body_card_top">
                                    <div className="face_database_black_body_cards_body_card_top_left">
                                        <Checkbox value={1}></Checkbox>
                                        <span className={` ${isDarkMode && 'darkModeColor'}`}
                                              style={{marginLeft: "10px"}}>Test baza</span>
                                    </div>
                                    <div className="">
                                        <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                            <img src={burger}/>
                                        </Dropdown>
                                    </div>
                                </div>
                                <div className="face_database_black_body_cards_body_card_body">
                                    <div className="face_database_black_body_cards_body_card_body_left">
                                        <div
                                            className="face_database_black_body_cards_body_card_body_left_inner">
                                            <img src={userIcon}/>
                                            <span style={{marginLeft: "5px"}}>1</span>
                                        </div>
                                        <div
                                            className="face_database_black_body_cards_body_card_body_left_inner">
                                            <img src={userIcon2}/>
                                            <span style={{marginLeft: "5px"}}>1</span>
                                        </div>
                                    </div>
                                    <div><span style={{color: "#888D97"}}>General</span></div>
                                </div>
                                <div
                                    className={`face_database_black_body_cards_body_card_footer ${isDarkMode && 'darkModeLayautBg'}`}>
                                    <img src={notCheck}/> <span
                                    style={{marginLeft: "5px"}}>Tekshirilmagan</span>
                                </div>
                            </div>
                        </div>
                    </CheckboxGroup>
                </div>
            </div>

        </div> : <FaceDatabaseAdd
            pageChange={pageChange}
            setPageChange={setPageChange}
        />}
        <AddModalBlack
            modalOpenBlack={modalOpenBlack}
            setModalOpenBlack={setModalOpenBlack}
        />
    </div>);
};

export default FaceDatabaseBlack;