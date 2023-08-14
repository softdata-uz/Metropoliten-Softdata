import React, {useEffect, useState} from 'react';
import icon2 from "../../../images/parkingModul/database/Vector (4).svg";
import icon5 from "../../../images/parkingModul/database/Vector (7).svg";
import icon6 from "../../../images/parkingModul/database/Vector (8).svg";
import icon9 from '../../../images/parkingModul/database/Group (2).svg';
import carIcon from '../../../images/parkingModul/database/directions_car.png';
import personIcon from '../../../images/parkingModul/database/Vector (27).png';
import notCheck from '../../../images/parkingModul/database/Vector (24).png';

import {Checkbox, Dropdown, Menu, Progress} from "antd";
import burger from "../../../images/parkingModul/database/Vector (23).png";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";

import './databaseBlack.css';
import FaceDatabaseAdd from "./FaceDatabaseAdd";
import editIcon from "../../../images/parkingModul/database/Vector (25).png";
import deleteIcon from "../../../images/parkingModul/database/Vector (26).png";
import FaceAddModalBlack from "./addModal/FaceAddModalBlack";
import axios from "axios";
import {ip} from "../../../ip";
import FaceDatabaseBlackPagination from "./FaceDatabaseBlackPagination";
import FaceBlackDeleteModal from "./deleteModal/FaceBlackDeleteModal";
import FaceAddDeleteModal from "./deleteModal/FaceAddDeleteModal";

const CheckboxGroup = Checkbox.Group;


