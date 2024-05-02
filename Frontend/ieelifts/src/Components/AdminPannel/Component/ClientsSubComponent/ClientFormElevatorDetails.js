// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState,useEffect } from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
import ClientDropdown from './ClientsReusableComponent/ClientDropdown';

const ClientFormElevatorDetails = ({ }) => {
    //States
    const [capacity,setCapacity] = useState('kg')
    const [b1, setB1]= useState('');
    const [b2,setB2]=useState('')
    const [nintyDegreeLeft,SetNintyDegreeLeft] = useState('')
    const [nintyDegreeRight,SetNintyDegreeRight] = useState('')
    const [oneEightyDegree,SetOneEightyDegree] = useState('')
    //handler
    const handleCapacityUnitChange = (unit) => {
        setCapacity(unit);
    };
    const [data,setData]=useState('G')
    const handleChange =(value)=>{
        setData(value);
    }
    const handleChangeInB1 =(b1)=>{
        setB1(b1?"":"B1")
        // if(b1==="B1"){
        //     setB1('')
        // }else{
        //     setB1("B1")
        // }

    }
    const handleChangeInB2 =(b2)=>{
        setB2(b2)
        setB1("B1")
        // if(b2==="B2"){
        //     setB2('');
        // }else{
        //     setB2('B2')
        //     setB1('B1')
        // }
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
                   
                    <ClientDropdown label={"Pit depth"} />
                     <span className='mmBtn mm-btn-possition'>mm</span>
                </div>
                <div>
                     <ClientDropdown label={"Type"}/>
                </div>
                <div>
                     <ClientDropdown label={"Purpose"}/>
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
                        <span className={`b2-btn ${b2==='B2'?'btn-active':''}`} onClick={()=> handleChangeInB2('')}>
                            B2
                        </span>
                        <span className={`b1-btn ${b1==='B1'?'btn-active':''}`} onClick={()=> handleChangeInB1('')}>
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
                   
                     <ClientDropdown label={"Door Type"}/>
                </div>
                <div>
                    
                     <ClientDropdown label={"Construction Material"}/>
                </div>
                <div>
                    
                     <ClientDropdown label={"Number of opening"}/>
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