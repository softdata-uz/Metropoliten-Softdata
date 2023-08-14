import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import Modal from "react-modal";
import {DatePicker, Form, Input, Select} from "antd";

import './addModal.css';
import uploadIcon from '../../../../images/parkingModul/database/Vector (29).png';


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

// export const DatePickerStyles = styled(DatePicker)`
//   .ant-picker{
//     background: ${({theme}) => theme.body} !important;
//     color: ${({theme}) => theme.text} !important;
//     transition: background 0.2s ease-in, color 0.2s ease-in;
//   }
//   input{
//     color: ${({theme}) => theme.text} !important;
//   }
// `;

const AddModalFace = (props) => {

    const isDarkMode = useSelector(state => state.theme.theme_data);

    const {t} = useTranslation();
    const {
        isModalOpen, setIsModalOpen
    } = props;

    // img
    const [view, setView] = useState(null);
    const [imageState, setImageState] = useState({
        initial: true, uploaded: false, requested: false, check: false
    });
    const [img, setImg] = useState({})
    const upload = (e) => {
        if (e.target.files && e.target.files[0]) {
            console.log('uploaded')
            setView(URL.createObjectURL(e.target.files[0]))
            setImg({...img, image: e.target.files[0]})
            setImageState({
                initial: false, uploaded: true, requested: false, check: false
            })
        } else {
            setView(null)
            setImageState({
                initial: true, uploaded: false, requested: false, check: false
            })
        }
    }
    // img

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
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(!isModalOpen)}
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
                    initialValues={""}
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

                                        {imageState.uploaded ? <img src={view} className="upload_button_img"/> :
                                            <img src={uploadIcon}/>}

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
                                <Form.Item name="name" rules={[{
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
                                <Form.Item name="date" rules={[{
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
                                    name="direction"
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
                                            disabled value="">
                                            <span style={{color: "#bfbfbf"}}>{t("Tanlash")}</span>
                                        </Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value="enter">{t("Kirish")}
                                        </Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value="exit">{t("Chiqish")}
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
                                    name="direction"
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
                                            disabled value="">
                                            <span style={{color: "#bfbfbf"}}>{t("Tanlash")}</span>
                                        </Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value="enter">{t("Kirish")}</Select.Option>
                                        <Select.Option
                                            className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                            value="exit">{t("Chiqish")}</Select.Option>
                                    </SelectStyles>
                                </Form.Item>
                            </div>
                            <div className="face_modal_form_inner1_input">
                                <span className={`${isDarkMode && 'darkModeColor '}`}>Manzil</span>
                                <Form.Item name="adress" rules={[{
                                    required: true, message: "Manzilni kiriting"
                                }]}>
                                    <Input
                                        className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                        placeholder="Kiriting"/>
                                </Form.Item>
                            </div>
                            <div className="face_modal_form_inner1_input">
                                <span className={`${isDarkMode && 'darkModeColor '}`}>Seriya va raqami</span>
                                <Form.Item name="serya" rules={[{
                                    required: true, message: "Seriya va raqamini kiriting"
                                }]}>
                                    <Input
                                        className={` ${isDarkMode && 'darkModeInputBackgraund darkModeColor'}`}
                                        placeholder="Kiriting"/>
                                </Form.Item>
                            </div>
                        </div>

                    </div>

                    <div className="face_modal_buttons">
                        <button type="submit">Saqlash</button>
                        <button type="button" onClick={() => setIsModalOpen(false)}>Bekor qilish</button>
                    </div>

                </Form>
            </div>
        </Modal>

    </>);
};

export default AddModalFace;