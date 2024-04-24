import React, { useState } from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';

const ClientFormDetails = ({ }) => {
    const [userName,setUserName]=useState('');
    return (
        <div className='client-form-details'>
            <h5 className='client-form-details-heading'>Client's Details</h5>
            <hr className='client-form-hr' />
            <div className='client-form-input-wrapper' >
                <div className='client-form-input-wrapper-child'>
                    <AnimatedInput
                        label={"JON"}
                        name={"JON"}
                        lebelleft={userName?true:false}
                        value={userName}
                        onChange={(e)=>setUserName(e.target.value)}
                    />
                </div>
                <div>
                <AnimatedInput
                        label={"Name"}
                        name={"courseName"}
                    />
                </div>
                <div>
                <AnimatedInput
                        label={"Phone Number"}
                        name={"courseName"}
                    />
                </div>
                <div>
                <AnimatedInput
                        label={"Alternative Number"}
                        name={"courseName"}
                    />
                </div>
                <div>
                <AnimatedInput
                        label={"Email"}
                        name={"courseName"}
                    />
                </div>
                <div>
                <AnimatedInput
                        label={"Souce of Lead"}
                        name={"courseName"}
                    />
                </div>
                <div>
                <AnimatedInput
                        label={""}
                        name={"courseName"}
                        disabled={true}
                    />
                </div>
                <div>
                <AnimatedInput
                        label={""}
                        name={"courseName"}
                        disabled={true}
                       
                    />
                </div>
            </div>

        </div>
    );
};

export default ClientFormDetails;