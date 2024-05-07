// <-----------------------------  Author:- Rahul Kumar ----------------------------------->
import React, { useState, useEffect } from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
import ClientDropdown from './ClientsReusableComponent/ClientDropdown';

const ClientFormElevatorDetails = () => {
    const numberOfOpenings = [1, 2, 3];
    const pitDepth = [100, 200];
    const purpose = ["Hospital", "Mall"];
    const typeOptions = ["gearless", "geared"];
    const doorType = ["option1", "option2"];
    const constructionMaterial = ["option1", "option2"];

    const [dropdown, setDropdown] = useState({
        purpose: '',
        doorType: '',
        constructionMaterial: ""
    })


    //States
    const [pit, setPit] = useState('');
    const [type, setType] = useState('')
    const [capacity, setCapacity] = useState('kg');
    const [basementSelection, isBasementSelection] = useState({
        B1: '',
        B2: ''
    })
    const [degree, setDegdree] = useState({
        nintyDegreeLeft: '',
        nintyDegreeRight: '',
        oneEightyDegree: ''
    })

    const [noOfOpenings, setNoOfOpenings] = useState(0);
    const [stops, setStops] = useState(0);
    const [data, setData] = useState("G");
    const level = {}
    function addvalue() {
        let GlobalStop = stops;
        if (basementSelection.b2 === "B2") {
            level.B1 = []
            level.B2 = []
            GlobalStop -= 2;
        } else if (basementSelection.b1 === "B1") {
            level.B1 = []
            GlobalStop -= 1;
        }
        if (data === "S") {
            level.Stilt = [];
            level.Ground = []
            GlobalStop -= 2;
        } else {
            level.Ground = []
            GlobalStop -= 1;
        }
        for (let i = GlobalStop; i >= 1; i--) {
            level[`level ${GlobalStop - i + 1}`] = [];
        }
        // console.log(GlobalStop)
    }
    addvalue();

    const elementsArray = Array.from({ length: stops }, (_, index) => index);//converting the stop value to array so that we can use map function
    const noOfOpeningsArray = Array.from({ length: noOfOpenings - 1 }, (_, index) => index);

    const [array, setArray] = useState([])

    //handler
    const handleContructionMaterial = (value) => {
        setDropdown(prevState => (
            {
                ...prevState,
                constructionMaterial: value
            }
        ))
    }
    const handlePurpose = (value) => {
        setDropdown(prevState => (
            {
                ...prevState,
                purpose: value
            }
        ))
    }
    const handleDoorType = (value) => {
        setDropdown(prevState => (
            {
                ...prevState,
                doorType: value
            }
        ))
    }
    const handleCapacityUnitChange = (unit) => {
        setCapacity(unit);
    };

    const handleChange = (value) => {
        setData(value);
    }
    const handleChangeInB1 = () => {
        isBasementSelection(prevState => ({
            b1: prevState.b1 ? "" : "B1",
            b2: prevState.b2 === "" ? "" : ""
        }));
    }
    const handleChangeInB2 = () => {
        isBasementSelection(prevState => ({
            b1: prevState.b2 === "" ? "B1" : "",
            b2: prevState.b2 ? "" : "B2"
        }));
    }

    const handleInputValueChange = (newValue) => {
        setStops(newValue);


    };
    const handlePitValueChange = (pit) => {
        setPit(pit);
    }
    const handleType = (value) => {
        setType(value);
    }


   const [isActive, setIsActive] = useState(false);
    const [selectedIndex, setselectedIndex] = useState("");

    const handleClick = (row, colIndex) => {
        setArray(prevArray => {
            const newArray = [...prevArray]; 
            newArray[row][colIndex] = !newArray[row][colIndex];
            return newArray; 
        });
    };
    
    


    const handleNumberOfOpenings = (openings) => {
        setNoOfOpenings(openings);
        setDegdree({
            nintyDegreeRight: "",
            nintyDegreeLeft: "",
            oneEightyDegree: ""
        })
        setLevelAndOpeningsView(openings)
    }
    const isDivDisabled = () => {
        if (noOfOpenings === 0 || noOfOpenings === 1) {
            return true;
        } else {
            return false;
        }
    };

    const handleDegreeSelection = (value) => {
        if (noOfOpenings === 2) {
            setDegdree({
                nintyDegreeLeft: "",
                nintyDegreeRight: "",
                oneEightyDegree: ""
            })
        }
        else if (noOfOpenings === 3) {
            const R90 = degree.nintyDegreeRight
            const L90 = degree.nintyDegreeLeft
            const back = degree.oneEightyDegree


            if (R90 === '90dR' && L90 === '90dL') {
                setDegdree(prevState => (
                    {
                        ...prevState,
                        nintyDegreeLeft: "",
                    }
                ))
            }
            else if (L90 === '90dL' && back === '180d') {
                setDegdree(prevState => (
                    {
                        ...prevState,
                        oneEightyDegree: "",
                    }
                ))
            }
            else if (R90 === '90dR' && back === '180d') {
                setDegdree(prevState => (
                    {
                        ...prevState,
                        nintyDegreeRight: "",
                    }
                ))
            }
        }

        switch (value) {
            case '90dL':
                setDegdree((prevState) => (
                    {
                        ...prevState, nintyDegreeLeft: prevState.nintyDegreeLeft ? '' : '90dL'
                    }
                ));
                break;
            case '90dR':
                setDegdree((prevState) => (
                    {
                        ...prevState, nintyDegreeRight: prevState.nintyDegreeRight ? '' : '90dR'
                    }
                ));
                break;
            case '180d':
                setDegdree((prevState) => (
                    {
                        ...prevState, oneEightyDegree: prevState.oneEightyDegree ? '' : '180d'
                    }
                ));
                break;
            default:
                break;
        }
    };


    const setLevelAndOpeningsView = (openings) => {
        const arrayTobe = Array.from({ length: stops }, () => Array(openings).fill(false));
        setArray(arrayTobe);
        console.log("this is arrayto", arrayTobe);
    }

    const array2D = Array.from({ length: stops }, () =>
        new Array(noOfOpenings).fill(0)
    );

console.log("=>>",array)

    return (
        <div className='client-form-elevator-details'>
            <h5 className='client-form-details-heading'>Elevator Details</h5>
            <hr className='client-form-hr' />

            <div className='dimenstions-container'>
                <div className='client-elevator-input-wrapper'>
                    <div className='mmbtn-parent'>

                        <ClientDropdown label={"Pit depth"}
                            options={pitDepth}
                            onValueChange={handlePitValueChange}
                        />
                        <span className='mmBtn mm-btn-possition'>mm</span>
                    </div>
                    <div>
                        <ClientDropdown label={"Type"}
                            options={typeOptions}
                            onValueChange={handleType}
                        />
                    </div>
                    <div>
                        <ClientDropdown label={"Purpose"}
                            options={purpose}
                            onValueChange={handlePurpose}
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
                                <span className={`b2-btn ${basementSelection.b2 === 'B2' ? 'btn-active' : ''}`} onClick={() => handleChangeInB2('')}>
                                    B2
                                </span>
                                <span className={`b1-btn ${basementSelection.b1 === 'B1' ? 'btn-active' : ''}`} onClick={() => handleChangeInB1('')}>
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

                        <ClientDropdown label={"Door Type"}
                            options={doorType}
                            onValueChange={handleDoorType}
                        />
                    </div>
                    <div>

                        <ClientDropdown label={"Construction Material"}
                            options={constructionMaterial}
                            onValueChange={handleContructionMaterial}
                        />
                    </div>
                    <div>

                        <ClientDropdown label={"Number of opening"} options={numberOfOpenings} onValueChange={handleNumberOfOpenings} />
                    </div>
                    <div>
                        <div className={isDivDisabled() ? 'degree-container disabled' : 'degree-container'}>

                            <>
                                <span
                                    className={`degree-container-children ${degree.nintyDegreeLeft === '90dL' ? 'degree-selector' : ''}`}
                                    onClick={() => handleDegreeSelection('90dL')}
                                >
                                    90°left
                                </span>
                                <span
                                    className={`degree-container-children ${degree.nintyDegreeRight === '90dR' ? 'degree-selector' : ''}`}
                                    onClick={() => handleDegreeSelection('90dR')}
                                >
                                    90°right
                                </span>
                                <span
                                    className={`degree-container-children ${degree.oneEightyDegree === '180d' ? 'degree-selector' : ''}`}
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
                        <span className='levelHeading'>Level</span>
                        <span className='heading-badge'>Original opening</span>

                        {Object.entries(degree).map(([key, value], index, array) => (
                            value !== '' &&
                            <span className='heading-badge' key={index}>{value === "90dL" ? "90° Left" : value === "90dR" ? "90° Right" : "180°"}</span>
                        ))}
                    </div>
                    <div className='level-box-container'>
                        <div>
                            {
                                Object.entries(level).map(([key, value], index) => {

                                    return (
                                        <div className='level-title-wrapper' key={index}>
                                            <span className='level-title'>{key}:</span>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div>
                            {
                                array.map((row, rowIndex) => {
                                    const rI = rowIndex;
                                    return (
                                        <div className='level-selector-parent' key={rowIndex}>
                                            {row.map((col, colIndex) => {
                                                const cI = colIndex;
                                                return(
                                                <span className={`level-selector ${array[rI][cI] ? 'level-selector-active' : ''}`} onClick={()=>handleClick(rI, cI)} key={colIndex}></span>
                                            )})}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
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