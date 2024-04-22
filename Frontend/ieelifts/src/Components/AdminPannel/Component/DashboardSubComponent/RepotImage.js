import React, { useEffect, useState } from 'react'

const RepotImage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);


    const images = [
        'https://ieelifts.com/wp-content/uploads/2023/09/1O3A3827-1-1024x683.jpg',
        'https://images.jdmagicbox.com/comp/ludhiana/j8/0161px161.x161.180525115525.a9j8/catalogue/iee-lifts-model-town-ludhiana-elevator-dealers-johnson-xi70pmynmt.jpg',
        'https://ieelifts.com/wp-content/uploads/2023/09/1O3A3827-1-1024x683.jpg'
    ];

    const goToPrevious = () => {
        setCurrentIndex(prev => (prev === 0 ? 0 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex(prev => (prev === images.length - 1 ? images.length - 1 : prev + 1));
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "scroll";
        };
    }, []);
    return (

        <>
            <div className='report-image' >
                <div className='report-image-container'>
                    <div className='report-image-prev'>
                        <button class="learn-previous"  onClick={goToPrevious} style={{ opacity: currentIndex === 0 && '0' }}>
                            <span class="circleprev" aria-hidden="true">
                                <span class="iconprev arrowprev"></span>
                                <span class="button-text-prev">PREV</span>
                            </span>
                        </button>
                    </div>


                </div>

                <div className='image-container'>
                    <img src={images[currentIndex]} />
                    <div className='image-container-bottom'>
                        <p>hello </p>
                    </div>
                </div>

                <div className='report-image-next' onClick={goToNext} style={{ opacity: currentIndex === images.length - 1 && '0' }}>
                    <button class="learn-more">
                        <span class="circlenext" aria-hidden="true">
                            <span class="button-text">NEXT</span>
                            <span class="icon arrow"></span>
                        </span>
                    </button>
                </div>

            </div>

        </>

    )
}

export default RepotImage