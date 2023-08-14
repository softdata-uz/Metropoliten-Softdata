import React from 'react';
import {Pagination} from "antd";
import {useTranslation} from "react-i18next";

const FaceDatabaseAddPagination = (props) => {

    const {
        listTotal,
        listPaginationCurrent,
        listPaginationLimit,
        listPaginationOnchange
    } = props

    const {t} = useTranslation();

    return <Pagination
        dropdownRender={false}
        defaultPageSize={listPaginationLimit}
        current={listPaginationCurrent}
        onChange={listPaginationOnchange}
        showSizeChanger={true}
        total={listTotal}
        pageSize={listPaginationLimit}
        pageSizeOptions={[12, 24, 36, 48]}
        locale={{items_per_page: t('sahifa')}}
    />;
};

export default FaceDatabaseAddPagination;