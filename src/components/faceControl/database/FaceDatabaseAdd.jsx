import React, {useState} from 'react';

import {Checkbox, Dropdown, Menu, Pagination} from 'antd';
import {useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import icon1 from '../../../images/parkingModul/database/Vector (3).svg';
import icon2 from '../../../images/parkingModul/database/Vector (4).svg';
import icon3 from '../../../images/parkingModul/database/Vector (5).svg';
import icon4 from '../../../images/parkingModul/database/Vector (6).svg';
import icon5 from '../../../images/parkingModul/database/Vector (7).svg';
import icon6 from '../../../images/parkingModul/database/Vector (8).svg';
import burger from '../../../images/parkingModul/database/Vector (23).png';
import editIcon from '../../../images/parkingModul/database/Vector (25).png';
import deleteIcon from '../../../images/parkingModul/database/Vector (26).png';
import userimg from '../../../images/parkingModul/database/Rectangle 617.png'

import AddModalFace from "./addModal/AddModalFace";
import './faceDatabase.css';

import styled from "styled-components";
import {BsFillPersonFill} from "react-icons/all";

export const PaginationStyles = styled(Pagination)`
  .ant-pagination-item, .ant-pagination-item-link, .ant-select-single:not(.ant-select-customize-input) .ant-select-selector {
    background: ${({theme}) => theme.body};
    color: ${({theme}) => theme.text};
    transition: background 0.2s ease-in, color 0.2s ease-in;
  }
`;

const CheckboxGroup = Checkbox.Group;
const plainOptions = [1, 2];
const defaultCheckedList = [];


const FaceDatabaseAdd = (props) => {

    const {
        pageChange,
        setPageChange
    } = props;

    const isDarkMode = useSelector(state => state.theme.theme_data);
    const {t} = useTranslation();


    // chek group
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    const onChange = (list) => {
        console.log(list)
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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    }

    function WidgetMenu(props) {
        return (
            <Menu {...props} >
                <Menu.Item>
                    <div className="face_database_dropEdit">
                        <div className="icon"><img src={editIcon}/></div>
                        <span>Tahrirlash</span>
                    </div>
                </Menu.Item>
                <Menu.Item>
                    <div className="face_database_dropDelete">
                        <div className="icon"><img src={deleteIcon}/></div>
                        <span>O'chirish</span>
                    </div>
                </Menu.Item>
            </Menu>
        );
    }

    return (
        <div>
            <div className="face_database">
                <div className="face_database_top">
                    <p className={`Content_title ${isDarkMode && 'darkModeColor'}`}>
                        {t('Ma’lumotlar bazasi')}
                    </p>
                    <div className="face_database_top_pagination">
                        <PaginationStyles defaultCurrent={1} total={40}/>
                    </div>
                </div>

                <div className={`face_database_body ${isDarkMode && 'darkModeBackground darkModeBorder '}`}>
                    <div className="face_database_body_topButtons">
                        <div className="face_database_body_topButtons_left">
                            <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `} type="button">
                                <div className="face_database_body_topButtons_left_buttonText"
                                     onClick={() => setPageChange(true)}><img src={icon1}/>{t('Orqaga')}</div>
                            </button>
                            <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `} type="button"
                                    onClick={showModal}>
                                <div className="face_database_body_topButtons_left_buttonText"><img
                                    src={icon2}/>{t('Qo‘shish')}</div>
                            </button>
                            <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `} type="button">
                                <div className="face_database_body_topButtons_left_buttonText"><img
                                    src={icon3}/>{t('Qo‘shish')}</div>
                            </button>
                            <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `} type="button">
                                <div className="face_database_body_topButtons_left_buttonText"><img
                                    src={icon4}/>{t('Nusxalash')}</div>
                            </button>
                            <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `} type="button">
                                <div className="face_database_body_topButtons_left_buttonText"><img
                                    src={icon5}/>{t('O‘chirish')}</div>
                            </button>
                            <button className={`${isDarkMode && 'darkModeBackground darkModeBorder'} `} type="button">
                                <div className="face_database_body_topButtons_left_buttonText"><img
                                    src={icon6}/>{t('Yangilash')}</div>
                            </button>
                            {/*<button type="button">*/}
                            {/*    <div className="face_database_body_topButtons_left_buttonText"><img src={icon7} style={{margin:"0"}}/></div>*/}
                            {/*</button>*/}
                        </div>
                        <div className="face_database_body_topButtons_right">
                            <div className="face_database_body_topButtons_right1">
                                <BsFillPersonFill/>
                                <span className={` ${isDarkMode && 'darkModeColor'}`}>{t('Test baza')}</span>
                            </div>
                            <div className="face_database_body_topButtons_right_line"></div>
                            <div className="face_database_body_topButtons_right2">
                                <span className={` ${isDarkMode && 'darkModeColor'}`}>{t('Ma’lumotlar soni: 1')}</span>
                            </div>
                            <div className="face_database_body_topButtons_right3">
                                <span className={` ${isDarkMode && 'darkModeColor'}`}>{t('Faol')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="face_database_body_cards">
                        <div className="face_database_body_cards_head">
                            <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                                Barchasini belgilash
                            </Checkbox>
                            {/*<CheckboxGroup options={plainOptions} value={checkedList} onChange={onChange} />*/}
                            {/*<Checkbox onChange={onChange}>Barchasini belgilash</Checkbox>*/}
                        </div>
                        <CheckboxGroup onChange={onChange}>
                            <div className="face_database_body_cards_body">
                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>

                                <div className={`face_database_body_cards_body_card ${isDarkMode && 'darkModeCard darkModeBorder'}`}>
                                    {/*<div className="face_database_body_cards_body_card_inner1">*/}
                                    <div className="face_database_body_cards_body_card_inner1_top">
                                        <Checkbox value={1}></Checkbox>
                                        <img src={userimg}/>
                                        {/*</div>*/}
                                    </div>
                                    <div className="face_database_body_cards_body_card_inner2">
                                        <div className="face_database_body_cards_body_card_inner2_left">
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Ism: Ravshan</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Tug‘ilgan kun:
                                                1997.04.09
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>ID: 0000001</div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Telefon: +99891
                                                791 11 22
                                            </div>
                                            <div className={`textt ${isDarkMode && 'darkModeColor'}`}>Manzil: -</div>
                                        </div>
                                        <div className="face_database_body_cards_body_card_inner2_right">
                                            <Dropdown overlay={<WidgetMenu/>} placement="bottomRight">
                                                <img src={burger}/>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </CheckboxGroup>
                    </div>
                </div>

            </div>

            <AddModalFace
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
};

export default FaceDatabaseAdd;