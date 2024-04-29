// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
const ClientFormDimentions = ({ }) => {
    return (
        <div className='client-form-dimensions'>
            <h5 className='client-form-details-heading'>Dimensions</h5>
            <hr className='client-form-hr' />
            <div className='basement-section'>
                <div className='floor-header'>
                <div className='floor-heading'>Basement 1</div>
                <div className='mmBtn'>mm</div>
                </div>
                <div className='basement-input-wrapper'>
                
                    <div>
                        <AnimatedInput
                            label={"Shaft Width"}
                            name={"Shaft Width"}
                        />
                    </div>
                    <div>
                        <AnimatedInput
                            label={"Shaft Depth"}
                            name={"Shaft Depth"}
                        />
                    </div>
                    <div>
                        <AnimatedInput
                            label={"Door Width"}
                            name={"Door Width"}
                        />
                    </div>
                    <div>
                        <AnimatedInput
                            label={"Door Height"}
                            name={"Door Height"}
                        />
                    </div>
                    <div>
                        <AnimatedInput
                            label={"Floor to Floor Height"}
                            name={"Floor to Floor Height"}
                        />
                    </div>
                    <div>
                        <AnimatedInput
                            label={"Pit Depth"}
                            name={"Pit Depth"}
                        />
                    </div>
                    <div>
                        <AnimatedInput
                            label={"FL"}
                            name={"FL"}
                        />
                    </div>
                    <div>
                        <AnimatedInput
                            label={"FR"}
                            name={"FR"}
                        />
                    </div>
                </div>
                <div className='site-photos'>
                    Site Photos
                </div>
                <div className='dimension-btn-wrapper'>
                    <div className='dimension-btn'>
                      Pit
                    </div>
                    <div className='dimension-upload-btn'>
                        <span>Bottom to Top <img src='./uploadIcon.png ' className='upload-icon'/></span>
                    </div>
                    <div className='dimension-upload-btn'>
                       <span> Basement Front <img src='./uploadIcon.png' className='upload-icon'/></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientFormDimentions;