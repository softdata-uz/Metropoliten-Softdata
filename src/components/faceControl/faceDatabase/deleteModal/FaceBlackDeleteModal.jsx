import React from 'react';
import Modal from "react-modal";
import {useTranslation} from "react-i18next";
import axios from "axios";
import {ip} from "../../../../ip";
import '../database.css';

const FaceBlackDeleteModal = (props) => {

    const {t} = useTranslation();

    const {
        deleteBlackModal,
        setDeleteBlackModal,
        checkedList,
        setCheckedList,
        getTestGroup
    } = props;

    const deleteBlack = () =>{
        axios.delete(`${ip}/face-recognation-service/api/delete/category`,
            {
                data: checkedList,
                headers: {'x-access-token': localStorage.getItem('soft-ais-token')}
            }
        )
            .then((res) => {
                setCheckedList([]);
                getTestGroup();
                setDeleteBlackModal(false);
            })
    }
    const cencel = () => {
        setDeleteBlackModal(false);
        setCheckedList([]);
    }

    return (
        <div>
            <Modal
                isOpen={deleteBlackModal}
                onRequestClose={cencel}
                contentLabel="My dialog"
                className="mymodal"
                overlayClassName="myoverlay"
                closeTimeoutMS={0}
            >
                <div className="delete_modal">
                    <h3>{t("Haqiqatdan ham o'chirasizmi ?")}</h3>
                    <div className="delete_modal_button">
                        <div className="">
                            <button type="button" className="delete_modal_button_left"
                                    onClick={cencel}>{t("Yo'q")}
                            </button>
                        </div>
                        <div>
                            <button type="button" className="delete_modal_button_right"
                                    onClick={() => deleteBlack()}>{t("Ha")}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default FaceBlackDeleteModal;