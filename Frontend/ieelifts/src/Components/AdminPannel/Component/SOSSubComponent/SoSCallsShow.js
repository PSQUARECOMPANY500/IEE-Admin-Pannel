import React, {
    useLayoutEffect,
    useEffect,
    useRef,
    useState,
} from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import CheckBox from "../DashboardSubComponent/CheckBox";
import { useSelector, useDispatch } from "react-redux";
import { clearSoS, getSoS } from "../../../../ReduxSetup/Actions/AdminActions";
import SkeltonLoader from "../../../CommonComponenets/SkeltonLoader";

const SoSCallsShow = ({ handleDropDownClick, SOSStatusUpdate }) => {
    const ref = useRef();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(false);
    const [loader1, setLoader1] = useState(false);
    const [checkboxStates, setCheckboxStates] = useState([]);

    const totalPage = useSelector(
        (state) => state?.AdminRootReducer?.getSoSReducer?.totalPage
    );

    const SoSDetails = useSelector((state) =>
        state.AdminRootReducer?.getSoSReducer?.
            SoSCalls
    );


    function handleClick(jon, _id) {
        handleDropDownClick({
            jon, _id
        })
    }
    useEffect(() => {
        // if (SOSStatusUpdate?.status) {
        //     setLoader1(true);
        //     setTimeout(() => {
        //         setLoader1(false)
        //     }, 1000)
        // }
        setLoader(true);
        setLoader(false)
    }, [SOSStatusUpdate?.status])


    useEffect(() => {
        if (totalPage >= page || page === 1) {
            setLoader(true);
            dispatch(getSoS(page, 10))
                .then(() => setLoader(false))
                .catch((error) => {
                    setLoader(false);
                    console.error("Error fetching SOS requests:", error);
                });
        }

        return () => {
            dispatch(clearSoS());
        };
    }, [page, dispatch]);

    const handleInfiniteScroll = () => {
        const { scrollTop, scrollHeight, clientHeight } = ref.current;
        if (SoSDetails && page < totalPage) {
            if (scrollTop + clientHeight >= scrollHeight - 10) {
                setPage((prevPage) => prevPage + 1);
            }
        }
    };

    useEffect(() => {
        const currentRef = ref.current;
        if (currentRef) {
            currentRef.addEventListener("scroll", handleInfiniteScroll);
            return () => {
                currentRef.removeEventListener("scroll", handleInfiniteScroll);
            };
        }
    });

    const formatTime = (timestamp) => {
        const [hours, minutes] = timestamp.split(':').map(unit => unit.padStart(2, '0'));
        return `${hours}:${minutes}`;
    };

    const formatDateWithLeadingZero = (dateStr) => {
        const [day, month, year] = dateStr.split('/').map(num => num.padStart(2, '0'));
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="table_view client_table_view" ref={ref}>
            <div className="sub_table_view client_sub_table_view">
                <div className="client_table-container" onScroll={(e) => handleInfiniteScroll(e, true)}>
                    <div
                        className="table-shadow table-header"
                        style={{ height: '4rem', width: '96.4%', marginLeft: '-0.3rem' }}
                    ></div>
                    <table>
                        <thead style={{ zIndex: '1' }}>
                            <tr>
                                <th className="checkbox">
                                    <CheckBox
                                        id="checkbox1"
                                        checked={
                                            SoSDetails &&
                                            SoSDetails?.length > 0 &&
                                            checkboxStates.every((isChecked) => isChecked)
                                        }
                                    />
                                </th>
                                <th>JON</th>
                                <th>NAME</th>
                                <th>Address</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Membership</th>
                                <th>SOS Call</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody req={ref}>
                            {!loader1 && SoSDetails && SoSDetails?.length > 0 &&
                                SoSDetails?.map((data, index) => (
                                    <tr className="selected single" key={index}>
                                        <td className="checkbox">
                                            <CheckBox
                                                id={`checkbox-${index}`}
                                                checked={checkboxStates[index] || false}
                                            />
                                        </td>
                                        <td className="JON">{data.jon}</td>
                                        <td className="client-table-number">{data?.name}</td>
                                        <td className="address">
                                            <div className="dropdown-address">
                                                <span>
                                                    {data?.address.length > 20 ? `${data?.address.slice(0, 20)}...` : data?.address}
                                                </span>
                                                <div className="dropdown-address-menu">
                                                    <p>{data?.address}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="membership">
                                            {formatDateWithLeadingZero(data?.date)}
                                        </td>
                                        <td className="membership">
                                            {formatTime(data?.time)}
                                        </td>
                                        <td className="membership">
                                            {data?.membership ? data?.membership : "NONE"}
                                        </td>
                                        <td className="address">{data.SoSCallCount}</td>
                                        <td className="address">{data.desc}</td>
                                        <td
                                            className="dots3"
                                            onClick={() => {
                                                if (!((SOSStatusUpdate?.id === data._id) || data.isDead)) {
                                                    handleClick(data.jon, data._id)
                                                }
                                            }}
                                        >
                                           {((SOSStatusUpdate?.id === data._id) || data.isDead) ? <>{data.status || SOSStatusUpdate?.status}</> : < HiOutlineDotsVertical />}
                                        </td>
                                    </tr>
                                ))}
                            {(loader || loader1) && page <= totalPage ? (
                                <>
                                    <tr style={{ overflowX: "hidden" }}>
                                        <td colSpan="10">
                                            <SkeltonLoader
                                                height={"38px"}
                                                marginTop={"8px"}
                                                marginBottom={"0px"}
                                                className='table-skeleton'
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="10">
                                            <SkeltonLoader
                                                height={"38px"}
                                                marginTop={"8px"}
                                                marginBottom={"0px"}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="10">
                                            <SkeltonLoader
                                                height={"38px"}
                                                marginTop={"8px"}
                                                marginBottom={"0px"}
                                            />
                                        </td>
                                    </tr>
                                </>
                            ) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default SoSCallsShow;
