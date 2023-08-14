import React from 'react';
import Modal from "react-modal";
import {Form, Input, message, Select} from "antd";
import {useTranslation} from "react-i18next";

import './addModalBlack.css';
import uzbek from "../../../../images/uzbek.svg";
import russia from "../../../../images/russia.svg";
import engliz from "../../../../images/engliz.svg";
import axios from "axios";
import {ip} from "../../../../ip";

import styled from "styled-components";
import {useSelector} from "react-redux";

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

export const InputStyles = styled(Input)`
  .ant-input {
    background: ${({theme}) => theme.body} !important;
    color: ${({theme}) => theme.text} !important;
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;

const FaceAddModalBlack = (props) => {
    const {
        modalOpenBlack, setModalOpenBlack, testInitialValues, setTestInitialValues, getTestGroup
    } = props;


    const {t} = useTranslation();
    const isDarkMode = useSelector(state => state.theme.theme_data);

    const onFinish = (values) => {
        if (testInitialValues?.edit) {
            axios.put(`${ip}/face-recognation-service/api/category/${testInitialValues?.id}`, {
                ...values,
            }, {
                headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
            })
                .then(response => {
                    setTestInitialValues({
                        name_uz: '', name_ru: '', name_en: '', type: '',
                    })
                    getTestGroup();
                    setModalOpenBlack(false);
                })
                .catch(err => {
                    message.error(err?.response?.data?.msg);
                    console.log(err?.response?.data)
                })
        } else {
            axios.post(`${ip}/face-recognation-service/api/category`, {
                ...values,
            }, {
                headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
            })
                .then(response => {
                    getTestGroup();
                    setModalOpenBlack(false);
                })
                .catch(err => {
                    message.error(err?.response?.data?.msg);
                    console.log(err?.response?.data)
                })
        }
    }

    const onFinishFailed = (e) => {
        // console.log(e)
    }

    return (<>
        <Modal
            isOpen={modalOpenBlack}
            onRequestClose={() => setModalOpenBlack(!modalOpenBlack)}
            contentLabel="My dialog"
            className="mymodal"
            overlayClassName="myoverlay"
            closeTimeoutMS={0}
        >
            <div className={`database_modalBlack ${isDarkMode && 'darkModeCard'}`}>
                <div className="database_modalBlack_top">
                    <h2 className={` ${isDarkMode && 'darkModeColor'}`}>{testInitialValues.edit ? t("Tahrirlash") : t("Yangi qo'shish")}</h2>
                </div>
                <Form
                    name="basic"
                    layout="vertical"
                    initialValues={testInitialValues}
                    requiredMark='optional'
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <div className="database_modalBlack_form">
                        <div className="database_modalBlack_form_inner1">
                            <div className="database_modalBlack_form_inner1_input">
                                <span
                                    className={` ${isDarkMode && 'darkModeColor'}`}>{t("Ma’lumotlar bazasi nomi")}</span>
                                <Form.Item
                                    label={false}
                                    name="name_uz"
                                    rules={[{
                                        required: true, message: t("Ma’lumotlar bazasi nomini kiriting"),
                                    },]}
                                >
                                    <InputStyles
                                        className={`settings_modal_select ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                        placeholder={t('Kiriting')}
                                        prefix={<img src={uzbek} alt="uz"/>}

                                    />
                                </Form.Item>

                                <Form.Item
                                    label={false}
                                    name="name_ru"
                                    rules={[{
                                        required: true, message: t("Ma’lumotlar bazasi nomini kiriting"),
                                    },]}
                                >
                                    <InputStyles
                                        className={`settings_modal_select ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                        placeholder={t('Kiriting')}
                                        prefix={<img src={russia} alt="uz"/>}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label={false}
                                    name="name_en"
                                    rules={[{
                                        required: true, message: t("Ma’lumotlar bazasi nomini kiriting"),
                                    },]}
                                >
                                    <InputStyles
                                        className={`settings_modal_select ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                        placeholder={t('Kiriting')}
                                        prefix={<img src={engliz} alt="uz"/>}
                                    />
                                </Form.Item>
                            </div>
                            <div className="database_modalBlack_form_inner1_input">
                                <span className={`${isDarkMode && 'darkModeColor'}`}>{t("Turi")}</span>
                                <Form.Item
                                    className="settings_modal_input_label"
                                    label={false}
                                    name="type"
                                    rules={[{
                                        required: true, message: t("Turini tanlang"),
                                    },]}
                                >
                                    <SelectStyles
                                        className="settings_modal_select"
                                        placeholder={t("Tanlash")}
                                        // size="large"
                                    >
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            disabled value="">
                                            <span style={{color: "#bfbfbf"}}>{t("Tanlash")}</span>
                                        </Select.Option>
                                        <Select.Option className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`} value={0}>{t("Unknown")}</Select.Option>
                                        <Select.Option className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`} value={1}>{t("History")}</Select.Option>
                                        <Select.Option className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`} value={2}>{t("Blacklist")}</Select.Option>
                                        <Select.Option className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`} value={3}>{t("Whitelist")}</Select.Option>
                                        <Select.Option className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`} value={4}>{t("Alarm")}</Select.Option>
                                        <Select.Option className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`} value={5}>{t("Passerby")}</Select.Option>

                                    </SelectStyles>
                                </Form.Item>
                            </div>
                        </div>
                    </div>
                    <div className="database_modalBlack_line"></div>
                    <div className="database_modal_buttons">
                        <div className="database_buttons">
                            <button className="addStaff_cancel_button" type="button"
                                    onClick={() => setModalOpenBlack(false)}>
                                {t("Bekor qilish")}
                            </button>
                            <button className="access_control_add_staff_modal_body_item_3_submit_button"
                                    type="submit">
                                {t("Saqlash")}
                            </button>

                        </div>
                    </div>
                </Form>
            </div>
        </Modal>
    </>);
};

export default FaceAddModalBlack;