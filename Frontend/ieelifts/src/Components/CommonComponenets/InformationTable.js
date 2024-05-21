import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import data from '../../Components/AdminPannel/Component/ClientsSubComponent/DatasClientServiceHis.json';
import Loader from "../CommonComponenets/Loader";
import CheckBox from "../../Components/AdminPannel/Component/DashboardSubComponent/CheckBox";

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

const InformationTable = ({ fieldsToShow, maxHeight, selectedRecords, onCheckboxChange, showCheckboxes, selectAll,setSelectAll , handleSelectAllChange }) => {
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

    const handleCheckboxChange = (index) => {
        const newSelectedRecords = { ...selectedRecords };
        newSelectedRecords[index] = !selectedRecords[index];
        onCheckboxChange(index, newSelectedRecords[index]);

        if (!newSelectedRecords[index]) {
            setSelectAll(false);
        } else if (Object.values(newSelectedRecords).every(isChecked => isChecked)) {
            setSelectAll(true);
        }
    };

    return (
        <div className="spare-part-table_view">
            <div className="spare-part-sub-table-view">
                <div className="spare-part-table-container" style={{ maxHeight: maxHeight, overflowY: 'auto' }} onScroll={(e) => {
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
                                        {field === "Checkbox" ? (
                                            <CheckBox
                                                id="select-all-checkbox"
                                                checked={selectAll}
                                                handleCheckboxChange={handleSelectAllChange}
                                            />
                                        ) : field}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {fieldsToShow.map((field, index) => (
                                        <td key={index} style={{ textAlign: field === "Description" ? "start" : "center" }}>
                                            {field === 'Checkbox' ? (
                                                <CheckBox
                                                    id={rowIndex}
                                                    checked={!!selectedRecords[rowIndex]}
                                                    handleCheckboxChange={() => handleCheckboxChange(rowIndex)}
                                                />
                                            ) : field === 'Status' ? (
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
                            {loading && <tr><td colSpan={fieldsToShow.length} style={{ textAlign: 'center' }}>
                                <Loader /> </td></tr>}
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
