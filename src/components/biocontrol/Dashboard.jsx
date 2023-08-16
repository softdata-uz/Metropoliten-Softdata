import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import allWorkers from '../../images/metroBiocontrol/allWorkers.svg';
import mans from '../../images/metroBiocontrol/mans.svg';
import woman from '../../images/metroBiocontrol/woman.svg';
import airplain from '../../images/metroBiocontrol/airplain.svg';
import xizmatdagi from '../../images/metroBiocontrol/xizmatsafar.svg';
import man from '../../images/metroBiocontrol/man.svg';

import './dashboard.css';


const Dashboard = () => {
    return (
        <div>
            <div className="info_content">
                <div className="info_content_title">
                    Dashboard
                </div>
                <div className="dashboard_top_items">
                    <div className="dashboard_top_items_inner">
                        <div className="dashboard_top_inner_img">
                            <img src={allWorkers} alt=""/>
                        </div>
                        <div className="dashboard_top_inner_info">
                            <p>Jami xodimlar soni</p>
                            <h4>280</h4>
                        </div>
                    </div>
                    <div className="dashboard_top_items_inner">
                        <div className="dashboard_top_inner_img">
                            <img src={mans} alt=""/>
                        </div>
                        <div className="dashboard_top_inner_info">
                            <p>Erkak xodimlar</p>
                            <h4>70</h4>
                        </div>
                    </div>
                    <div className="dashboard_top_items_inner">
                        <div className="dashboard_top_inner_img">
                            <img src={woman} alt=""/>
                        </div>
                        <div className="dashboard_top_inner_info">
                            <p>Ayol xodimlar</p>
                            <h4>210</h4>
                        </div>
                    </div>
                    <div className="dashboard_top_items_inner">
                        <div className="dashboard_top_inner_img">
                            <img src={airplain} alt=""/>
                        </div>
                        <div className="dashboard_top_inner_info">
                            <p>Mehnat tatilidagi xodimlar</p>
                            <h4>15</h4>
                        </div>
                    </div>
                    <div className="dashboard_top_items_inner">
                        <div className="dashboard_top_inner_img">
                            <img src={xizmatdagi} alt=""/>
                        </div>
                        <div className="dashboard_top_inner_info">
                            <p>Xizmat safaridagi xodimlar</p>
                            <h4>5</h4>
                        </div>
                    </div>

                </div>

                <div className="dashboard_info_content">
                    <div className="dashboard_info_content_right"></div>
                    <div className="dashboard_info_content_left">
                        <div className="dashboard_left">
                            <div className="dashboard_left_items">
                                <div className="dashboard_left_top_title">
                                    <div className="title_vertcal_line"></div>
                                    <div className="dashboard_left_title">
                                        Tibbiy ko‘rik muddati yaqin
                                    </div>
                                </div>

                                <div className="dashboard_left_cards">
                                    <div className="dashboard_card_left">
                                        <div className="dashboard_card_left_inner">
                                            <img src={man} alt=""/>
                                            <div className="card_left_inner_user_info">
                                                <h4>Istamov Xurshid Hazratqul o‘g‘li</h4>
                                                <div className="card_left_inner_user_position">
                                                    <span>Lavozim:</span>
                                                    Yetakchi mutaxassis
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dashboard_card_right">
                                        <CircularProgressbar
                                            value={80} text={`${8}`}
                                            styles={buildStyles({
                                                textSize: '16px',
                                                textColor: '#000',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#EB4143',
                                            })}
                                        />
                                    </div>
                                </div>
                                <div className="dashboard_left_cards">
                                    <div className="dashboard_card_left">
                                        <div className="dashboard_card_left_inner">
                                            <img src={man} alt=""/>
                                            <div className="card_left_inner_user_info">
                                                <h4>Istamov Xurshid Hazratqul o‘g‘li</h4>
                                                <div className="card_left_inner_user_position">
                                                    <span>Lavozim:</span>
                                                    Yetakchi mutaxassis
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dashboard_card_right">
                                        <CircularProgressbar
                                            value={80} text={`${8}`}
                                            styles={buildStyles({
                                                textSize: '16px',
                                                textColor: '#000',
                                                trailColor: '#d6d6d6',
                                                backgroundColor: '#EB4143',
                                            })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="more_wiev_button">
                                <button>Ko‘proq ko‘rish</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;