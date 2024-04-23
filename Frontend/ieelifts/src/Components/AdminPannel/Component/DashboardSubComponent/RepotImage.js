import React, { useEffect, useState } from 'react'

const RepotImage = ({images}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

console.log(images.length)
   

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev === 0 ? 0 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prev => (prev === images.length - 1 ? images.length - 1 : prev + 1));
    };

    useEffect(() => {
        console.log("useEffect executed");
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll";
        };
    }, []);
    
    return (

      
            <div className='images'>
                <div className='report-image-container'>
                    <div className='report-image-prev'>
                        <button className="learn-previous"  onClick={goToPrevious} style={{ opacity: currentIndex === 0 && '0' }}>
                            <span className="circleprev" aria-hidden="true">
                                <span className="iconprev arrowprev"></span>
                                <span className="button-text-prev">PREV</span>
                            </span>
                        </button>
                    </div>


                </div>

                <div className='image-container'>
                    <img src={'https://ieelifts.com/wp-content/uploads/2023/09/1O3A3827-1-1024x683.jpg'} />
                    <div className='image-container-bottom'>
                        <p>hello </p>
                    </div>
                </div>

                <div className='report-image-next' onClick={goToNext} style={{ opacity: currentIndex === images.length - 1 && '0' }}>
                    <button className="learn-next">
                        <span className="circlenext" aria-hidden="true">
                            <span className="button-text-next">NEXT</span>
                            <span className="icon arrow"></span>
                        </span>
                    </button>
                </div>

            </div>



    )
}

export default RepotImage