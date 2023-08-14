import React from 'react';
import {useSelector} from "react-redux";
import Modal from "react-modal";
import {Form, Input, Select} from "antd";
import {useTranslation} from "react-i18next";

import uzbek from "../../../../images/uzbek.svg";
import russia from "../../../../images/russia.svg";
import engliz from "../../../../images/engliz.svg";
import './addModalBlack.css';


import styled from "styled-components";

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


// .ant-input-affix-wrapper > input.ant-input

const AddModalBlack = (props) => {

    const {
        modalOpenBlack, setModalOpenBlack
    } = props;

    const isDarkMode = useSelector(state => state.theme.theme_data);
    const {t} = useTranslation();

    const onFinish = (values) => {
        // if (cameraIntialValues.edit) {
        //     axios.put(`${ip}/parking-service/api/cameras/${cameraIntialValues.id}`, {
        //         ...values,
        //     })
        //         .then(response => {
        //             cancel()
        //             getCameraData(cameraPaginationCurrent)
        //         })
        //         .catch(err => {
        //             alert.error('Ip manzil xato kiritildi !')
        //             console.log(err?.response?.data)
        //         })
        // } else {
        //     axios.post(`${ip}/parking-service/api/cameras`, values)
        //         .then(response => {
        //             cancel()
        //             getCameraData(cameraPaginationCurrent)
        //         })
        //         .catch(err => {
        //             alert.error('Ip manzil xato kiritildi !')
        //             console.log(err?.response?.data)
        //             // console.log(err?.response?.data?.msg.includes("ip_address"))
        //         })
        // }
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
                <div className={`database_modalBlackFaceBlack ${isDarkMode && 'darkModeCard '}`}>
                    <div className="database_modalBlackFaceBlack_top">
                        <h2 className={`${isDarkMode && 'darkModeColor'}`}>Yangi qo'shish</h2>
                    </div>
                    <Form
                        name="basic"
                        layout="vertical"
                        initialValues={""}
                        requiredMark='optional'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <div className="database_modalBlackFaceBlack_form">
                            <div className="database_modalBlackFaceBlack_form_inner1">
                                <div className="database_modalBlack_form_inner1_input">
                                        <span className={`${isDarkMode && 'darkModeColor'}`}>
                                            Ma’lumotlar bazasi nomi
                                        </span>
                                    <Form.Item
                                        label={false}
                                        name="name_uz"
                                        rules={[{
                                            required: true, message: t("Ma’lumotlar bazasi nomini!"),
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
                                            required: true, message: t("Ma’lumotlar bazasi nomini!"),
                                        },]}
                                    >
                                        <InputStyles
                                            className={`settings_modal_select ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            placeholder={t('Kiriting')}
                                            prefix={<img src={russia} alt="ru"/>}
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        label={false}
                                        name="name_en"
                                        rules={[{
                                            required: true, message: t("Ma’lumotlar bazasi nomini!"),
                                        },]}
                                    >
                                        <InputStyles
                                            className={`settings_modal_select ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            placeholder={t('Kiriting')}
                                            prefix={<img src={engliz} alt="eng"/>}
                                        />
                                    </Form.Item>
                                </div>
                                <div className="database_modalBlackFaceBlack_form_inner1_input">
                                    <span className={`${isDarkMode && 'darkModeColor'}`} >Turi</span>
                                    <Form.Item
                                        className="settings_modal_input_label"
                                        label={false}
                                        name="direction"
                                        rules={[{
                                            required: true, message: t("Turini tanlang!"),
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
                                            <Select.Option
                                                className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                                value="enter">{t("Qora ro'yxat")}</Select.Option>
                                            <Select.Option
                                                className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                                value="exit">{t("Oq ro'yxat")}</Select.Option>

                                            {/*{*/}
                                            {/*    cameraSetting && cameraSetting.map((item, index) => (*/}
                                            {/*        <Select.Option key={index} value={item.id}>{item[`name_${lang}`]}</Select.Option>*/}
                                            {/*    ))*/}
                                            {/*}*/}
                                        </SelectStyles>
                                    </Form.Item>
                                </div>
                            </div>
                        </div>
                        <div className="database_modalBlackFaceBlack_line"></div>
                        <div className="database_modalBlackFaceBlack_buttons">
                            <button type="submit">Saqlash</button>
                            <button type="button" onClick={() => setModalOpenBlack(false)}>Bekor qilish</button>
                        </div>
                    </Form>
                </div>
            </Modal>
        </>);
};

export default AddModalBlack;