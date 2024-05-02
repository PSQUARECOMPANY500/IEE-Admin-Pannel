// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
const ClientFormDimentions = ({ }) => {
      const stops =5;
      const elementsArray = Array.from({ length: stops }, (_, index) => index);
    return (
        <div className='client-form-dimensions'>
            <h5 className='client-form-details-heading'>Dimensions</h5>
            <hr className='client-form-hr' />
            <div className='dimenstions-container'>
                  <div className='basement-section'>
                <div className='floor-header'>
                    <div className='floor-heading'>Basement 1</div>
                    <div className='mmBtn'>mm</div>
                </div>
                {/* basement wrapper */}
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
                        <span>Bottom to Top <img src='./uploadIcon.png ' className='upload-icon' /></span>
                    </div>
                    <div className='dimension-upload-btn'>
                        <span> Basement Front <img src='./uploadIcon.png' className='upload-icon' /></span>
                    </div>
                </div>
            </div>
            {/* floor start */}
            {elementsArray.map((index) => (
        <div className='floor-section'>
        <div className='floor'>
            <div className='floor-heading floor-margin'>Floor 1</div>
            <div>
                <div className='floor-input-wrapper'>
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
                    <div className='floor-fl-fr-container'>
                        <AnimatedInput
                            label={"FL"}
                            name={"FL"}
                        />
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
                    Floor Front
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
      ))}
            
            {/* floor top */}

            <div className='floor-section'>
                <div className='floor'>
                    <div className='floor-heading floor-margin'>Floor Front</div>
                    <div>
                        <div className='floor-input-wrapper'>
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
                        </div>
                        <div className='overhead-input'>
                                <AnimatedInput
                                    label={"Overhead (opt)"}
                                    name={"Overhead"}
                                />
                            </div>
                        <div className='site-photos'>
                            Site Photos
                        </div>
                        <div className='dimension-btn-wrapper'>
                            <div className='dimension-btn'>
                            Floor Front
                            </div>
                            <div className='dimension-upload-btn'>
                                <span>Top to Bottom <img src='./uploadIcon.png ' className='upload-icon' /></span>
                            </div>
                            <div className='dimension-upload-btn'>
                                <span> Overhead <img src='./uploadIcon.png' className='upload-icon' /></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default ClientFormDimentions;