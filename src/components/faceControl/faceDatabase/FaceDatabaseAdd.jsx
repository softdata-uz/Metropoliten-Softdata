import React, {useEffect, useState} from 'react';

import {Checkbox, Dropdown, Menu} from 'antd';
import {message} from "antd";
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import icon1 from '../../../images/parkingModul/database/Vector (3).svg';
import icon2 from '../../../images/parkingModul/database/Vector (4).svg';
import icon4 from '../../../images/parkingModul/database/Vector (6).svg';
import icon5 from '../../../images/parkingModul/database/Vector (7).svg';
import icon6 from '../../../images/parkingModul/database/Vector (8).svg';
import icon7 from '../../../images/parkingModul/database/Vector (9).svg';
import icon8 from '../../../images/parkingModul/database/Vector (10).svg';
import flag from '../../../images/parkingModul/database/Group 55888 (2).png';
import burger from '../../../images/parkingModul/database/Vector (23).png';
import editIcon from '../../../images/parkingModul/database/Vector (25).png';
import deleteIcon from '../../../images/parkingModul/database/Vector (26).png';
import exel from '../../../images/exel.svg';
import uzbFlag from "../../../images/uzbFlag.png";


import undifan from '../../../images/parkingModul/database/cars/CoveredCar_v1b 1.png';
import pickup from '../../../images/parkingModul/database/cars/Group (2).png';
import sedan from '../../../images/parkingModul/database/cars/Group (3).png';
import suv from '../../../images/parkingModul/database/cars/Group (4).png';
import lightTrack from '../../../images/parkingModul/database/cars/Group (5).png';
import truck from '../../../images/parkingModul/database/cars/Group (6).png';
import bus from '../../../images/parkingModul/database/cars/Group (7).png';
import miniBus from '../../../images/parkingModul/database/cars/Group 55889.png';
import heavyTruck from '../../../images/parkingModul/database/cars/Group 55890.png';
import medicalCar from '../../../images/parkingModul/database/cars/Group (8).png';
import fireCar from '../../../images/parkingModul/database/cars/Group (9).png';
import policeCar from '../../../images/parkingModul/database/cars/Group 55888 (3).png';
import {MdOutlineCancel, MdOutlinePersonOutline} from "react-icons/md";

import moment from "moment";

import FaceAddModal from "./addModal/FaceAddModal";

import './database.css';
// import '../databaseIndentification/faceDatabase.css';
import axios from "axios";
import {ip} from "../../../ip";
import FaceDatabaseAddPagination from "./addModal/FaceDatabaseAddPagination";
import FaceAddDeleteModal from "./deleteModal/FaceAddDeleteModal";
import userimg from "../../../images/parkingModul/database/Rectangle 617.png";
// import {ax} from "chart.js/dist/chunks/helpers.core";

const CheckboxGroup = Checkbox.Group;


