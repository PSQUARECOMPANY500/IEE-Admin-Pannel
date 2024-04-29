// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState } from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
const ClientFormElevatorDetails = ({ }) => {
    const [capacity,setCapacity] = useState('kg')
    const handleCapacityUnitChange = (unit) => {
        setCapacity(unit);
    };
    const [data,setData]=useState('G')
    const handleChange =(value)=>{
        setData(value);
    }
    const [value, setValue]= useState('B1');
    const handleChangeInValue =(value)=>{
        setValue(value);
    }
    const [degree, setDegree] = useState('90 degree left')
    const handleDegreeChange=(degree)=>{
        setDegree(degree);
    }
    return (
        <div className='client-form-elevator-details'>
            <h5 className='client-form-details-heading'>Elevator Details</h5>
            <hr className='client-form-hr' />
            <div className='client-elevator-input-wrapper'>
                <div className='mmbtn-parent'>
                    <AnimatedInput
                        label={"Pit depth"}
                        name={"courseName"}
                    /> <span className='mmBtn mm-btn-possition'>mm</span>
                </div>
                <div>
                    <AnimatedInput
                        label={"Type"}
                        name={"courseName"}
                    />
                </div>
                <div>
                    <AnimatedInput
                        label={"Purpose"}
                        name={"courseName"}
                    />
                </div>
                <div className='capacity-container'>
                    <div>
                    <AnimatedInput
                        label={"Capacity"}
                        name={"courseName"}
                    />
                    </div>
                    <div>
                        <div className='selector-container'>
                            <span  className={`selector-child ${capacity === 'kg' ? 'selector-child-active' : ''}`}
                                onClick={() => handleCapacityUnitChange('kg')}>Kg</span>
                            <span  className={`selector-child ${capacity === 'Pr' ? 'selector-child-active' : ''}`}
                                onClick={() => handleCapacityUnitChange('Pr')}>Pr</span>
                        </div>
                    </div>
                    
                </div>
                <div>
                    <AnimatedInput
                        label={"Stops"}
                        name={"courseName"}
                    />
                </div>
                <div className='b2b1-container'>
                    <div >
                        <div className='btn-container'>
                        <span className={`b2-btn ${value==='B2'?'btn-active':''}`} onClick={()=> handleChangeInValue('B2')}>
                            B2
                        </span>
                        <span className={`b1-btn ${value==='B1'?'btn-active':''}`} onClick={()=> handleChangeInValue('B1')}>
                            B1
                        </span>
                        </div>
                    </div>
                   <div className='selector-container'>
                            <span  className={`selector-child ${data === 'G' ? 'selector-child-active' : ''}`}
                                onClick={() => handleChange('G')}>G</span>
                            <span  className={`selector-child ${data === 'S' ? 'selector-child-active' : ''}`}
                                onClick={() => handleChange('S')}>S</span>
                        </div>
                  <div>

                  </div>
                </div>
                <div>
                    <AnimatedInput
                        label={"Door Type"}
                        name={"courseName"}
                    />
                </div>
                <div>
                    <AnimatedInput
                        label={"Contstruction Material"}
                        name={"courseName"}
                    />
                </div>
                <div>
                    <AnimatedInput
                        label={"Number of opening"}
                        name={"courseName"}
                    />
                </div>
                <div>
                    <div className='degree-container'>
                        <span className={`degree-container-children ${degree==='90 degree left'?'degree-selector':''} `} onClick={()=>handleDegreeChange('90 degree left')}>90°left</span>
                        <span className={`degree-container-children ${degree==='90 degree right'?'degree-selector':''}`} onClick={()=>handleDegreeChange('90 degree right')}>90°right</span>
                        <span className={`degree-container-children ${degree==='180 degree'?'degree-selector':''}`} onClick={()=>handleDegreeChange('180 degree')}>180°degree</span>
                    </div>
                </div>
               
            </div>
            <div className='level-main-container'>
                <div className='level-heading'>
                  <span>Level</span>
                  <span className='heading-badge'>Original opening</span>
                  <span className='heading-badge'>180°</span>
                </div>
                <div className='level-heading'>
                    <span className='level-title'>B/G:</span>
            
                    <span className='level-selector'></span>
    
                    <span className='level-selector'></span>
                
                </div>
                <div className='level-heading'>
                    <span className='level-title'>Level 1:</span>
            
                    <span className='level-selector'></span>
    
                    <span className='level-selector'></span>
                
                </div>
                <div className='level-heading'>
                    <span className='level-title'>Level 2:</span>
            
                    <span className='level-selector'></span>
    
                    <span className='level-selector'></span>
                
                </div>
              
            </div>
            <div className='text-area-container'>
                <textarea placeholder='Add Remarks'>

                </textarea>
            </div>
        </div>
    );
};

export default ClientFormElevatorDetails;