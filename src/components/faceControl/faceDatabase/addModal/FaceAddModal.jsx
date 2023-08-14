import React, {useEffect, useState} from 'react';
import Modal from "react-modal";


import './addModal.css';
import '../../database/addModal/addModal.css';
import {DatePicker, Form, Input, message, Select} from "antd";
import axios from "axios";
import {ip} from "../../../../ip";

import car1 from '../../../../images/parkingModul/database/cars/CoveredCar_v1b 1.png';
import car2 from '../../../../images/parkingModul/database/cars/Group (2).png';
import car3 from '../../../../images/parkingModul/database/cars/Group (3).png';
import car4 from '../../../../images/parkingModul/database/cars/Group (4).png';
import car5 from '../../../../images/parkingModul/database/cars/Group (5).png';
import car6 from '../../../../images/parkingModul/database/cars/Group (6).png';
import car7 from '../../../../images/parkingModul/database/cars/Group (7).png';
import car8 from '../../../../images/parkingModul/database/cars/Group 55889.png';
import car9 from '../../../../images/parkingModul/database/cars/Group 55890.png';
import car10 from '../../../../images/parkingModul/database/cars/Group (8).png';
import car11 from '../../../../images/parkingModul/database/cars/Group (9).png';
import car12 from '../../../../images/parkingModul/database/cars/Group 55888 (3).png';

import {useTranslation} from "react-i18next";
import moment from "moment";


import styled from "styled-components";
import {useSelector} from "react-redux";
import uploadIcon from "../../../../images/parkingModul/database/Vector (29).png";

export const SelectStyles = styled(Select)`
  .ant-select-selector {
    background: ${({theme}) => theme.body} !important;
    color: ${({theme}) => theme.text} !important;
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }

  .ant-select-selection-item {
    color: ${({theme}) => theme.text} !important;
  }
`;