const FaceDatabaseAdd = (props) => {

    const {
        pageChange,
        setPageChange,
        categoryId,
        setCategoryId,
        getTestGroup
    } = props;

    const isDarkMode = useSelector(state => state.theme.theme_data);
    const {t} = useTranslation();
    const lang = localStorage.getItem('i18nextLng');

    const [checkedList, setCheckedList] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [listTotal, setListTotal] = useState(null);
    const [listPaginationLimit, setListPaginationLimit] = useState(12);
    const [listPaginationCurrent, setListPaginationCurrent] = useState(1);
    const [listInitialValues, setListInitialValues] = useState({
        image: "",
        fullname: "",
        gender: "",
        date_of_birth: "",
        address: "",
        document_type: "",
        seria: "",
        category_id: "",
    });

    const getListGroup = async (e) => {
        // console.log(e?.target.name);
        const response = await axios.get(`${ip}/face-recognation-service/api/human_list/${categoryId.id}/${listPaginationLimit}/${listPaginationCurrent}`, {
            // params: {searched_data : id.target.value},
            headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
        })
        const {data} = response;

        const count = data.count;
        setListTotal(count)
        const newData = data.data.map((item, index) => (
            {
                ...item,
                date_of_birth: moment(item.date_of_birth),
            }
        ))

        // response.data.ids.forEach(item => {
        //         setCheckedList(prev => [...prev, item.id])
        // })


        setDataList(newData)
    }


    // console.log(dataList)

    // const getListGroup = () => {
    //     axios.get(`${ip}/parking-service/api/vehicle_list/${categoryId.id}/${listPaginationLimit}/${listPaginationCurrent}`, {
    //         headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
    //     })
    //         .then((res) => {
    //             // console.log(res);
    //             setListTotal(res.data.count);
    //             setDataList(res.data.data);
    //         })
    // }

    useEffect(() => {
        if (searched === false && pageChange === false) {
            getListGroup()
        }
        getTestGroup();
    }, [listPaginationLimit, listPaginationCurrent, listTotal]);


    const listPaginationOnchange = (e = 1, option) => {
        setListPaginationCurrent(e)
        setListPaginationLimit(option)
    }
    useEffect(() => {

    }, [listPaginationLimit, listPaginationCurrent,]);


    // chek group


    const onChange = (list) => {
        const isChecked = checkedList.some(item => item === list.id)
        if (isChecked) {
            const filterChecked = checkedList.filter(item => item !== list.id)
            setCheckedList(filterChecked);
        } else {
            setCheckedList(prev => [...prev, list.id]);
        }
    };
    const onCheckAllChange = (e) => {
        setCheckedList(dataList.length === checkedList.length ? [] : dataList.map(item => item.id));
    };
    // chek group

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setListInitialValues({
            image: "",
            fullname: "",
            gender: "",
            date_of_birth: "",
            address: "",
            document_type: "",
            seria: "",
            category_id: "",
        });
        setIsModalOpen(true);
    }


    // delete card
    const [deleteModal, setDeleteModal] = useState(false);
    const deleteDataList = () => {
        if (checkedList.length > 0) {
            setDeleteModal(true);
        }
    }


    const editCamera = (value) => {
        setListInitialValues({
            ...value,
            edit: true
        });
        setIsModalOpen(true);
    }

    function WidgetMenu(props) {
        const deleteForButton = () => {
            checkedList.push(props.value.id);
            if (checkedList.length > 0) {
                setDeleteModal(true);
            }
        }

        return (
            <Menu {...props}>
                <Menu.Item>
                    <div className="parking_database_dropEdit" onClick={() => editCamera(props.value)}>
                        <div className="icon"><img src={editIcon}/></div>
                        <span>{t("Tahrirlash")}</span>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div className="parking_database_dropDelete" onClick={() => deleteForButton()}>
                        <div className="icon"><img src={deleteIcon}/></div>
                        <span>{t("O‘chirish")}</span>
                    </div>
                </Menu.Item>
            </Menu>
        );
    }

    const upDate = () => {
        getListGroup();
        // window.location.reload(false);
    }

    const [searched, setSearched] = useState(false);
    const searchList = (e) => {
        setSearched(true);
        const formData = {
            searched_data: e.target.value,
        }
        const fd = new FormData();
        Object.keys(formData).forEach(i => fd.append(i, formData[i]));

        axios.get(`${ip}/face-recognation-service/api/human_list/${categoryId.id}/${listPaginationLimit}/${listPaginationCurrent}`,
            {
                params: {searched_data: e.target.value},
                headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
            })
            .then((response) => {
                // console.log(response);
                const {data} = response;
                const count = data.count;
                setListTotal(count)
                const newData = data.data.map((item, index) => (
                    {
                        ...item,
                        from_date: moment(item.from_date),
                        to_date: moment(item.to_date),
                    }
                ))
                setDataList(newData);
            })
    }


// upload excel file
    // img
    const [fileState, setFileState] = useState({
        initial: true,
        uploaded: false,
        requested: false,
        check: false
    });
    // const [filee, setFilee] = useState({});
    //
    // const upload = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         // console.log('uploaded')
    //         setFilee({...filee, excel: e.target.files[0]})
    //         setFileState({
    //             initial: false,
    //             uploaded: true,
    //             requested: false,
    //             check: true
    //         })
    //     } else {
    //         setFileState({
    //             initial: true,
    //             uploaded: false,
    //             requested: false,
    //             check: false
    //         })
    //     }
    //
    //
    //     const formData = {
    //         // file: filee.excel,
    //         file: e.target.files[0],
    //     }
    //     const fd = new FormData();
    //     Object.keys(formData).forEach(i => fd.append(i, formData[i]));
    //
    //     axios.post(`${ip}/parking-service/api/excel/vehicle_list/${categoryId.id}`,
    //         fd,
    //         {headers: {'x-access-token': localStorage.getItem('soft-ais-token')}})
    //         .then((res) => {
    //             console.log(res)
    //             getListGroup();
    //             message.success(res.data.msg);
    //         })
    //         .catch(err => {
    //             message.error(err.response.data.msg);
    //             // console.log(err?.response?.data)
    //         })
    // }
    // img
