import React from 'react'
import data from '../../Components/AdminPannel/Component/ClientsSubComponent/DatasClientServiceHis.json'

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

    return (
        <div className="spare-part-table_view">
            <div className="spare-part-sub-table-view">
                <div className="spare-part-table-container" style={{ maxHeight: '60vh' }}>
                    <div className="eng-table-shadow"></div>
                    <table>
                        <thead>
                            <tr>

                                {fieldsToShow.map((field, index) => (
                                    <th key={index}>{field}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>

                            {data.map((row, index) => (
                                <tr key={index}>
                                    {fieldsToShow.map((field, index) => (
                                        <td key={index} style={{ textAlign: 'center' }}>
                                            {field === 'Status' ? (
                                                <div style={{ display: 'flex',alignItems: 'center', justifyContent: 'center'  }}>
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



                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default InformationTable