const FaceDatabaseBlack = () => {

    const isDarkMode = useSelector(state => state.theme.theme_data);
    const {t} = useTranslation();
    const lang = localStorage.getItem('i18nextLng');


    const [dataTest, setDataTest] = useState([]);
    const [testTotal, setTestTotal] = useState(null);
    const [testPaginationLimit, setTestPaginationLimit] = useState(12);
    const [testPaginationCurrent, setTestPaginationCurrent] = useState(1);
    const [testInitialValues, setTestInitialValues] = useState({
        name_uz: '',
        name_ru: '',
        name_en: '',
        type: '',
    })
    const [percent, setPercent] = useState(0);
    const getTestGroup = () => {
        axios.get(`${ip}/face-recognation-service/api/category/${testPaginationLimit}/${testPaginationCurrent}`, {
            headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
        })
            .then((res) => {
                // console.log(res);
                setTestTotal(res.data.count);
                setDataTest(res.data.data);
                setPercent(res.data.percent)
            })
    }
    useEffect(() => {
        getTestGroup();
    }, [testPaginationLimit, testPaginationCurrent, testTotal]);


    const testPaginationOnchange = (e = 1, option) => {
        setTestPaginationCurrent(e)
        setTestPaginationLimit(option)
    }
    useEffect(() => {

    }, [
        testPaginationLimit,
        testPaginationCurrent,
    ]);

    const [checkedList, setCheckedList] = useState([]);

    const onChange = (list) => {
        const isChecked = checkedList.some(item => item === list.id)
        if (isChecked) {
            const filterChecked = checkedList.filter(item => item !== list.id);
            setCheckedList(filterChecked);
        } else {
            setCheckedList(prev => [...prev, list.id]);
        }
    };
    const onCheckAllChange = (e) => {
        setCheckedList(dataTest.length === checkedList.length ? [] : dataTest.map(item => item.id));
    };

    // delete card
    const [deleteBlackModal, setDeleteBlackModal] = useState(false)
    const deleteDataTest = () => {
        if (checkedList.length > 0) {
            setDeleteBlackModal(true);
        }
    }

    const clearDataTest = () => {
        axios.delete(`${ip}/face-recognation-service/api/clear/category`,
            {
                data: checkedList,
                headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
            }
        )
            .then((res) => {
                console.log(res)
                setCheckedList([]);
                getTestGroup()
            })
    }

    const editCamera = (value) => {
        console.log(value)
        setTestInitialValues({
            ...value,
            edit: true
        });
        setModalOpenBlack(true);
    }

    // change page
    const [pageChange, setPageChange] = useState(true);
    const [categoryId, setCategoryId] = useState([]);
    const chanePage = (item) => {
        setPageChange(false);
        setCategoryId(item);
    }

    // change page

    function WidgetMenu(props) {
        const deleteForButton = () => {
            checkedList.push(props.value.id);
            if (checkedList.length > 0) {
                setDeleteBlackModal(true);
            }
        }

        return (
            <Menu {...props}>
                <Menu.Item>
                    <div className="parking_database_dropEdit" onClick={() => editCamera(props.value)}>
                        <div className="icon"><img src={editIcon} alt={"image"}/></div>
                        <span>{t("Tahrirlash")}</span>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div className="parking_database_dropDelete" onClick={() => deleteForButton()}>
                        <div className="icon"><img src={deleteIcon} alt={"image"}/></div>
                        <span>{t("O‘chirish")}</span>
                    </div>
                </Menu.Item>
            </Menu>
        );
    }

    const [modalOpenBlack, setModalOpenBlack] = useState(false);
    const addModalOpen = () => {
        setTestInitialValues({
            name_uz: '',
            name_ru: '',
            name_en: '',
            type: '',
        })
        setModalOpenBlack(true);
    }
    const upDate = () => {
        getTestGroup();
        // window.location.reload(false);
    }

    return (
        <div>
            {pageChange === true ?
                <div className="parking_database_black">
                    <div className="parking_database_black_top">
                        <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>
                            {t('Ma’lumotlar bazasi')}
                        </p>
                        <div className="parking_database_black_top_pagination">
                            <FaceDatabaseBlackPagination
                                testPaginationLimit={testPaginationLimit}
                                testPaginationCurrent={testPaginationCurrent}
                                testPaginationOnchange={testPaginationOnchange}
                                testTotal={testTotal}
                            />
                        </div>
                    </div>

                    <div className={`parking_database_black_body ${isDarkMode && 'darkModeBackground darkModeBorder'}`}>
                        <div className="parking_database_black_body_topButtons">
                            <div className="parking_database_black_body_topButtons_left">
                                <button type="button"
                                        className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `}>
                                    <div className={`parking_database_black_body_topButtons_left_buttonText  `}
                                         onClick={addModalOpen}><img src={icon2}/>
                                        {t('Yaratish')}
                                    </div>
                                </button>

                                {/*onClick={chanePage}*/}
                                {/*<button type="button">*/}
                                {/*    <div className="parking_database_black_body_topButtons_left_buttonText"><img src={icon3}/>{t("Qo'shish")}</div>*/}
                                {/*</button>*/}

                                <button type="button" onClick={deleteDataTest}
                                        className={checkedList.length > 0 ? `deleteButton ${isDarkMode && 'darkModeBackground darkModeBorder'}`
                                            : `${isDarkMode && 'darkModeBackground darkModeBorder'}`}>
                                    <div className={`parking_database_black_body_topButtons_left_buttonText `}>
                                        <img src={icon5}/>{t('O‘chirish')}
                                    </div>
                                </button>
                                <button type="button" onClick={clearDataTest}
                                        className={checkedList.length > 0 ? `filterButton ${isDarkMode && 'darkModeBackground darkModeBorder'}`
                                            : `${isDarkMode && 'darkModeBackground darkModeBorder'}`}>
                                    <div className="parking_database_black_body_topButtons_left_buttonText"><img
                                        src={icon9}/>{t('Tozalash')}</div>
                                </button>
                                <button type="button" onClick={upDate}  className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `}>
                                    <div className="parking_database_black_body_topButtons_left_buttonText"><img
                                        src={icon6}/>{t('Yangilash')}</div>
                                </button>
                                <div className="parking_database_black_body_topButtons_progress">
                                    <div className="parking_database_black_body_topButtons_progress_inner">
                                        <Progress percent={percent} size="small"/>
                                        <span className={` ${isDarkMode && 'darkModeColor'}`}>
                                        {t("Ma'lumotlar")} {percent}%
                                    </span>
                                    </div>
                                    <div className="parking_database_black_body_topButtons_progress_inner">
                                        <Progress percent={percent} size="small"/>
                                        <span className={` ${isDarkMode && 'darkModeColor'}`}>
                                        {t("Saqlangan")} {percent}%
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className={` ${isDarkMode && 'darkModeColor'}`}>
                                    {t('Ma’lumotlar soni:') + " " + testTotal}
                                </span>
                            </div>
                        </div>
                        <div className="parking_database_black_body_cards">
                            <div className="parking_database_black_body_cards_head">
                                <Checkbox
                                    indeterminate={dataTest.length === checkedList.length ? false : checkedList.length > 0}
                                    onChange={onCheckAllChange}
                                    checked={dataTest.length === checkedList.length && dataTest.length !== 0}
                                >
                                    {t("Barchasini belgilash")}
                                </Checkbox>
                            </div>
                            <div className={`parking_database_black_body_cards_body `}>
                                {
                                    dataTest?.map((item, index) => {
                                        const isChecked = checkedList?.some(check => check === item.id)
                                        return (
                                            <div className={`parking_database_black_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`} key={index}
                                                 onClick={() => chanePage(item)}>
                                                <div className="parking_database_black_body_cards_body_card_top">
                                                    <div
                                                        className="parking_database_black_body_cards_body_card_top_left"
                                                        onClick={event => event.stopPropagation()}>
                                                        <Checkbox
                                                            checked={isChecked}
                                                            onChange={() => onChange(item)}
                                                            type="checkbox"
                                                        >
                                                            <span className={`${isDarkMode && 'darkModeColor'}`}>{item[`name_${lang}`]}</span>
                                                        </Checkbox>
                                                        {/*<span style={{marginLeft: "10px"}}>{item[`name_${lang}`]}</span>*/}
                                                    </div>
                                                    <div className="" onClick={event => event.stopPropagation()}>
                                                        <Dropdown overlay={<WidgetMenu value={item}/>}
                                                                  placement="bottomRight"
                                                        >
                                                            <div className="burgerImg">
                                                                <img src={burger} className="burgerImg"/>
                                                            </div>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                                <div className="parking_database_black_body_cards_body_card_body">
                                                    <div
                                                        className="parking_database_black_body_cards_body_card_body_left">
                                                        <img src={personIcon}/>
                                                        <span className={`${isDarkMode && 'darkModeColor'}`} style={{marginLeft: "5px"}}>{item.item_count}</span>
                                                    </div>
                                                    <div className="parking_database_black_body_cards_body_card_body_right">
                                                        {/*className={item.type === "whitelist" ? "whiteList" : "blackList"}>*/}
                                                        <span>{item.type === "0" ? t("Unknown") : (item.type=== "1" ? t("History") : (item.type === "2" ?
                                                            t("Blacklist") : (item.type=== "3" ? t("Whitelist") : (item.type === "4" ? t("Alarm") : t("Passerby")))))}</span>
                                                    </div>
                                                </div>
                                                <div className={`parking_database_black_body_cards_body_card_footer ${isDarkMode && 'darkModeLayautBg'}`}
                                                    // onClick={() => chanePage(item)}
                                                >
                                                    <img src={notCheck}/> <span
                                                    style={{marginLeft: "5px"}}>{t("Tekshirilmagan")}</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>

                </div>
                :
                <FaceDatabaseAdd
                    pageChange={pageChange}
                    setPageChange={setPageChange}
                    categoryId={categoryId}
                    getTestGroup={getTestGroup}
                />
            }
            <FaceAddModalBlack
                modalOpenBlack={modalOpenBlack}
                setModalOpenBlack={setModalOpenBlack}
                setDataTest={setDataTest}
                testPaginationLimit={testPaginationLimit}
                testPaginationCurrent={testPaginationCurrent}
                setTestTotal={setTestTotal}
                testInitialValues={testInitialValues}
                setTestInitialValues={setTestInitialValues}
                getTestGroup={getTestGroup}
            />
            <FaceBlackDeleteModal
                deleteBlackModal={deleteBlackModal}
                setDeleteBlackModal={setDeleteBlackModal}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                getTestGroup={getTestGroup}
            />
        </div>
    );
};

export default FaceDatabaseBlack;