// upload excel file


    // const sendExcel = () => {
    //
    //     let excelId = Array.from(new Set(checkedList));
    //
    //     axios.put(`${ip}/parking-service/api/update/vehicle_list`,
    //         {
    //             data: excelId
    //         },
    //         {
    //             headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
    //         }
    //     )
    //         .then((res) => {
    //             console.log(res)
    //             getListGroup();
    //             setCheckedList([]);
    //             setFileState({
    //                 initial: true,
    //                 uploaded: false,
    //                 requested: false,
    //                 check: false
    //             });
    //         })
    // }

    // const cencelExcel = () => {
    //     axios.get(`${ip}/parking-service/api/cancel/vehicle_list`,
    //         {
    //             headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
    //         }
    //     )
    //         .then((res) => {
    //             console.log(res)
    //                 getListGroup();
    //                 setCheckedList([]);
    //                 setFileState({
    //                     initial: true,
    //                     uploaded: false,
    //                     requested: false,
    //                     check: false
    //                 })
    //             }
    //         )
    //         .catch(err => console.log(err))
    // }

    return (
        <div>
            <div className="parking_database">

                <div className="parking_database_top">
                    <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>
                        {t('Ma’lumotlar bazasi')}
                    </p>
                    <div className="parking_database_top_pagination">
                        <FaceDatabaseAddPagination
                            listPaginationLimit={listPaginationLimit}
                            listPaginationCurrent={listPaginationCurrent}
                            listPaginationOnchange={listPaginationOnchange}
                            listTotal={listTotal}
                        />
                    </div>
                </div>

                <div className={`parking_database_body ${isDarkMode && 'darkModeBackground darkModeBorder'}`}>
                    <div className="parking_database_body_topButtons">
                        <div className="parking_database_body_topButtons_left">
                            <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `} type="button">
                                <div className="parking_database_body_topButtons_left_buttonText"
                                     onClick={() => setPageChange(true)}><img src={icon1}/>{t('Orqaga')}</div>
                            </button>
                            <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `} type="button"
                                    onClick={showModal}>
                                <div className="parking_database_body_topButtons_left_buttonText"><img
                                    src={icon2}/>{t('Qo‘shish')}</div>
                            </button>

                            <button type="button" className={checkedList.length > 0 ?
                                `deleteButton ${isDarkMode && 'darkModeBackground darkModeBorder'}`
                                : `${isDarkMode && 'darkModeBackground darkModeBorder'}`}
                                    onClick={deleteDataList}>
                                <div className="parking_database_body_topButtons_left_buttonText"><img
                                    src={icon5}/>{t('O‘chirish')}</div>
                            </button>
                            <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `} type="button"
                                    onClick={upDate}>
                                <div className="parking_database_body_topButtons_left_buttonText"><img
                                    src={icon6}/>{t('Yangilash')}</div>
                            </button>
                            <div
                                className={`parking_database_body_topButtons_left_search ${isDarkMode && 'darkModeInputBackgraund'}`}>
                                <div
                                    className={`parking_database_body_topButtons_left_search_text  ${isDarkMode && 'darkModeInputBackgraund'}`}>
                                    <input className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                           placeholder={t("Izlash")} onChange={searchList}/>
                                    <img src={icon7} style={{margin: "0"}}/>
                                </div>
                            </div>
                        </div>

                        <div className="parking_database_body_topButtons_right">

                            {/*<div className="excel">*/}
                            {/*    <label htmlFor='add_staff_img'*/}
                            {/*           className={`parking_database_body_topButtons_excel ${isDarkMode && 'darkModeBorder'}`}>*/}
                            {/*         <div className="parking_database_body_topButtons_excel_inner">*/}
                            {/*             <img src={exel}/>*/}
                            {/*             <div*/}
                            {/*                className={`${isDarkMode && 'darkModeColor'}`}>{fileState.uploaded ? t("Yuborish") : t("Import")}</div>*/}
                            {/*        </div>*/}
                            {/*        {*/}
                            {/*            fileState.uploaded ?*/}
                            {/*                <input onClick={sendExcel} id="add_staff_img" style={{display: 'none'}}/>*/}
                            {/*                :*/}
                            {/*                <input onChange={upload} type="file" id="add_staff_img"*/}
                            {/*                       style={{display: 'none'}}/>*/}
                            {/*        }*/}
                            {/*    </label>*/}
                            {/*    {fileState.uploaded ? <div className="excel_exit" onClick={cencelExcel}*/}
                            {/*    ><MdOutlineCancel style={{fontSize: "20px"}}/>{t("Bekor qilish")}</div> : ""}*/}
                            {/*</div>*/}

                            <div className="parking_database_body_topButtons_right1">
                                <MdOutlinePersonOutline className={`${isDarkMode && 'darkModeColor'}`}
                                                        style={{marginRight: 2}} size={20}/>
                                <span className={`${isDarkMode && 'darkModeColor'}`}>{categoryId[`name_${lang}`]}</span>
                            </div>

                            <div
                                className={`parking_database_body_topButtons_right_line ${isDarkMode && 'darkModeLineBackground'}`}></div>
                            <div className="parking_database_body_topButtons_right2">
                                <span
                                    className={`${isDarkMode && 'darkModeColor'}`}>{t('Ma’lumotlar soni:') + " " + listTotal}</span>
                            </div>
                            {/*<div className="parking_database_body_topButtons_right3">*/}
                            {/*    <span>{t('Faol')}</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>

                    <div className="parking_database_body_cards">
                        <div className="parking_database_body_cards_head">
                            <Checkbox
                                indeterminate={dataList.length === checkedList.length ? false : checkedList.length > 0}
                                onChange={onCheckAllChange}
                                checked={dataList.length === checkedList.length && dataList.length !== 0}
                            >
                                {t("Barchasini belgilash")}
                            </Checkbox>
                        </div>

                        <div className="face_database_body_cards_body">
                            {
                                dataList?.map((item, index) => {

                                    const isChecked = checkedList?.some(check => check === item.id)

                                    return (
                                        <div
                                            className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}
                                            key={index}>
                                            {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                            <div className="face_database_body_cards_body_card_inner1_top">
                                                {/*<Checkbox*/}
                                                {/*    indeterminate={dataList.length === checkedList.length ? false : checkedList.length > 0}*/}
                                                {/*    onChange={onCheckAllChange}*/}
                                                {/*    checked={dataList.length === checkedList.length && dataList.length !== 0}*/}
                                                {/*></Checkbox>*/}
                                                <Checkbox
                                                    checked={isChecked}
                                                    onChange={() => onChange(item)}
                                                    type="checkbox"
                                                />

                                                <img src={`${ip}/face-recognation-service/human_list/${item.image}`}/>
                                                {/*</div>*/}
                                            </div>
                                            <div className="face_database_body_cards_body_card_inner2">
                                                <div className="face_database_body_cards_body_card_inner2_left">
                                                    <div
                                                        className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: {item.fullname}</div>
                                                    <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Jinsi: {item.gender === 0 ? "Nonbinary" : item.gender === 1 ? "Male" : item.gender === 2 ? "Famele" : ""}</div>
                                                    <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan
                                                        kun: {moment(item.date_of_birth).format("DD-MM-YYYY")}</div>
                                                    <div
                                                        className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: {item.address}</div>
                                                    <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Hujjat: {item.document_type === 0 ? "Ultimated" : item.document_type === 1 ? "IdCard" : item.document_type === 2 ? "Passport" : ""}</div>
                                                    <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Seriya va
                                                        raqami: {item.seria}</div>
                                                </div>

                                                <div className="face_database_body_cards_body_card_inner2_right">
                                                    <Dropdown overlay={<WidgetMenu value={item}/>}
                                                              placement="bottomRight">
                                                        <div className="burgerImg">
                                                            <img src={burger} className="burgerImg"/>
                                                        </div>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>

            </div>

            <FaceAddModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                getListGroup={getListGroup}
                categoryId={categoryId}
                listInitialValues={listInitialValues}
                setListInitialValues={setListInitialValues}
            />
            <FaceAddDeleteModal
                getListGroup={getListGroup}
                setDeleteModal={setDeleteModal}
                checkedList={checkedList}
                setCheckedList={setCheckedList}
                deleteModal={deleteModal}
                setFileState={setFileState}
            />
        </div>
    );
};

export default FaceDatabaseAdd;