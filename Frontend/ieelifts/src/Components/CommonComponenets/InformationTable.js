import React, { useCallback, useEffect, useRef, useState } from 'react';
import data from '../../Components/AdminPannel/Component/ClientsSubComponent/DatasClientServiceHis.json';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import UpArrow from "../../../../../Frontend/ieelifts/src/Assets/Images/94.png"
import DownArrow from "../../../../../Frontend/ieelifts/src/Assets/Images/95.png"

const getStatusColor = (status) => {
    switch (status) {
        case 'New':
            return '#7290F5';
        case 'In Progress':
            return '#FFA753';
        case 'Waiting':
            return '#03BBF7';
        case 'Finished':
            return '#52B8B8';
        case 'Cancelled':
            return '#FF7171';
        default:
            return 'transparent';
    }
};

const InformationTable = ({ fieldsToShow }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const recordsPerPage = 10;
    const observer = useRef();

    useEffect(() => {
        loadMoreData();
    }, [currentPage]);

    const loadMoreData = useCallback(() => {
        setLoading(true);
        const startIndex = (currentPage - 1) * recordsPerPage;
        const endIndex = startIndex + recordsPerPage;
        const newRecords = data.slice(startIndex, endIndex);
        setRecords(prevRecords => [...prevRecords, ...newRecords]);
        setLoading(false);
    }, [currentPage]);

    useEffect(() => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setCurrentPage(prevPage => prevPage + 1);
            }
        });
        if (observer.current) observer.current.observe(document.querySelector(".end-of-table"));
    }, [loading]);




    return (
        <div className="spare-part-table_view">
            <div className="spare-part-sub-table-view">
                <div className="spare-part-table-container" style={{ maxHeight: '60vh', overflowY: 'auto' }} onScroll={(e) => {
                    if (e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
                        setCurrentPage(prevPage => prevPage + 1);
                    }
                }}>
                    <div className="eng-table-shadow"></div>
                    <table>
                        <thead>
                            <tr>
                                {fieldsToShow.map((field, index) => (
                                    <th key={index}>
                                        {field === 'Address' ? (
                                            <div className='dell-table-spare'>
                                                {field} <div className='dell-icon-table'>
                                                    <img src={UpArrow} />
                                                    <img src={DownArrow} />
                                                </div>
                                            </div>
                                        ) : field === 'MEMBERSHIP' ? (
                                            <div className='dell-table-spare'>
                                                {field} <div className='dell-icon-table'>
                                                    <img src={UpArrow} />
                                                    <img src={DownArrow} />
                                                </div>
                                            </div>
                                        ) : (
                                            field
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((row, index) => (
                                <tr key={index}>
                                    {fieldsToShow.map((field, index) => (
                                        <td key={index} style={{ textAlign: 'center' }}>
                                            {field === 'Status' ? (
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: getStatusColor(row[field]), marginRight: '5px' }}></div>
                                                    <div style={{ lineHeight: '1', whiteSpace: 'nowrap' }}>{row[field]}</div>
                                                </div>
                                            ) : (
                                                row[field]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            {loading && <tr><td colSpan={fieldsToShow.length} style={{ textAlign: 'center' }}>Loading...</td></tr>}
                            {!loading && records.length === 0 && <tr><td colSpan={fieldsToShow.length} style={{ textAlign: 'center' }}>No data available</td></tr>}

                        </tbody>
                    </table>
                    <div className="end-of-table" style={{ float: "left", clear: "both" }}></div>

                </div>
            </div>
        </div>
    );
};

export default InformationTable;
