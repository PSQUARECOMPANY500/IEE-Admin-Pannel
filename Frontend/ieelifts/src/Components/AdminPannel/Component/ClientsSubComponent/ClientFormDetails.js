// <-----------------------------  Author:- Rahul kumar ----------------------------------->
import React, { useEffect, useState } from 'react';
import AnimatedInput from './ClientsReusableComponent/AnimatedInput';
import ClientDropdown from './ClientsReusableComponent/ClientDropdown';
import TextInputs from './ClientsReusableComponent/TextInput';

const ClientFormDetails = () => {
    const [clientFormData, setClientFormData] = useState({jon:'',
    userName:'',phoneNumber:'',alternativeNumber:'',email:'',reference:'',referenceName:''
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
    }, [clientFormData])

    return (
        <div className='client-form-details'>
            <h5 className='client-form-details-heading'>Client's Details</h5>
            <hr className='client-form-hr' />
            <div className='client-form-input-wrapper' >
                <div className='client-form-input-wrapper-child'>
                    <TextInputs
                        label={'JON'}
                        name={'jon'}
                        // name paste here from useState
                    
                        onFocus={handleClick}
                        // same name paste here from useState
                        value={clientFormData.jon}
                        onChange={hadleInputChnage}
                        // name paste here from useState
                        click={click.jon}
                        onBlur={handleClickFalse}
                    />
                </div>
                <div>
                <TextInputs
                        label={'Name'}
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
                <TextInputs
                        label={'Phone number'}
                        name={'phoneNumber'}
                        // name paste here from useState
                    
                        onFocus={handleClick}
                        // same name paste here from useState
                        value={clientFormData.phoneNumber}
                        onChange={hadleInputChnage}
                        // name paste here from useState
                        click={click.phoneNumber}
                        onBlur={handleClickFalse}
                    />
                </div>
                <div>
                <TextInputs
                        label={'Alternative number'}
                        name={'alternativeNumber'}
                        // name paste here from useState
                    
                        onFocus={handleClick}
                        // same name paste here from useState
                        value={clientFormData.alternativeNumber}
                        onChange={hadleInputChnage}
                        // name paste here from useState
                        click={click.alternativeNumber}
                        onBlur={handleClickFalse}
                    />
                </div>
                <div>
                <TextInputs
                        label={'Email'}
                        name={'email'}
                        // name paste here from useState
                    
                        onFocus={handleClick}
                        // same name paste here from useState
                        value={clientFormData.email}
                        onChange={hadleInputChnage}
                        // name paste here from useState
                        click={click.email}
                        onBlur={handleClickFalse}
                    />
                </div>
                <div>

                    <ClientDropdown label={"Source of Lead"}
                        options={sourceOfLead}
                    />
                </div>
                <div>
                <TextInputs
                        label={'Reference'}
                        name={'reference'}
                        // name paste here from useState
                    
                        onFocus={handleClick}
                        // same name paste here from useState
                        value={clientFormData.reference}
                        onChange={hadleInputChnage}
                        // name paste here from useState
                        click={click.reference}
                        onBlur={handleClickFalse}
                    />
                </div>
                <div>
                <TextInputs
                        label={'Refernce Name'}
                        name={'referenceName'}
                        // name paste here from useState
                    
                        onFocus={handleClick}
                        // same name paste here from useState
                        value={clientFormData.referenceName}
                        onChange={hadleInputChnage}
                        // name paste here from useState
                        click={click.referenceName}
                        onBlur={handleClickFalse}
                    />
                </div>
            </div>

        </div>
    );
};

export default ClientFormDetails; 