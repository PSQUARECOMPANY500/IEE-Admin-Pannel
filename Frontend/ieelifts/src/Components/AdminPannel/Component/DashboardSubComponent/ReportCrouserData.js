
import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CabinFloors from "./CabinFloors";
import CartopShift from "./CartopShift";
import Invoice from "./Invoice";
import MCRoom from "./MCRoom";
import PitArea from "./PitArea";
import Rating from "./Rating";



const ReportCrouserData = ({ serviceId, ticket }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [routes, setRoutes] = useState([]);




    useEffect(() => {
        if (ticket) {
            setRoutes([
                { name: "Cabin and Landing", co: <CabinFloors /> },
                { name: "Invoice", co: <Invoice serviceId={serviceId} /> },
                { name: "Rating", co: <Rating /> },
            ])
        } else {
            setRoutes([
                { name: "M/C ROOM", co: <MCRoom /> },
                { name: "Cabin and Landing", co: <CabinFloors /> },
                { name: "Cartop and Shaft", co: <CartopShift /> },
                { name: "PIT Area", co: <PitArea /> },
                { name: "Invoice", co: <Invoice serviceId={serviceId} /> },
                { name: "Rating", co: <Rating /> },
            ])
        }
    }, [ticket])

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === routes?.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? routes?.length - 1 : prevIndex - 1
        );
    };
    const goToIndex = (index) => {
        setCurrentIndex(index);
    };
    const CurrentComponent = routes[currentIndex]?.co;

    const truncateText = (text, wordLimit) => {
        const words = text
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit) + "...";
        }
        return words;
    };

    return (
        <div className="ReportNavigation">
            <div className="CarouselButtons">
                <div className="CarouselButtonsL">
                    {currentIndex !== 0 ? (
                        <FaChevronLeft onClick={goToPrev} className="cursor iconSize" />
                    ) : (
                        ""
                    )}
                </div>
                <div className="ComponentNames">
                    {console.log("currentIndex == 0 && !ticket", currentIndex == 0 && ticket)}
                    <div className="PreviousComponentName" style={{ minWidth: currentIndex == 0 ? (ticket ? "60px" : "75px") : "" }}>
                        {currentIndex > 0 && (<p>{truncateText(routes[currentIndex - 1]?.name, 8)}</p>
                        )}
                    </div>
                    <div className="CurrentComponentName">
                        <p>
                            {routes[currentIndex]?.name}
                        </p>
                    </div>

                    <div className="NextComponentName">
                        {currentIndex < routes?.length - 1 && (<p>{truncateText(routes[currentIndex
                            + 1]?.name, 8)}</p>
                        )}
                    </div>

                </div>

                <div className="CarouselButtonsR">
                    {currentIndex !== routes?.length - 1 && (
                        <FaChevronRight onClick={goToNext} className="cursor  iconSize" />
                    )}
                </div>
            </div>

            <div className="CarouselScrollDots">
                {routes.map((_, index) => (
                    <span
                        key={index}
                        className={`Reportdot ${index === currentIndex ? "active" : ""}`}
                        onClick={() => goToIndex(index)}
                    ></span>
                ))}
            </div>

            {CurrentComponent}
        </div >
    )
}

export default ReportCrouserData