const FaceAddModal = (props) => {
    const {t} = useTranslation();
    const isDarkMode = useSelector(state => state.theme.theme_data);

    const {
        isModalOpen,
        setIsModalOpen,
        getListGroup,
        categoryId,
        listInitialValues,
        setListInitialValues
    } = props;

    // img
    const [view, setView] = useState(null);
    const [imageState, setImageState] = useState({
        initial: true,
        uploaded: false,
        requested: false,
        check: false
    });
    const [img, setImg] = useState({})
    const upload = (e) => {
        if (e.target.files && e.target.files[0]) {
            console.log('uploaded')
            setView(URL.createObjectURL(e.target.files[0]))
            setImg({...img, image: e.target.files[0]})
            setImageState({
                initial: false,
                uploaded: true,
                requested: false,
                check: true
            })
        } else {
            setView(null)
            setImageState({
                initial: true,
                uploaded: false,
                requested: false,
                check: false
            })
        }
    }
    // img

    const onFinish = (values) => {
        const formData = {
            ...values,
            date_of_birth: moment(values?.date_of_birth).format("YYYY-MM-DD"),
            category_id: categoryId.id,
            image : img.image
        }
        const fd = new FormData();
        Object.keys(formData).forEach(i => fd.append(i, formData[i]));

        if (listInitialValues.edit) {
            axios.put(`${ip}/face-recognation-service/api/human_list/${listInitialValues.id}`,
                fd,
                {headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
            })
                .then(res => {
                    console.log(res)
                    addOpenModal();
                    getListGroup();
                })
                .catch(err => {
                    message.error(err.response.data.msg);
                })
        } else {
            axios.post(`${ip}/face-recognation-service/api/human_list`,
                fd,
                {headers: {'x-access-token': localStorage.getItem('soft-ais-token')}})
                .then(res => {
                    console.log(res)
                    getListGroup();
                    addOpenModal();
                })
                .catch(err => {
                    message.error(err.response.data.msg);
                })
        }
    }

    const onFinishFailed = (e) => {
        // console.log(e)
    }



    const addOpenModal = () => {
        setIsModalOpen(!isModalOpen);
        setListInitialValues({
            image : "",
            fullname: "",
            gender: "",
            date_of_birth: "",
            address: "",
            document_type: "",
            seria: "",
            category_id: "",
        })
        setImageState({
            initial: true,
            uploaded: false,
            requested: false,
            check: false
        })
    }


    return (<>
        <Modal
            isOpen={isModalOpen}
            onRequestClose={addOpenModal}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={0}
        >
            <div className={`face_modal ${isDarkMode && 'darkModeCard '}`}>
                <div className="face_modal_top">
                    <h2 className={`${isDarkMode && 'darkModeColor'}`}>Yangi qo'shish</h2>
                </div>
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={listInitialValues}
                    requiredMark='optional'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="face_modal_form">
                        <div className="face_modal_form_input">
                            <div className="face_modal_form_input1">
                                <div className="face_modal_form_input1_top">
                                    <label htmlFor='add_staff_img'
                                           className={`upload_button ${isDarkMode && 'darkModeBackground'}`}>

                                        {
                                            listInitialValues.edit && !imageState.check ?
                                                <img src={`${ip}/face-recognation-service/human_list/${listInitialValues.image}`} className="upload_button_img"/> :
                                            imageState.uploaded ?
                                                <img src={view} className="upload_button_img"/> : <img src={uploadIcon}/>
                                        }

                                        <input onChange={upload} name='image' type="file"
                                               id="add_staff_img"
                                               style={{display: 'none'}}
                                               className=""
                                        />
                                    </label>
                                </div>
                                <div className="face_modal_form_input1_button">
                                    <p>Rasm o‘lchami:</p>
                                    <p>100*100 ~</p>
                                    <p>3840x2160</p>
                                </div>
                            </div>
                        </div>
                        <div className="face_modal_form_input">
                            <div className="face_modal_form_inner1_input">
                                <span className={`${isDarkMode && 'darkModeColor '}`}>F.I.Sh</span>
                                <Form.Item name="fullname" rules={[{
                                    required: true, message: "F.I.Sh ni kiriting"
                                }]}>
                                    <Input
                                        className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                        placeholder="Kiriting"
                                    />
                                </Form.Item>
                            </div>
                            <div className="face_modal_form_inner1_input">
                                <span className={`${isDarkMode && 'darkModeColor '}`}>Tug‘ilgan sana</span>
                                <Form.Item name="date_of_birth" rules={[{
                                    required: true, message: "Tug‘ilgan sanasini kiriting"
                                }]}>
                                    <DatePicker
                                        className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                        placeholder="01.01.2023"/>
                                </Form.Item>

                                {/*<Form.Item name="name" rules={*/}
                                {/*    [{*/}
                                {/*        required: true,*/}
                                {/*        message: "Tug‘ilgan sanasini kiriting"*/}
                                {/*    }]*/}
                                {/*}>*/}
                                {/*    <Input placeholder="Kiriting"/>*/}
                                {/*</Form.Item>*/}
                            </div>
                            <div className="face_modal_form_inner1_input">
                                <span className={`${isDarkMode && 'darkModeColor '}`}>Hujjat</span>
                                <Form.Item
                                    className="settings_modal_input_label"
                                    label={false}
                                    name="document_type"
                                    rules={[{
                                        required: true, message: t("Hujjatni tanlang!"),
                                    },]}
                                >
                                    <SelectStyles
                                        // className="settings_modal_select"
                                        placeholder={t("Tanlash")}
                                    >
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            disabled value=''>
                                            <span style={{color: "#bfbfbf"}}>{t("Tanlash")}</span>
                                        </Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value={0}>{t("Ultimated")}
                                        </Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value={1}>{t("IDCard")}
                                        </Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value={2}>{t("Passport")}
                                        </Select.Option>
                                    </SelectStyles>
                                </Form.Item>
                            </div>
                        </div>
                        <div className="face_modal_form_input">
                            <div className="face_modal_form_inner1_input">
                                <span className={`${isDarkMode && 'darkModeColor '}`}>Jinsi</span>
                                <Form.Item
                                    className="settings_modal_input_label"
                                    label={false}
                                    name="gender"
                                    rules={[{
                                        required: true, message: t("Jinsini tanlang!"),
                                    },]}
                                >
                                    <SelectStyles
                                        className="settings_modal_select"
                                        placeholder={t("Tanlash")}
                                        // size="large"
                                    >
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            disabled value=''>
                                            <span style={{color: "#bfbfbf"}}>{t("Tanlash")}</span>
                                        </Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value={0}>{t("Nonbinary")}</Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value={1}>{t("Male")}</Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value={1}>{t("Female")}</Select.Option>
                                    </SelectStyles>
                                </Form.Item>
                            </div>
                            <div className="face_modal_form_inner1_input">
                                <span className={`${isDarkMode && 'darkModeColor '}`}>Manzil</span>
                                <Form.Item name="address" rules={[{
                                    required: true, message: "Manzilni kiriting"
                                }]}>
                                    <Input
                                        className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                        placeholder="Kiriting"/>
                                </Form.Item>
                            </div>
                            <div className="face_modal_form_inner1_input">
                                <span className={`${isDarkMode && 'darkModeColor '}`}>Seriya va raqami</span>
                                <Form.Item name="seria" rules={[{
                                    required: true, message: "Seriya va raqamini kiriting"
                                }]}>
                                    <Input
                                        className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                        placeholder="Kiriting"/>
                                </Form.Item>
                            </div>
                        </div>

                    </div>

                    <div className="face_buttons">
                        <div className="face_buttons_inner">
                            <button type="button" onClick={addOpenModal} className="face_cancel_button">Bekor qilish</button>
                            <button type="submit" className="face_add_staff_modal_body_item_3_submit_button">Saqlash</button>

                        </div>
                    </div>

                </Form>
            </div>
        </Modal>
    </>);
};

export default FaceAddModal;