// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect, useState } from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
import ClientDropdown from './ClientsReusableComponent/ClientDropdown';
import TextInputs from './ClientsReusableComponent/TextInput';

const ClientFormDetails = ({ }) => {
    const [clientFormData, setClientFormData] = useState({userName:'',
// use other fileds 
});

    const [click, setClick] = useState({});
    const sourceOfLead = ["Website", "Reference"];




    const hadleInputChnage = (e) => {
        const { name, value } = e.target;
        setClientFormData({ ...clientFormData, [name]: value })
    }

    const handleClick = (e) => {
        const { name } = e.target;
        setClick({ ...click, [name]: true });
    }

    const handleClickFalse = (e) => {
        const { name } = e.target;
        setClick({ ...click, [name]: false });
    }


    useEffect(() => {
        console.log(clientFormData)
    }, [clientFormData])

    return (
        <div className='client-form-details'>
            <h5 className='client-form-details-heading'>Client's Details</h5>
            <hr className='client-form-hr' />
            <div className='client-form-input-wrapper' >
                <div className='client-form-input-wrapper-child'>
                    <TextInputs
                        label={'User Name'}
                        name={'userName'}
                        // name paste here from useState
                    
                        onFocus={handleClick}
                        // same name paste here from useState
                        value={clientFormData.userName}
                        onChange={hadleInputChnage}
                        // name paste here from useState
                        click={click.userName}
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