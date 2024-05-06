// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState } from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
import ClientDropdown from './ClientsReusableComponent/ClientDropdown';

const ClientFormElevatorDetails = ({ }) => {
    const numberOfOpenings = [1, 2, 3];
    //States
    const [capacity, setCapacity] = useState('kg');
    const [b1, setB1] = useState('');
    const [b2, setB2] = useState('');
    const [nintyDegreeLeft, SetNintyDegreeLeft] = useState('');
    const [nintyDegreeRight, SetNintyDegreeRight] = useState('');
    const [oneEightyDegree, SetOneEightyDegree] = useState('');
    const [noOfOpenings, setNoOfOpenings] = useState(0);
    const [stops, setStops] = useState(0);
    const [data, setData] = useState('G')
    const [level,setLevel] = useState({
        "b1":b1,
        "b2":b2,
        "G/S":data
    })

    const elementsArray = Array.from({ length: stops }, (_, index) => index);//converting the stop value to array so that we can use map function
    const noOfOpeningsArray = Array.from({length:noOfOpenings-1},(_, index)=>index);
   
    //handler
    const handleCapacityUnitChange = (unit) => {
        setCapacity(unit);
    };
    
    const handleChange = (value) => {
        setData(value);
    }
    const handleChangeInB1 = () => {
        setB1(b1 ? "" : "B1")
    }
    const handleChangeInB2 = () => {
        setB2(b2 ? "" : "B2")
        setB1("B1")
    }

    const handleInputValueChange = (newValue) => {
        setStops(newValue);
    };
    
     const [isActive, setIsActive] = useState(false);
    
        const handleClick = () => {
            setIsActive(!isActive); 
        };

    
    const handleNumberOfOpenings = (openings) => {
        setNoOfOpenings(openings);
    }
    const isDivDisabled = () => {
        if (noOfOpenings === 0 || noOfOpenings === 1) {
            return true;
        } else {
            return false;
        }
    };

    const handleDegreeSelection = (degree) => {
        if (noOfOpenings === 2 && (nintyDegreeLeft || nintyDegreeRight || oneEightyDegree) ||
            noOfOpenings === 3 && ((nintyDegreeLeft && nintyDegreeRight) || (nintyDegreeLeft && oneEightyDegree) || (nintyDegreeRight && oneEightyDegree))) {
            SetNintyDegreeLeft('');
            SetNintyDegreeRight('');
            SetOneEightyDegree('');
        }

        switch (degree) {
            case '90dL':
                SetNintyDegreeLeft(nintyDegreeLeft ? '' : '90dL');
                break;
            case '90dR':
                SetNintyDegreeRight(nintyDegreeRight ? '' : '90dR');
                break;
            case '180d':
                SetOneEightyDegree(oneEightyDegree ? '' : '180d');
                break;
            default:
                break;
        }
    };


    return (
        <div className='client-form-elevator-details'>
            <h5 className='client-form-details-heading'>Elevator Details</h5>
            <hr className='client-form-hr' />

           <div className='dimenstions-container'>
           <div className='client-elevator-input-wrapper'>
                <div className='mmbtn-parent'>

                    <ClientDropdown label={"Pit depth"} />
                    <span className='mmBtn mm-btn-possition'>mm</span>
                </div>
                <div>
                    <ClientDropdown label={"Type"} />
                </div>
                <div>
                    <ClientDropdown label={"Purpose"} />
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
                            <span className={`selector-child ${capacity === 'kg' ? 'selector-child-active' : ''}`}
                                onClick={() => handleCapacityUnitChange('kg')}>Kg</span>
                            <span className={`selector-child ${capacity === 'Pr' ? 'selector-child-active' : ''}`}
                                onClick={() => handleCapacityUnitChange('Pr')}>Pr</span>
                        </div>
                    </div>

                </div>
                <div>
                    <AnimatedInput
                        label={"Stops"}
                        name={"courseName"}
                        onValueChange={handleInputValueChange}
                    />
                </div>
                <div className='b2b1-container'>
                    <div >
                        <div className='btn-container'>
                            <span className={`b2-btn ${b2 === 'B2' ? 'btn-active' : ''}`} onClick={() => handleChangeInB2('')}>
                                B2
                            </span>
                            <span className={`b1-btn ${b1 === 'B1' ? 'btn-active' : ''}`} onClick={() => handleChangeInB1('')}>
                                B1
                            </span>
                        </div>
                    </div>
                    <div className='selector-container'>
                        <span className={`selector-child ${data === 'G' ? 'selector-child-active' : ''}`}
                            onClick={() => handleChange('G')}>G</span>
                        <span className={`selector-child ${data === 'S' ? 'selector-child-active' : ''}`}
                            onClick={() => handleChange('S')}>S</span>
                    </div>
                    <div>

                    </div>
                </div>
                <div>

                    <ClientDropdown label={"Door Type"} />
                </div>
                <div>

                    <ClientDropdown label={"Construction Material"} />
                </div>
                <div>

                    <ClientDropdown label={"Number of opening"} options={numberOfOpenings} onValueChange={handleNumberOfOpenings} />
                </div>
                <div>
                    <div className={isDivDisabled() ? 'degree-container disabled' : 'degree-container'}>

                        <>
                            <span
                                className={`degree-container-children ${nintyDegreeLeft === '90dL' ? 'degree-selector' : ''}`}
                                onClick={() => handleDegreeSelection('90dL')}
                            >
                                90°left
                            </span>
                            <span
                                className={`degree-container-children ${nintyDegreeRight === '90dR' ? 'degree-selector' : ''}`}
                                onClick={() => handleDegreeSelection('90dR')}
                            >
                                90°right
                            </span>
                            <span
                                className={`degree-container-children ${oneEightyDegree === '180d' ? 'degree-selector' : ''}`}
                                onClick={() => handleDegreeSelection('180d')}
                            >
                                180°degree
                            </span>
                        </>

                    </div>
                </div>

            </div>
            <div className='level-main-container'>
                <div className='level-heading'>
                    <span>Level</span>
                    <span className='heading-badge'>Original opening</span>
                    {noOfOpeningsArray.map((index)=>(
                        <span className='heading-badge' key={index}>180°</span>
                    ))}
                </div>

                {
                    elementsArray.map((index) => (
                        <div className='level-heading' key={index}>
                            <span className='level-title'>{b2?b2:b1}:</span>
                            <span className={`level-selector ${isActive ? 'level-selector-active' : ''}`} onClick={handleClick}></span>
                            {noOfOpeningsArray.map((index)=>(
                        <span className={`level-selector ${isActive ? 'level-selector-active' : ''}`} onClick={handleClick}></span>
                    ))}
                        </div>
                    ))
                }



                {/* <div className='level-heading'>
                    <span className='level-title'>Level 1:</span>

                    <span className='level-selector'></span>

                    <span className='level-selector'></span>

                </div>
                <div className='level-heading'>
                    <span className='level-title'>Level 2:</span>

                    <span className='level-selector'></span>

                    <span className='level-selector'></span>

                </div> */}

            </div>
            <div className='text-area-container'>
                <textarea placeholder='Add Remarks'>

                </textarea>
            </div>
           </div>
        </div>
    );
};

export default ClientFormElevatorDetails;