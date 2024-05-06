// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useState } from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
import ClientDropdown from './ClientsReusableComponent/ClientDropdown';
import TextInputs from './ClientsReusableComponent/TextInput';

const ClientFormDetails = ({ }) => {
    const [userName, setUserName] = useState('');
    const sourceOfLead = ["Website", "Reference"];


    const handleClick = (e) => {
        const { name } = e.target;
        console.log(e.target.name);
        setClick({ ...click, [name]: true });
    }
    const handleClickFalse = (e) => {
        const { name } = e.target;
        setClick({ ...click, [name]: false });

    }
    const [click, setClick] = useState({});



    return (
        <div className='client-form-details'>
            <h5 className='client-form-details-heading'>Client's Details</h5>
            <hr className='client-form-hr' />
            <div className='client-form-input-wrapper' >
                <div className='client-form-input-wrapper-child'>
                    <TextInputs
                        label={'First Name'}
                        name={'firstName'}
                        onFocus={handleClick}
                        // value={personalDetail.firstName}
                        // onChange={handlePersonalInputChange}
                        click={click.firstName}
                        onBlur={handleClickFalse}
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

                    <ClientDropdown label={"Source of Lead"}
                        options={sourceOfLead}

                    />
                </div>
                <div>
                    <AnimatedInput
                        label={"Reference"}
                        name={"courseName"}
                        disabled={true}
                    />
                </div>
                <div>
                    <AnimatedInput
                        label={"Reference Name"}
                        name={"courseName"}
                        disabled={true}

                    />
                </div>
            </div>

        </div>
    );
};

export default ClientFormDetails;